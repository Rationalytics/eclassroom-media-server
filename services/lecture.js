'use strict';
const grpc = require('grpc');
const usersPb = require('../protos/users_pb');
const usersService = require('../protos/users_grpc_pb');
const keys = require('../config/keys');
const logger = require('../helpers/logger');

const dynamoDb = require('../model/DynamoDB');

const localCache = require('../services/localCache');

const insecureConn = grpc.credentials.createInsecure();

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
}