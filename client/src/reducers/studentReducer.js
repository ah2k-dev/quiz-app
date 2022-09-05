import {
  GETCOURSES_REQUEST,
  GETCOURSES_FAILURE,
  GETCOURSES_SUCCESS,
  GETQUIZES_FAILURE,
  GETQUIZES_REQUEST,
  GETQUIZES_SUCCESS,
  GETQUIZ_FAILURE,
  GETQUIZ_REQUEST,
  GETQUIZ_SUCCESS,
  ATTEMPTQUIZ_FAILURE,
  ATTEMPTQUIZ_REQUEST,
  ATTEMPTQUIZ_SUCCESS,
  GETALLRESULTS_FAILURE,
  GETALLRESULTS_REQUEST,
  GETALLRESULTS_SUCCESS,
  ANTICHEAT_FAILURE,
  ANTICHEAT_REQUEST,
  ANTICHEAT_SUCCESS,
} from "../constants/studentConstants";
import { CLEAR_ERRORS } from "../constants/userConstants";

export const studentReducer = (state = { response: {} }, action) => {
  switch (action.type) {
    case GETCOURSES_REQUEST:
    case GETQUIZES_REQUEST:
    case GETQUIZ_REQUEST:
    case ATTEMPTQUIZ_REQUEST:
    case GETALLRESULTS_REQUEST:
    case ANTICHEAT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GETCOURSES_FAILURE:
    case GETQUIZES_FAILURE:
    case GETQUIZ_FAILURE:
    case ATTEMPTQUIZ_FAILURE:
    case GETALLRESULTS_FAILURE:
    case ANTICHEAT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        response: null,
      };
    case GETCOURSES_SUCCESS:
    case GETQUIZES_SUCCESS:
    case GETQUIZ_SUCCESS:
    case ATTEMPTQUIZ_SUCCESS:
    case GETALLRESULTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        response: action.payload,
      };
    case ANTICHEAT_SUCCESS:
      return {
        ...state,
        loading: false,
        cheatingDetection: true,
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
