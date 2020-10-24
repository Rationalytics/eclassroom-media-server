'use strict';
const jwt = require('jsonwebtoken');
const axios = require('axios');
const OpenVidu = require('openvidu-node-client').OpenVidu;
const OpenViduRole = require('openvidu-node-client').OpenViduRole;
const uuidv5 = require('uuid').v5;
const express = require('express');
const router = express.Router();

const keys = require('../config/keys');
const utils = require('../helpers/utils');
const OV = new OpenVidu(keys.openViduUrl, keys.openViduSecret);

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

router.post('/', (req, res, next) => {
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
                    },
                    onreject => {
                        console.error(onreject);
                    })
                    .catch(error => {
                        console.error(error);
                        return res.status(500).json({ message: 'Cannot create session' });
                    });
            }
        }
    );
});

module.exports = router;