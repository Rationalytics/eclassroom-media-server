'use strict';

const db = require('../model/db');
// db.sequelize.sync();

function seedDb() {
    // db.exec(`CREATE TABLE lectureSessions (
    //     lectureId VARCHAR(30) PRIMARY KEY,
    //     lectureSessionId VARCHAR(50),
    //     classId VARCHAR(30),
    //     facultyId VARCHAR(30),
    // )`).then(
    //     res => {
    //         console.log(res);
    //     },
    //     err => {
    //         console.error(err);
    //     }
    // );
    // try {
    //     console.log('Syncing...');
    //     await db.sequelize.sync();
    //     console.log('Synced');
    // } catch (err) {
    //     console.error(err);
    // }

    db.exec().then(
        res => {
            console.log(res);
        },
        err => {
            console.error(err);
        }
    )
}

seedDb();