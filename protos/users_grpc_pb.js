// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var protos_users_pb = require('../protos/users_pb.js');
var protos_entity_pb = require('../protos/entity_pb.js');

function serialize_users_DeleteLectureRequest(arg) {
  if (!(arg instanceof protos_users_pb.DeleteLectureRequest)) {
    throw new Error('Expected argument of type users.DeleteLectureRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_DeleteLectureRequest(buffer_arg) {
  return protos_users_pb.DeleteLectureRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_DeleteLectureResponse(arg) {
  if (!(arg instanceof protos_users_pb.DeleteLectureResponse)) {
    throw new Error('Expected argument of type users.DeleteLectureResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_DeleteLectureResponse(buffer_arg) {
  return protos_users_pb.DeleteLectureResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_EditLectureRequest(arg) {
  if (!(arg instanceof protos_users_pb.EditLectureRequest)) {
    throw new Error('Expected argument of type users.EditLectureRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_EditLectureRequest(buffer_arg) {
  return protos_users_pb.EditLectureRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_EditLectureResponse(arg) {
  if (!(arg instanceof protos_users_pb.EditLectureResponse)) {
    throw new Error('Expected argument of type users.EditLectureResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_EditLectureResponse(buffer_arg) {
  return protos_users_pb.EditLectureResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_FacultySignUpRequest(arg) {
  if (!(arg instanceof protos_users_pb.FacultySignUpRequest)) {
    throw new Error('Expected argument of type users.FacultySignUpRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_FacultySignUpRequest(buffer_arg) {
  return protos_users_pb.FacultySignUpRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_FacultySignUpResponse(arg) {
  if (!(arg instanceof protos_users_pb.FacultySignUpResponse)) {
    throw new Error('Expected argument of type users.FacultySignUpResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_FacultySignUpResponse(buffer_arg) {
  return protos_users_pb.FacultySignUpResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_GetLectureAttendanceRequest(arg) {
  if (!(arg instanceof protos_users_pb.GetLectureAttendanceRequest)) {
    throw new Error('Expected argument of type users.GetLectureAttendanceRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_GetLectureAttendanceRequest(buffer_arg) {
  return protos_users_pb.GetLectureAttendanceRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_GetLectureAttendanceResponse(arg) {
  if (!(arg instanceof protos_users_pb.GetLectureAttendanceResponse)) {
    throw new Error('Expected argument of type users.GetLectureAttendanceResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_GetLectureAttendanceResponse(buffer_arg) {
  return protos_users_pb.GetLectureAttendanceResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_GetLectureRequest(arg) {
  if (!(arg instanceof protos_users_pb.GetLectureRequest)) {
    throw new Error('Expected argument of type users.GetLectureRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_GetLectureRequest(buffer_arg) {
  return protos_users_pb.GetLectureRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_GetLectureResponse(arg) {
  if (!(arg instanceof protos_users_pb.GetLectureResponse)) {
    throw new Error('Expected argument of type users.GetLectureResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_GetLectureResponse(buffer_arg) {
  return protos_users_pb.GetLectureResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_GetLecturesByTimelineRequest(arg) {
  if (!(arg instanceof protos_users_pb.GetLecturesByTimelineRequest)) {
    throw new Error('Expected argument of type users.GetLecturesByTimelineRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_GetLecturesByTimelineRequest(buffer_arg) {
  return protos_users_pb.GetLecturesByTimelineRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_GetLecturesByTimelineResponse(arg) {
  if (!(arg instanceof protos_users_pb.GetLecturesByTimelineResponse)) {
    throw new Error('Expected argument of type users.GetLecturesByTimelineResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_GetLecturesByTimelineResponse(buffer_arg) {
  return protos_users_pb.GetLecturesByTimelineResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_GetLecturesRequest(arg) {
  if (!(arg instanceof protos_users_pb.GetLecturesRequest)) {
    throw new Error('Expected argument of type users.GetLecturesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_GetLecturesRequest(buffer_arg) {
  return protos_users_pb.GetLecturesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_GetLecturesResponse(arg) {
  if (!(arg instanceof protos_users_pb.GetLecturesResponse)) {
    throw new Error('Expected argument of type users.GetLecturesResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_GetLecturesResponse(buffer_arg) {
  return protos_users_pb.GetLecturesResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_GetPastLecturesRequest(arg) {
  if (!(arg instanceof protos_users_pb.GetPastLecturesRequest)) {
    throw new Error('Expected argument of type users.GetPastLecturesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_GetPastLecturesRequest(buffer_arg) {
  return protos_users_pb.GetPastLecturesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_GetPastLecturesResponse(arg) {
  if (!(arg instanceof protos_users_pb.GetPastLecturesResponse)) {
    throw new Error('Expected argument of type users.GetPastLecturesResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_GetPastLecturesResponse(buffer_arg) {
  return protos_users_pb.GetPastLecturesResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_GetSignedUploadUrlRequest(arg) {
  if (!(arg instanceof protos_users_pb.GetSignedUploadUrlRequest)) {
    throw new Error('Expected argument of type users.GetSignedUploadUrlRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_GetSignedUploadUrlRequest(buffer_arg) {
  return protos_users_pb.GetSignedUploadUrlRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_GetSignedUploadUrlResponse(arg) {
  if (!(arg instanceof protos_users_pb.GetSignedUploadUrlResponse)) {
    throw new Error('Expected argument of type users.GetSignedUploadUrlResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_GetSignedUploadUrlResponse(buffer_arg) {
  return protos_users_pb.GetSignedUploadUrlResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_GetStudentSubjectsRequest(arg) {
  if (!(arg instanceof protos_users_pb.GetStudentSubjectsRequest)) {
    throw new Error('Expected argument of type users.GetStudentSubjectsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_GetStudentSubjectsRequest(buffer_arg) {
  return protos_users_pb.GetStudentSubjectsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_GetStudentSubjectsResponse(arg) {
  if (!(arg instanceof protos_users_pb.GetStudentSubjectsResponse)) {
    throw new Error('Expected argument of type users.GetStudentSubjectsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_GetStudentSubjectsResponse(buffer_arg) {
  return protos_users_pb.GetStudentSubjectsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_GetStudentsOfLectureRequest(arg) {
  if (!(arg instanceof protos_users_pb.GetStudentsOfLectureRequest)) {
    throw new Error('Expected argument of type users.GetStudentsOfLectureRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_GetStudentsOfLectureRequest(buffer_arg) {
  return protos_users_pb.GetStudentsOfLectureRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_GetStudentsOfLectureResponse(arg) {
  if (!(arg instanceof protos_users_pb.GetStudentsOfLectureResponse)) {
    throw new Error('Expected argument of type users.GetStudentsOfLectureResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_GetStudentsOfLectureResponse(buffer_arg) {
  return protos_users_pb.GetStudentsOfLectureResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_GetTeachingStaffRequest(arg) {
  if (!(arg instanceof protos_users_pb.GetTeachingStaffRequest)) {
    throw new Error('Expected argument of type users.GetTeachingStaffRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_GetTeachingStaffRequest(buffer_arg) {
  return protos_users_pb.GetTeachingStaffRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_GetTeachingStaffResponse(arg) {
  if (!(arg instanceof protos_users_pb.GetTeachingStaffResponse)) {
    throw new Error('Expected argument of type users.GetTeachingStaffResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_GetTeachingStaffResponse(buffer_arg) {
  return protos_users_pb.GetTeachingStaffResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_GetUpcomingLecturesRequest(arg) {
  if (!(arg instanceof protos_users_pb.GetUpcomingLecturesRequest)) {
    throw new Error('Expected argument of type users.GetUpcomingLecturesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_GetUpcomingLecturesRequest(buffer_arg) {
  return protos_users_pb.GetUpcomingLecturesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_GetUpcomingLecturesResponse(arg) {
  if (!(arg instanceof protos_users_pb.GetUpcomingLecturesResponse)) {
    throw new Error('Expected argument of type users.GetUpcomingLecturesResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_GetUpcomingLecturesResponse(buffer_arg) {
  return protos_users_pb.GetUpcomingLecturesResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_GetUserInfoRequest(arg) {
  if (!(arg instanceof protos_users_pb.GetUserInfoRequest)) {
    throw new Error('Expected argument of type users.GetUserInfoRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_GetUserInfoRequest(buffer_arg) {
  return protos_users_pb.GetUserInfoRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_GetUserInfoResponse(arg) {
  if (!(arg instanceof protos_users_pb.GetUserInfoResponse)) {
    throw new Error('Expected argument of type users.GetUserInfoResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_GetUserInfoResponse(buffer_arg) {
  return protos_users_pb.GetUserInfoResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_LectureLiveSessionIdResponse(arg) {
  if (!(arg instanceof protos_users_pb.LectureLiveSessionIdResponse)) {
    throw new Error('Expected argument of type users.LectureLiveSessionIdResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_LectureLiveSessionIdResponse(buffer_arg) {
  return protos_users_pb.LectureLiveSessionIdResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_MarkAttendanceRequest(arg) {
  if (!(arg instanceof protos_users_pb.MarkAttendanceRequest)) {
    throw new Error('Expected argument of type users.MarkAttendanceRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_MarkAttendanceRequest(buffer_arg) {
  return protos_users_pb.MarkAttendanceRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_MarkAttendanceResponse(arg) {
  if (!(arg instanceof protos_users_pb.MarkAttendanceResponse)) {
    throw new Error('Expected argument of type users.MarkAttendanceResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_MarkAttendanceResponse(buffer_arg) {
  return protos_users_pb.MarkAttendanceResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_ScheduleLectureRequest(arg) {
  if (!(arg instanceof protos_users_pb.ScheduleLectureRequest)) {
    throw new Error('Expected argument of type users.ScheduleLectureRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_ScheduleLectureRequest(buffer_arg) {
  return protos_users_pb.ScheduleLectureRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_ScheduleLectureResponse(arg) {
  if (!(arg instanceof protos_users_pb.ScheduleLectureResponse)) {
    throw new Error('Expected argument of type users.ScheduleLectureResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_ScheduleLectureResponse(buffer_arg) {
  return protos_users_pb.ScheduleLectureResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_SetLectureStatusRequest(arg) {
  if (!(arg instanceof protos_users_pb.SetLectureStatusRequest)) {
    throw new Error('Expected argument of type users.SetLectureStatusRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_SetLectureStatusRequest(buffer_arg) {
  return protos_users_pb.SetLectureStatusRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_SetLectureStatusResponse(arg) {
  if (!(arg instanceof protos_users_pb.SetLectureStatusResponse)) {
    throw new Error('Expected argument of type users.SetLectureStatusResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_SetLectureStatusResponse(buffer_arg) {
  return protos_users_pb.SetLectureStatusResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_StudentSignUpRequest(arg) {
  if (!(arg instanceof protos_users_pb.StudentSignUpRequest)) {
    throw new Error('Expected argument of type users.StudentSignUpRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_StudentSignUpRequest(buffer_arg) {
  return protos_users_pb.StudentSignUpRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_StudentSignUpResponse(arg) {
  if (!(arg instanceof protos_users_pb.StudentSignUpResponse)) {
    throw new Error('Expected argument of type users.StudentSignUpResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_StudentSignUpResponse(buffer_arg) {
  return protos_users_pb.StudentSignUpResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var UserServiceService = exports.UserServiceService = {
  getUserInfo: {
    path: '/users.UserService/GetUserInfo',
    requestStream: false,
    responseStream: false,
    requestType: protos_users_pb.GetUserInfoRequest,
    responseType: protos_users_pb.GetUserInfoResponse,
    requestSerialize: serialize_users_GetUserInfoRequest,
    requestDeserialize: deserialize_users_GetUserInfoRequest,
    responseSerialize: serialize_users_GetUserInfoResponse,
    responseDeserialize: deserialize_users_GetUserInfoResponse,
  },
  facultySignUp: {
    path: '/users.UserService/FacultySignUp',
    requestStream: false,
    responseStream: false,
    requestType: protos_users_pb.FacultySignUpRequest,
    responseType: protos_users_pb.FacultySignUpResponse,
    requestSerialize: serialize_users_FacultySignUpRequest,
    requestDeserialize: deserialize_users_FacultySignUpRequest,
    responseSerialize: serialize_users_FacultySignUpResponse,
    responseDeserialize: deserialize_users_FacultySignUpResponse,
  },
  studentSignUp: {
    path: '/users.UserService/StudentSignUp',
    requestStream: false,
    responseStream: false,
    requestType: protos_users_pb.StudentSignUpRequest,
    responseType: protos_users_pb.StudentSignUpResponse,
    requestSerialize: serialize_users_StudentSignUpRequest,
    requestDeserialize: deserialize_users_StudentSignUpRequest,
    responseSerialize: serialize_users_StudentSignUpResponse,
    responseDeserialize: deserialize_users_StudentSignUpResponse,
  },
  scheduleLecture: {
    path: '/users.UserService/ScheduleLecture',
    requestStream: false,
    responseStream: false,
    requestType: protos_users_pb.ScheduleLectureRequest,
    responseType: protos_users_pb.ScheduleLectureResponse,
    requestSerialize: serialize_users_ScheduleLectureRequest,
    requestDeserialize: deserialize_users_ScheduleLectureRequest,
    responseSerialize: serialize_users_ScheduleLectureResponse,
    responseDeserialize: deserialize_users_ScheduleLectureResponse,
  },
  getLectures: {
    path: '/users.UserService/GetLectures',
    requestStream: false,
    responseStream: false,
    requestType: protos_users_pb.GetLecturesRequest,
    responseType: protos_users_pb.GetLecturesResponse,
    requestSerialize: serialize_users_GetLecturesRequest,
    requestDeserialize: deserialize_users_GetLecturesRequest,
    responseSerialize: serialize_users_GetLecturesResponse,
    responseDeserialize: deserialize_users_GetLecturesResponse,
  },
  getLecture: {
    path: '/users.UserService/GetLecture',
    requestStream: false,
    responseStream: false,
    requestType: protos_users_pb.GetLectureRequest,
    responseType: protos_users_pb.GetLectureResponse,
    requestSerialize: serialize_users_GetLectureRequest,
    requestDeserialize: deserialize_users_GetLectureRequest,
    responseSerialize: serialize_users_GetLectureResponse,
    responseDeserialize: deserialize_users_GetLectureResponse,
  },
  editLecture: {
    path: '/users.UserService/EditLecture',
    requestStream: false,
    responseStream: false,
    requestType: protos_users_pb.EditLectureRequest,
    responseType: protos_users_pb.EditLectureResponse,
    requestSerialize: serialize_users_EditLectureRequest,
    requestDeserialize: deserialize_users_EditLectureRequest,
    responseSerialize: serialize_users_EditLectureResponse,
    responseDeserialize: deserialize_users_EditLectureResponse,
  },
  deleteLecture: {
    path: '/users.UserService/DeleteLecture',
    requestStream: false,
    responseStream: false,
    requestType: protos_users_pb.DeleteLectureRequest,
    responseType: protos_users_pb.DeleteLectureResponse,
    requestSerialize: serialize_users_DeleteLectureRequest,
    requestDeserialize: deserialize_users_DeleteLectureRequest,
    responseSerialize: serialize_users_DeleteLectureResponse,
    responseDeserialize: deserialize_users_DeleteLectureResponse,
  },
  createLectureLiveSessionId: {
    path: '/users.UserService/CreateLectureLiveSessionId',
    requestStream: false,
    responseStream: false,
    requestType: protos_users_pb.GetLectureRequest,
    responseType: protos_users_pb.LectureLiveSessionIdResponse,
    requestSerialize: serialize_users_GetLectureRequest,
    requestDeserialize: deserialize_users_GetLectureRequest,
    responseSerialize: serialize_users_LectureLiveSessionIdResponse,
    responseDeserialize: deserialize_users_LectureLiveSessionIdResponse,
  },
  getStudentsOfLecture: {
    path: '/users.UserService/GetStudentsOfLecture',
    requestStream: false,
    responseStream: false,
    requestType: protos_users_pb.GetStudentsOfLectureRequest,
    responseType: protos_users_pb.GetStudentsOfLectureResponse,
    requestSerialize: serialize_users_GetStudentsOfLectureRequest,
    requestDeserialize: deserialize_users_GetStudentsOfLectureRequest,
    responseSerialize: serialize_users_GetStudentsOfLectureResponse,
    responseDeserialize: deserialize_users_GetStudentsOfLectureResponse,
  },
  getTeachingStaff: {
    path: '/users.UserService/GetTeachingStaff',
    requestStream: false,
    responseStream: false,
    requestType: protos_users_pb.GetTeachingStaffRequest,
    responseType: protos_users_pb.GetTeachingStaffResponse,
    requestSerialize: serialize_users_GetTeachingStaffRequest,
    requestDeserialize: deserialize_users_GetTeachingStaffRequest,
    responseSerialize: serialize_users_GetTeachingStaffResponse,
    responseDeserialize: deserialize_users_GetTeachingStaffResponse,
  },
  getUpcomingLectures: {
    path: '/users.UserService/GetUpcomingLectures',
    requestStream: false,
    responseStream: false,
    requestType: protos_users_pb.GetUpcomingLecturesRequest,
    responseType: protos_users_pb.GetUpcomingLecturesResponse,
    requestSerialize: serialize_users_GetUpcomingLecturesRequest,
    requestDeserialize: deserialize_users_GetUpcomingLecturesRequest,
    responseSerialize: serialize_users_GetUpcomingLecturesResponse,
    responseDeserialize: deserialize_users_GetUpcomingLecturesResponse,
  },
  getPastLectures: {
    path: '/users.UserService/GetPastLectures',
    requestStream: false,
    responseStream: false,
    requestType: protos_users_pb.GetPastLecturesRequest,
    responseType: protos_users_pb.GetPastLecturesResponse,
    requestSerialize: serialize_users_GetPastLecturesRequest,
    requestDeserialize: deserialize_users_GetPastLecturesRequest,
    responseSerialize: serialize_users_GetPastLecturesResponse,
    responseDeserialize: deserialize_users_GetPastLecturesResponse,
  },
  getLecturesByTimeline: {
    path: '/users.UserService/GetLecturesByTimeline',
    requestStream: false,
    responseStream: false,
    requestType: protos_users_pb.GetLecturesByTimelineRequest,
    responseType: protos_users_pb.GetLecturesByTimelineResponse,
    requestSerialize: serialize_users_GetLecturesByTimelineRequest,
    requestDeserialize: deserialize_users_GetLecturesByTimelineRequest,
    responseSerialize: serialize_users_GetLecturesByTimelineResponse,
    responseDeserialize: deserialize_users_GetLecturesByTimelineResponse,
  },
  setLectureStatus: {
    path: '/users.UserService/SetLectureStatus',
    requestStream: false,
    responseStream: false,
    requestType: protos_users_pb.SetLectureStatusRequest,
    responseType: protos_users_pb.SetLectureStatusResponse,
    requestSerialize: serialize_users_SetLectureStatusRequest,
    requestDeserialize: deserialize_users_SetLectureStatusRequest,
    responseSerialize: serialize_users_SetLectureStatusResponse,
    responseDeserialize: deserialize_users_SetLectureStatusResponse,
  },
  getStudentSubjects: {
    path: '/users.UserService/GetStudentSubjects',
    requestStream: false,
    responseStream: false,
    requestType: protos_users_pb.GetStudentSubjectsRequest,
    responseType: protos_users_pb.GetStudentSubjectsResponse,
    requestSerialize: serialize_users_GetStudentSubjectsRequest,
    requestDeserialize: deserialize_users_GetStudentSubjectsRequest,
    responseSerialize: serialize_users_GetStudentSubjectsResponse,
    responseDeserialize: deserialize_users_GetStudentSubjectsResponse,
  },
  getSignedUploadUrl: {
    path: '/users.UserService/GetSignedUploadUrl',
    requestStream: false,
    responseStream: false,
    requestType: protos_users_pb.GetSignedUploadUrlRequest,
    responseType: protos_users_pb.GetSignedUploadUrlResponse,
    requestSerialize: serialize_users_GetSignedUploadUrlRequest,
    requestDeserialize: deserialize_users_GetSignedUploadUrlRequest,
    responseSerialize: serialize_users_GetSignedUploadUrlResponse,
    responseDeserialize: deserialize_users_GetSignedUploadUrlResponse,
  },
  markAttendance: {
    path: '/users.UserService/MarkAttendance',
    requestStream: false,
    responseStream: false,
    requestType: protos_users_pb.MarkAttendanceRequest,
    responseType: protos_users_pb.MarkAttendanceResponse,
    requestSerialize: serialize_users_MarkAttendanceRequest,
    requestDeserialize: deserialize_users_MarkAttendanceRequest,
    responseSerialize: serialize_users_MarkAttendanceResponse,
    responseDeserialize: deserialize_users_MarkAttendanceResponse,
  },
  getLectureAttendance: {
    path: '/users.UserService/GetLectureAttendance',
    requestStream: false,
    responseStream: false,
    requestType: protos_users_pb.GetLectureAttendanceRequest,
    responseType: protos_users_pb.GetLectureAttendanceResponse,
    requestSerialize: serialize_users_GetLectureAttendanceRequest,
    requestDeserialize: deserialize_users_GetLectureAttendanceRequest,
    responseSerialize: serialize_users_GetLectureAttendanceResponse,
    responseDeserialize: deserialize_users_GetLectureAttendanceResponse,
  },
};

exports.UserServiceClient = grpc.makeGenericClientConstructor(UserServiceService);
