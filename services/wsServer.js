'use strict';
const WebSocket = require('ws');
const jwt = require('jsonwebtoken');
const myOpenVidu = require('./myOpenVidu');
const keys = require('../config/keys');
const logger = require('../helpers/logger');
let wss = null;

let socketsDict = {};

module.exports = {
    startWebSocketServer(server) {
        wss = new WebSocket.Server({ server });

        wss.on('connection', function connection(ws) {
            logger.info('New connection');

            ws.send(JSON.stringify({type: 'ping'}));
            ws.on('message', function incoming(message) {
                const msg = JSON.parse(message);

                const token = msg.token;
                if (token === '' || token === undefined) {
                    logger.error('Auth token missing');
                    return;
                }

                const msgType = msg.type;
                if (msgType === '' || msgType === undefined) {
                    logger.error('Message type missing');
                    return;
                }

                
                jwt.verify(token, keys.secret, async function(err, decoded) {
                    if (err) {
                        console.error(err);
                    } else {
                        switch (msgType) {
                            case 'leave-session':
                                const sessionId = msg.obj.sessionId;
                                const connectionId = msg.obj.connectionId;
                                const openViduToken = msg.obj.openViduToken;
                                const lectureId = msg.obj.lectureId;

                                delete socketsDict[decoded.userId];

                                myOpenVidu.leaveSession(token, sessionId, connectionId, lectureId, decoded.userId, openViduToken).then(
                                    res => {
                                        
                                    },
                                    reject => {
                                        console.log(reject);
                                    }
                                ).catch(rej => {
                                    console.error(rej);
                                });
                                break;

                            case 'pong':
                                logger.info('Received PONG, adding client websocket to dictionary');
                                socketsDict[decoded.userId] = ws;
                                break;

                            case 'attendance':
                                logger.info('Attendance requested by a user');
                                break;
                        }
                    }
                });
            });
        });
    },


    sendPayload(payload, userId) {
        if (userId === null) {
            // send to all
        } else {
            // send to a specific user
            const socket = socketsDict[userId];
            socket.send(JSON.stringify(payload), (err) => {
                logger.error(err);
            });
        }
    }
}