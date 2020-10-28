'use strict';
const jwt = require('jsonwebtoken');
const axios = require('axios');
const grpc = require('grpc');
const path = require('path');
const AWS = require('aws-sdk');
const fs = require('fs');
const OpenVidu = require('openvidu-node-client').OpenVidu;
const OpenViduRole = require('openvidu-node-client').OpenViduRole;
const uuidv5 = require('uuid').v5;
const express = require('express');
const winston = require('winston');
const router = express.Router();

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.simple(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.Console()
  ],
});


const keys = require('../config/keys');
const OV = new OpenVidu(keys.openViduUrl, keys.openViduSecret);

const utils = require('../helpers/utils');
const cache = require('../model/cache');

const usersPb = require('../protos/users_pb');
const usersService = require('../protos/users_grpc_pb');

const insecureConn = grpc.credentials.createInsecure();

const certPath = path.join('certs', process.env.NODE_ENV);

const credentials = grpc.credentials.createSsl(
  fs.readFileSync(path.join(certPath, 'ca.crt')),
  fs.readFileSync(path.join(certPath, 'client.key')),
  fs.readFileSync(path.join(certPath, 'client.crt'))
);

let mapSessions = {};
let mapSessionNamesTokens = {};

AWS.config.update({ accessKeyId: keys.awsAccessKey, secretAccessKey: keys.awsSecretAccessKey, region: keys.awsRegion });
// Create the Service interface for DynamoDB
const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

// Create the document client interface for DynamoDB
const documentClient = new AWS.DynamoDB.DocumentClient();

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

router.get('/session/:lectureId/:liveSessionId', (req, res, next) => {
    const authToken = req.headers.authorization.split(' ')[1];

    const lectureId = req.params['lectureId'];
    if (lectureId === null || lectureId === '' || lectureId === undefined) {
        return res.status(400).json({ message: 'Invalid lecture ID' });
    }

    const liveSessionId = req.params['liveSessionId'];
    if (liveSessionId === null || liveSessionId === '' || liveSessionId === undefined) {
        return res.status(400).json({ message: 'Invalid session ID' });
    }

    jwt.verify(authToken, keys.secret, async function(err, decoded) {
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

        try {
            let lecture = await cache.get(lectureId, userId);
            const userLecId = userId + '-' + lectureId;

            if (lecture === null) {
                // Cache miss, check into DB
                logger.info('Cache miss, checking into DB');
                const params = {
                    TableName: 'lectureSessions',
                    Key: {
                        'userLectureId': { 'S': userLecId }
                    }
                };

                const sessInfo = await dynamodb.getItem(params).promise();
                
                if (sessInfo === undefined || sessInfo === null || JSON.stringify(sessInfo) === '{}') {
                    // DB miss, create session
                    logger.info('DB miss, creating new session');
                    const request = new usersPb.GetLectureRequest();

                    const client = new usersService.UserServiceClient(keys.operationsServer, process.env.NODE_ENV === 'dev' ? insecureConn : credentials);

                    request.setToken(authToken);
                    request.setLectureId(lectureId);

                    client.getLecture(request, async (err, response) => {
                        if (err) {
                            console.error(err);
                            if (err.code === grpc.status.INVALID_ARGUMENT) {
                                // .
                            } else if (err.code === grpc.status.UNAUTHENTICATED) {
                                return res.status(401).json({ message: err.details });
                            } else if (err.code === grpc.status.NOT_FOUND) {
                                return res.status(400).json({ message: err.details });
                            } else {
                                return res.status(500).json({ message: err.details });
                            }
                        } else {
                            const lec = utils.deserializer(response.getLecture(), 'lecture');

                            if (lec.facultyId === userId) {
                                logger.info('Creating new session');

                                const openviduSess = await OV.createSession({ customSessionId: liveSessionId });
                                const openviduToken = await openviduSess.generateToken(tokenOptions);

                                const payload = {
                                    Item: {
                                        'userLectureId': {
                                            S: userLecId
                                        },
                                        'lectureId': {
                                            S: lectureId
                                        },
                                        'sessionId': {
                                            S: openviduSess.sessionId
                                        },
                                        'token': {
                                            S: openviduToken
                                        }
                                    },
                                    TableName: 'lectureSessions'
                                };
    
                                const newSess = await dynamodb.putItem(payload).promise();

                                const cachedSess = {
                                    liveSessionId: liveSessionId,
                                    sessionId: openviduSess.sessionId,
                                    token: openviduToken
                                };
                                
                                await cache.set(lectureId, userId, JSON.stringify(cachedSess), lec.duration);

                                return res.status(201).json({ message: 'Session created', obj: { token: openviduToken, sessionId: openviduSess.sessionId, }});
                            }

                        }
                    });
                } else {
                    logger.info('Returning session ID and openvidu token from DB');

                    const cachedSess = {
                        liveSessionId: liveSessionId,
                        sessionId: sessInfo.Item.sessionId.S,
                        token: sessInfo.Item.token.S
                    };

                    await cache.set(lectureId, userId, JSON.stringify(cachedSess));
                    return res.status(201).json({ message: 'Session created', obj: { token: sessInfo.Item.token.S, sessionId: sessInfo.Item.sessionId.S, }});
                }
            } else {
                logger.info('Returning cached session ID and openvidu token');
                return res.status(201).json({ message: 'Session created', obj: { token: lecture.token, sessionId: lecture.sessionId, }});
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error' });
        }
    });
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

    const lectureId = body.lectureId;
    if (lectureId === '' || lectureId === null || lectureId === undefined) {
        return res.status(400).json({ message: 'Please provide a lecture ID' });
    }


    jwt.verify(authToken, keys.secret, async function(err, decoded) {
        if (err) {
            console.error(err);
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const userId = decoded.userId;
        const user = decoded.user;

        try {
            const sess = await axios.get(keys.openViduUrl + 'api/sessions/' + sessionId, { headers: { Authorization: utils.getBasicAuth() }});

            if (sess.status === 200) {
                const deleteConn = await axios.delete(
                    keys.openViduUrl + `api/sessions/${sessionId}/connection/${connectionId}`, 
                    { 
                        headers: { Authorization: utils.getBasicAuth() }
                    }
                );

                if (deleteConn.status === 204) {
                    cache.delete(lectureId, userId);

                    const params = {
                        TableName: 'lectureSessions',
                        Key: {
                            'userLectureId': {
                                S: userId + '-' + lectureId
                            }
                        }
                    };
                    
                    await dynamodb.deleteItem(params).promise();

                    console.log('Connection deleted successfully');

                    // Now check if all the participants of the room have left or not.
                    // If the room is empty then delete the room
                    axios.get(keys.openViduUrl + 'api/sessions/' + sessionId, { headers: { Authorization: utils.getBasicAuth() }})
                        .then(async (updatedSession) => {
                            const session = updatedSession.data;

                            if (session.connections.length == 0 || session.connections === undefined) {
                                // Delete room/session

                                await axios.delete(
                                    keys.openViduUrl + `api/sessions/${sessionId}`,
                                    { headers: { Authorization: utils.getBasicAuth() }}
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