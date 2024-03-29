'use strict';
const grpc = require('grpc');
const path = require('path');
const fs = require('fs');
const usersPb = require('../protos/users_pb');
const usersService = require('../protos/users_grpc_pb');
const keys = require('../config/keys');
const logger = require('../helpers/logger');

const dynamoDb = require('../model/DynamoDB');

const localCache = require('../services/localCache');

const insecureConn = grpc.credentials.createInsecure();

const certPath = path.join('certs', process.env.NODE_ENV);
const credentials = grpc.credentials.createSsl(
    fs.readFileSync(path.join(certPath, 'ca.crt')),
    fs.readFileSync(path.join(certPath, 'client.key')),
    fs.readFileSync(path.join(certPath, 'client.crt'))
);

module.exports = {
    async toggleLectureStatus(token, lectureId, flag) {
        try {
            logger.info('Toggling lecture status');
            const request = new usersPb.SetLectureStatusRequest();

            const client = new usersService.UserServiceClient(keys.operationsServer, process.env.NODE_ENV === 'dev' ? insecureConn : credentials);

            request.setToken(token);
            request.setLectureId(lectureId);
            request.setLectureStatus(flag);

            client.setLectureStatus(request, (err, res) => {
                if (err) {
                    logger.error(err);
                } else {
                    logger.info(res);
                }
            })
        } catch (err) {
            logger.error(err);
        }
    },

    /**
     * @description Makes a request to the operations server to mark attendance
     * @param {string} lectureId Lecture ID
     * @param {string} userId Student user ID
     * @param {boolean} flag true if joining the lecture else false
     */
    async markAttendance(lectureId, userId, flag) {
        try {
            logger.info('Marking student ' + userId + ' as ' + flag ? 'present' : 'absent');
            const request = new usersPb.MarkAttendanceRequest();

            const client = new usersService.UserServiceClient(keys.operationsServer, process.env.NODE_ENV === 'dev' ? insecureConn : credentials);

            request.setStudentId(userId);
            request.setLectureId(lectureId);
            request.setHasJoined(flag);

            client.markAttendance(request, (err, res) => {
                if (err) {
                    logger.error(err);
                } else {
                    logger.info(res);
                }
            })
        } catch (err) {
            logger.error(err);
        }
    },
}