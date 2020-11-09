'use strict';
const keys = require('../config/keys');

/**
 * @description Deserializes the following `.proro` message
 * @example message User {
            string id = 1;
            string name = 2;
            string email = 3;
            string mobile = 4;
            string password = 5;
            string confirm_password = 6;
            string institute_id = 7;
            enum AccessLevel {
                SUPER_USER = 0;
                ADMIN = 1;
                TEACHER = 2;
                STUDENT = 3;
                OTHERS = 4;
            }
            AccessLevel access_level = 9;
            string user_type = 10;
            string other_user_type = 11;
            string avatar = 12;
            bool is_registration_complete = 13;
            bool is_verified = 14;
            uint64 created_at = 15;
            uint64 updated_at = 16;
        }
* @param {object} user 
*/
function _userDeserializer(user) {
        return {
            id: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
            mobile: user.getMobile(),
            instituteId: user.getInstituteId(),
            accessLevel: user.getAccessLevel(),
            userType: user.getUserType(),
            otherUserType: user.getOtherUserType(),
            studentIdentification: user.getStudentIdentification(),
            classId: user.getClassId(),
            batch: user.getBatch(),
            parentName: user.getParentName(),
            parentContact: user.getParentContact(),
            avatar: user.getAvatar(),
            addedBy: user.getAddedBy(),
            isRegistrationComplete: user.getIsRegistrationComplete(),
            isVerified: user.getIsVerified(),
            preferredLanguage: user.getPreferredLanguage(),
            createdAt: user.getCreatedAt() !== 0 ? new Date(user.getCreatedAt()) : null,
            updatedAt: user.getUpdatedAt() !== 0 ? new Date(user.getUpdatedAt()) : null,
        }
    }


/**
 * @description Deserializes the following `.proto` message
 * @example message Class {
            string id = 1;
            string class_name = 2;
            string institute_id = 3;
            string created_by = 4;
            string updated_by = 5;
            uint64 created_at = 6;
            uint64 updated_at = 7;
            repeated Batch batches = 8;
        }

        message Batch {
            string batch_name = 1;
            string managed_by = 2;
            int32 max_capacity = 3;
        }
* @param {object} cls 
*/
function _classDeserializer(cls) {
    let batches = [];
    let subjects = [];

    cls.getBatchesList().forEach(batch => {
        batches.push(_batchDeserializer(batch));
    });

    cls.getSubjectsList().forEach(subject => {
        subjects.push(_subjectDeserializer(subject));
    });

    return {
        id: cls.getId(),
        className: cls.getClassName(),
        instituteId: cls.getInstituteId(),
        createdBy: cls.getCreatedBy(),
        updatedBy: cls.getUpdatedBy(),
        createdAt: cls.getCreatedAt() !== 0 ? new Date(cls.getCreatedAt()) : null,
        updatedAt: cls.getUpdatedAt() !== 0 ? new Date(cls.getUpdatedAt()) : null,
        batches: batches,
        subjects: subjects
    };
}


function _subjectDeserializer(sub) {
    return {
        id: sub.getId(),
        subjectName: sub.getSubjectName(),
        description: sub.getDescription(),
        taughtBy: sub.getTaughtByList(),
        taughtTo: sub.getTaughtToList(),
        instituteId: sub.getInstituteId(),
        createdBy: sub.getCreatedBy(),
        createdAt: sub.getCreatedAt() !== 0 ? new Date(sub.getCreatedAt()) : null,
        updatedBy: sub.getUpdatedBy(),
        updatedAt: sub.getUpdatedAt() !== 0 ? new Date(sub.getUpdatedAt()) : null
    }
}


function _batchDeserializer(batch) {
    return {
        batchName: batch.getBatchName(),
        managedBy: batch.getManagedBy(),
        maxCapacity: batch.getMaxCapacity(),
    };
}


/**
 * @description Deserializes the following `.proto` message
 * @param {object} lec 
 * @example message Lecture {
 *               string id = 1;
 *               string description = 2;
 *               string class_id = 3;
 *               repeated string batches = 4;
 *               uint64 scheduled_at = 5;
 *               string institute_id = 6;
 *               string subject_id = 7;
 *               string faculty_id = 8;
 *               uint32 duration = 9;
 *               string live_session_id = 10;
 *               uint64 created_at = 11;
 *               string created_by = 12;
 *               uint64 updated_at = 13;
 *               string updated_by = 14;
 *           }
 */
function _lectureDeserialization(lec) {
    return {
        id: lec.getId(),
        title: lec.getTitle(),
        description: lec.getDescription(),
        classId: lec.getClassId(),
        batches: lec.getBatchesList(),
        scheduledAt: new Date(lec.getScheduledAt()),
        instituteId: lec.getInstituteId(),
        subjectId: lec.getSubjectId(),
        facultyId: lec.getFacultyId(),
        duration: lec.getDuration(),
        isLive: lec.getIsLive(),
        liveSessionId: lec.getLiveSessionId() || '',
        createdBy: lec.getCreatedBy(),
        createdAt: lec.getCreatedAt() !== 0 ? new Date(lec.getCreatedAt()) : null,
        updatedBy: lec.getUpdatedBy(),
        updatedAt: lec.getUpdatedAt() !== 0 ? new Date(lec.getUpdatedAt()) : null

    }
}


function _metaLectureDeserializer(obj) {
    return {
        lecture: _lectureDeserialization(obj.getLecture()),
        class: _classDeserializer(obj.getClass()),
        faculty: _userDeserializer(obj.getFaculty())
    };
}

module.exports = {
    getBasicAuth() {
        return 'Basic ' + (new Buffer.from('OPENVIDUAPP:' + keys.openViduSecret).toString('base64'));
    },


    deserializer(obj, t) {
        if (t === 'user') {
            return _userDeserializer(obj);
        } else if (t === 'class') {
            return _classDeserializer(obj);
        } else if (t === 'subject') {
            return _subjectDeserializer(obj);
        } else if (t === 'lecture') {
            return _lectureDeserialization(obj);
        } else if (t === 'metaLecture') {
            return _metaLectureDeserializer(obj);
        }
    },
}