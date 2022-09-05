import {
  ADDTEACHER_FAILURE,
  ADDTEACHER_REQUEST,
  ADDTEACHER_SUCCESS,
  GETTEACHERS_FAILURE,
  GETTEACHERS_REQUEST,
  GETTEACHERS_SUCCESS,
  GETSTUDENTRESULTS_FAILURE,
  GETSTUDENTRESULTS_REQUEST,
  GETSTUDENTRESULTS_SUCCESS,
  GETSTUDENTS_FAILURE,
  GETSTUDENTS_REQUEST,
  GETSTUDENTS_SUCCESS,
  GETQUIZRESULTS_FAILURE,
  GETQUIZRESULTS_REQUEST,
  GETQUIZRESULTS_SUCCESS,
  GETQUIZES_FAILURE,
  GETQUIZES_REQUEST,
  GETQUIZES_SUCCESS,
  GETCOURSES_FAILURE,
  GETCOURSES_REQUEST,
  GETCOURSES_SUCCESS,
} from "../constants/adminConstants";
import { CLEAR_ERRORS } from "../constants/userConstants";

export const adminReducer = (state = { response: {} }, action) => {
  switch (action.type) {
    case ADDTEACHER_REQUEST:
    case GETTEACHERS_REQUEST:
    case GETSTUDENTS_REQUEST:
    case GETQUIZES_REQUEST:
    case GETCOURSES_REQUEST:
    case GETQUIZRESULTS_REQUEST:
    case GETSTUDENTRESULTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADDTEACHER_SUCCESS:
    case GETTEACHERS_SUCCESS:
    case GETSTUDENTRESULTS_SUCCESS:
    case GETSTUDENTS_SUCCESS:
    case GETQUIZES_SUCCESS:
    case GETCOURSES_SUCCESS:
    case GETQUIZRESULTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        response: action.payload,
      };
    case ADDTEACHER_FAILURE:
    case GETTEACHERS_FAILURE:
    case GETSTUDENTRESULTS_FAILURE:
    case GETSTUDENTS_FAILURE:
    case GETQUIZES_FAILURE:
    case GETCOURSES_FAILURE:
    case GETQUIZRESULTS_FAILURE:
      return {
        ...state,
        loading: false,
        response: null,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
