'use strict';
const WebSocket = require('ws');
const jwt = require('jsonwebtoken');
const myOpenVidu = require('./myOpenVidu');
const keys = require('../config/keys');
const logger = require('../helpers/logger');
let wss = null;

module.exports = {
    startWebSocketServer(server) {
        wss = new WebSocket.Server({ server });

        wss.on('connection', function connection(ws) {
            logger.info('New connection');
            // console.log(ws);
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
                        if (msgType === 'leave-session') {
                            const sessionId = msg.obj.sessionId;
                            const connectionId = msg.obj.connectionId;
                            const openViduToken = msg.obj.openViduToken;
                            const lectureId = msg.obj.lectureId;

                            myOpenVidu.leaveSession(token, sessionId, connectionId, lectureId, decoded.userId).then(
                                res => {
                                    
                                },
                                reject => {
                                    console.log(reject);
                                }
                            ).catch(rej => {
                                console.error(rej);
                            });
                        }
                    }
                });
            });
        });
    },


    sendPayload(payload) {
        
    }
}