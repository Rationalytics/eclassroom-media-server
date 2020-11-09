'use strict';
const axios = require('axios');
const keys = require('../config/keys');
const utils = require('../helpers/utils');
const cache = require('../model/cache');
const dynamoDb = require('../model/DynamoDB');
const localCache = require('./localCache');
const logger = require('../helpers/logger');
const lectureService = require('./lecture');

module.exports = {
    async getSessionInfo(sessionId) {
        try {

        } catch (err) {
            console.error(err);
            
        }
    },

    async leaveSession(authToken, sessionId, connectionId, lectureId, userId) {
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
                    await dynamoDb.deleteSessInfo(userId, lectureId);

                    logger.info('Connection deleted successfully');

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

                                // delete mapSessions[lectureId];
                                localCache.delete(lectureId);
                            }
                        })
                        .catch(async e => {
                            logger.info('Session already deleted');
                            localCache.delete(lectureId);
                        })
                        .then(() => {
                            logger.info('User removed from session');
                        });
                    
                } else if (deleteConn.status == 400) {
                    // Session not found.
                    logger.error('Session does not exists.');
                } else if (deleteConn.status === 404) {
                    // Connection not found.
                    logger.error('Connection does not exists.');
                }
            } else {
                logger.info(sess);
            }
        } catch (err) {
            logger.error(err);
        } finally {
            await lectureService.toggleLectureStatus(authToken, lectureId, false);
        }
    }
}