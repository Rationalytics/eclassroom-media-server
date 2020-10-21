'use strict';
const jwt = require('jsonwebtoken');
const axios = require('axios');
const OpenVidu = require('openvidu-node-client').OpenVidu;
const OpenViduRole = require('openvidu-node-client').OpenViduRole;
const uuidv5 = require('uuid').v5;
const express = require('express');
const router = express.Router();

const keys = require('../config/keys');
const OV = new OpenVidu(keys.openViduUrl, keys.openViduSecret);

let mapSessions = {};
let mapSessionNamesTokens = {};

function getBasicAuth() {
    return 'Basic ' + (new Buffer('OPENVIDUAPP:' + keys.openViduSecret).toString('base64'));
}

/**
 * @description Express authorization middleware.
 * 
 * @param {HttpRequest} req - Express HTTP request object
 * @param {HttpResponse} res - Express HTTP response object
 */
router.use('/', function(req, res, next) {
    const authToken = req.headers.authorization.split(' ')[1];

    if (authToken === '' || authToken === null) {
        const error = new Error(process.env.NODE_ENV === 'dev' ? 'Invalid Token' : 'Unauthorized');
        error.text = 'Please provide an authentication token';
        error.status = 401;
        return next(error);
    }

    next();
});

router.get('/session/:lectureId', (req, res) => {
    const authToken = req.headers.authorization.split(' ')[1];

    const lectureId = req.params['lectureId'];
    if (lectureId === null || lectureId === '' || lectureId === undefined) {
        return res.status(400).json({ message: 'Invalid lecture ID' });
    }

    jwt.verify(authToken, keys.secret, function(err, decoded) {
            if (err) {
                console.error(err);
                return res.status(401).json({ message: 'Unauthorized' });
            }

            const userId = decoded.userId;
            const user = decoded.user;

            let role = (user.accessLevel == 0 || user.accessLevel == 1 || user.accessLevel == 2) ? OpenViduRole.MODERATOR : OpenViduRole.PUBLISHER;

            let usr = {
                id: userId,
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                avatar: user.avatar,
                accessLevel: user.accessLevel,
                userType: user.userType,
            };

            // Optional data to be passed to other users when this user connects to the video-call
            // In this case, a JSON with the value we stored in the req.session object on login
            const serverData = JSON.stringify({ serverData: usr });

            // Build tokenOptions object with the serverData and the role
            const tokenOptions = {
                data: serverData,
                role: role
            };

            if (mapSessions[lectureId]) {
                console.log('Existing session ' + lectureId);

                // Get the existing Session from the collection
                const mySession = mapSessions[lectureId];

                // Generate a new token asynchronously with the recently created tokenOptions
                mySession.generateToken(tokenOptions)
                    .then(token => {
                        // Store the new token in the collection of tokens
                        mapSessionNamesTokens[lectureId].push(token);

                        // Return session template with all the needed attributes
                        res.status(201).json({ message: 'Session created', obj: { token: token, sessionId: mySession.sessionId, } });
                    })
                    .catch(error => {
                        console.error(error);
                        return res.status(500).json({ message: 'Cannot generate token' });
                    });
            } else {
                // New session
                console.log('New session ' + lectureId);

                // Create a new OpenVidu Session asynchronously
                OV.createSession({ customSessionId: lectureId }).then(
                    session => {
                        // Store the new Session in the collection of Sessions
                        mapSessions[lectureId] = session;
                        // Store a new empty array in the collection of tokens
                        mapSessionNamesTokens[lectureId] = [];

                        // Generate a new token asynchronously with the recently created tokenOptions
                        session.generateToken(tokenOptions)
                            .then(token => {

                                // Store the new token in the collection of tokens
                                mapSessionNamesTokens[lectureId].push(token);

                                // Return session template with all the needed attributes
                                res.status(201).json({ message: 'Session created', obj: { token: token, sessionId: session.sessionId, }});
                            })
                            .catch(error => {
                                return res.status(500).json({ message: 'Cannot generate token' });
                            });
                    })
                    .catch(error => {
                        console.error(error);
                        return res.status(500).json({ message: 'Cannot create session' });
                    });
            }
        }
    );   
});


router.post('/leave-session', (req, res) => {
    const authToken = req.headers.authorization.split(' ')[1];

    const body = req.body;

    const sessionId = body.sessionId;
    if (sessionId === '' || sessionId === null || sessionId === undefined) {
        return res.status(400).json({ message: 'Please provide a session ID' });
    }

    const connectionId = body.connectionId;
    if (connectionId === '' || connectionId === null || connectionId === undefined) {
        return res.status(400).json({ message: 'Please provide a stream ID' });
    }

    const openViduToken = body.openViduToken;
    if (openViduToken === '' || openViduToken === null || openViduToken === undefined) {
        return res.status(400).json({ message: 'Please provide the lecture token' });
    }


    jwt.verify(authToken, keys.secret, async function(err, decoded) {
        if (err) {
            console.error(err);
            return res.status(401).json({ message: 'Unauthorized' });
        }

        try {
            const sess = await axios.get(keys.openViduUrl + 'api/sessions/' + sessionId, { headers: { Authorization: getBasicAuth() }});

            if (sess.status === 200) {
                const deleteConn = await axios.delete(
                    keys.openViduUrl + `api/sessions/${sessionId}/connection/${connectionId}`, 
                    { 
                        headers: { Authorization: getBasicAuth() }
                    }
                );

                if (deleteConn.status === 204) {
                    // Now check if all the participants of the room have left or not.
                    // If the room is empty then delete the room

                    console.log('Connection deleted successfully');

                    // If the session exists
                    if (mapSessions[sessionId] && mapSessionNamesTokens[sessionId]) {
                        const tokens = mapSessionNamesTokens[sessionId];
                        const index = tokens.indexOf(openViduToken);

                        // If the token exists
                        if (index !== -1) {
                            // Token removed
                            tokens.splice(index, 1);
                            console.log(sessionId + ': ' + tokens.toString());
                        } else {
                            var msg = 'Problems in the app server: the TOKEN wasn\'t valid';
                            console.log(msg);
                        }

                        if (tokens.length == 0) {
                            // Last user left: session must be removed
                            console.log(sessionId + ' empty!');
                            delete mapSessions[sessionId];
                        }
                    }

                    axios.get(keys.openViduUrl + 'api/sessions/' + sessionId, { headers: { Authorization: getBasicAuth() }})
                        .then(async (updatedSession) => {
                            const session = updatedSession.data;

                            if (session.connections.length == 0 || session.connections === undefined) {
                                // Delete room/session

                                await axios.delete(
                                    keys.openViduUrl + `api/sessions/${sessionId}`,
                                    { headers: { Authorization: getBasicAuth() }}
                                );
                            }
                        })
                        .catch(e => {
                            console.log('Session already deleted');
                        })
                        .then(() => {
                            return res.status(200).json({ message: 'User kicked from session' });
                        });
                    
                } else if (deleteConn.status == 400) {
                    // Session not found.
                    return res.status(400).json({ message: 'Session does not exists.' });
                } else if (deleteConn.status === 404) {
                    // Connection not found.
                    return res.status(404).json({ message: 'Connection does not exists.' });
                }
            } else {
                console.log(sess);
                return res.status(404).json({ message: 'Cannot find session.' });
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    });
});

module.exports = router;