'use strict';
const AWS = require('aws-sdk');
const keys = require('../config/keys');
AWS.config.update({ accessKeyId: keys.awsAccessKey, secretAccessKey: keys.awsSecretAccessKey, region: keys.awsRegion });
// Create the Service interface for DynamoDB
const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

const SESSIONS = 'sessions';
const LECTURE_SESSIONS = 'lectureSessions';

module.exports = {
    async addSessInfo(userLecId, lectureId, sessionId, openviduToken) {
        const payload = {
            Item: {
                'userLectureId': {
                    S: userLecId
                },
                'lectureId': {
                    S: lectureId
                },
                'sessionId': {
                    S: sessionId
                },
                'token': {
                    S: openviduToken
                }
            },
            TableName: 'lectureSessions'
        };
        await dynamodb.putItem(payload).promise();
    },


    async getSessionInfo(userLecId) {
        const params = {
            TableName: LECTURE_SESSIONS,
            Key: {
                'userLectureId': { 'S': userLecId }
            }
        };

        const sessInfo = await dynamodb.getItem(params).promise();
        return sessInfo;
    },


    async deleteSessInfo(userId, lectureId) {
        const params = {
            TableName: 'lectureSessions',
            Key: {
                'userLectureId': {
                    S: userId + '-' + lectureId
                }
            }
        };
        
        await dynamodb.deleteItem(params).promise();
    },
}