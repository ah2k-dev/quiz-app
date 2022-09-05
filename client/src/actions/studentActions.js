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

import axios from "axios";

//axios defaults
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");
axios.defaults.headers.common["Content-Type"] = "application/json";

//get courses
export const getCourses = (id) => async (dispatch) => {
  try {
    dispatch({ type: GETCOURSES_REQUEST });
    const res = await axios.get(`/student/getCourses/${id}`);
    dispatch({ type: GETCOURSES_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GETCOURSES_FAILURE, payload: error.response.data.error });
  }
};

//get quizzes
export const getCourseQuizzes = (id) => async (dispatch) => {
  try {
    dispatch({ type: GETQUIZES_REQUEST });
    const res = await axios.get(`/student/getCourseQuizes/${id}`);
    dispatch({ type: GETQUIZES_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GETQUIZES_FAILURE, payload: error.response.data.error });
  }
};

//get quiz
export const getQuiz = (id) => async (dispatch) => {
  try {
    dispatch({ type: GETQUIZ_REQUEST });
    const res = await axios.get(`/student/getQuiz/${id}`);
    dispatch({ type: GETQUIZ_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GETQUIZ_FAILURE, payload: error.response.data.error });
  }
};

//attempt quiz
export const attemptQuiz =
  (id, stdId, submission, late) => async (dispatch) => {
    try {
      dispatch({ type: ATTEMPTQUIZ_REQUEST });
      const res = await axios.post(`/student/attemptQuiz/${id}`, {
        submission,
        stdId,
        late,
      });
      dispatch({ type: ATTEMPTQUIZ_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({
        type: ATTEMPTQUIZ_FAILURE,
        payload: error.response.data.error,
      });
    }
  };

//get all results
export const getAllResults = (id) => async (dispatch) => {
  try {
    dispatch({ type: GETALLRESULTS_REQUEST });
    const res = await axios.get(`/student/getAllResults/${id}`);
    dispatch({ type: GETALLRESULTS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: GETALLRESULTS_FAILURE,
      payload: error.response.data.error,
    });
  }
};
export const antiCheat = (id, stdId) => {return async (dispatch) => {
  try {
    // dispatch({ type: ANTICHEAT_REQUEST }); //unknown error + no need for it
    const res = await axios.post(`/student/antiCheat/${id}`, { stdId });
    if(res){
      dispatch({ type: ANTICHEAT_SUCCESS, payload: res.data });
    }
  } catch (error) {
    dispatch({ type: ANTICHEAT_FAILURE, payload: error.response.data.error });
  }
}}


// clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
