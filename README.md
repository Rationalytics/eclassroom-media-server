# MeraClass Media Server
This repository is a REST API which talks with [Kurento Media Server](https://www.kurento.org/) using [OpenVidu](https://openvidu.io/index) as a wrapper around Kurento Media Server.

## Architecture

## Dependencies:
1. Install `Redis`.
2. Create a `DynamoDB` instance on `AWS` and edit the Access Key in `awsAccessKey` field of `./config/dev.js`. Similarly, edit the AWS secret and AWS region in `awsSecretAccessKey` and `awsRegion` fields of `./config/dev.js` respectively. 
3. Install NodeJS (>=v12) and run `npm i --save`.
4. Install [Docker CE](https://docs.docker.com/engine/install/) based on your OS.
5. Run `docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-server-kms:2.15.0`. This will start the Kurento Media Server.
6. Run `npm run dev` to start the media server REST API.

## Issues
1. On running the Kurento Media Server the very first time, you might see a `ERR_CERT_AUTHORITY_INVALID` in our Angular client. This is because, on localhost, Kurento Media Server is using a self signed certificate and when our client tries to establish a connection over a secure websocket, the client fails to authenticate the validity of the certificate. To avoid this, visit the Kurento Media Server's dashboard page on [https://localhost:4443/dashboard](https://localhost:4443/dashboard). You will see the standard SSL warning on your browser. Click `Advance` and proceed to the webpage. Once an exception to trust the certificate/page has been added to your browser, you will not see the same error again.