'use strict';
const axios = require('axios');
const keys = require('../config/keys');
const utils = require('../helpers/utils');
const cache = require('../model/cache');
const dynamoDb = require('../model/DynamoDB');
const localCache = require('./localCache');

module.exports = {
    async getSessionInfo(sessionId) {
        try {

        } catch (err) {
            console.error(err);
            
        }
    },

    async leaveSession(sessionId, connectionId, lectureId, userId) {
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

                    console.info('Connection deleted successfully');

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
                            console.info('Session already deleted');
                            // delete mapSessions[lectureId];
                            localCache.delete(lectureId);
                        })
                        .then(() => {
                            console.log('User kicked from session');
                        });
                    
                } else if (deleteConn.status == 400) {
                    // Session not found.
                    console.log('Session does not exists.');
                } else if (deleteConn.status === 404) {
                    // Connection not found.
                    console.log('Connection does not exists.');
                }
            } else {
                console.log(sess);
            }
        } catch (err) {
            console.error(err);
        }
    }
}