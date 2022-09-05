import {
  ADDCOURSE_FAILURE,
  ADDCOURSE_REQUEST,
  ADDCOURSE_SUCCESS,
  ADDSTUDENT_FAILURE,
  ADDSTUDENT_REQUEST,
  ADDSTUDENT_SUCCESS,
  ADDQUIZ_FAILURE,
  ADDQUIZ_REQUEST,
  ADDQUIZ_SUCCESS,
  ENROLLSTUDENTS_FAILURE,
  ENROLLSTUDENTS_REQUEST,
  ENROLLSTUDENTS_SUCCESS,
  GETTEACHERCOURSES_FAILURE,
  GETTEACHERCOURSES_REQUEST,
  GETTEACHERCOURSES_SUCCESS,
  GETSTUDENTS_FAILURE,
  GETSTUDENTS_REQUEST,
  GETSTUDENTS_SUCCESS,
  GETCOURSEQUIZES_FAILURE,
  GETCOURSEQUIZES_REQUEST,
  GETCOURSEQUIZES_SUCCESS,
  GETQUIZRESULTS_FAILURE,
  GETQUIZRESULTS_REQUEST,
  GETQUIZRESULTS_SUCCESS,
} from "../constants/teacherConstants";
import { CLEAR_ERRORS } from "../constants/userConstants";
import axios from "axios";

//axios defaults
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");
axios.defaults.headers.common["Content-Type"] = "appliccation/json";

//add course
export const addCourse = (data, id) => async (dispatch) => {
  try {
    dispatch({ type: ADDCOURSE_REQUEST });
    const res = await axios.post(`/teacher/addCourse/${id}`, data);
    dispatch({ type: ADDCOURSE_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: ADDCOURSE_FAILURE, payload: error.response.data.error });
  }
};

//add student
export const addStudent = (data, id) => async (dispatch) => {
  try {
    const { name, email, password } = data;
    dispatch({ type: ADDSTUDENT_REQUEST });
    const res = await axios.post(`/teacher/addStudent/${id}`, {
      name,
      email,
      password,
      role: "student",
    });
    dispatch({ type: ADDSTUDENT_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: ADDSTUDENT_FAILURE,
      payload: error.response.data.error,
    });
  }
};

//add quiz
export const addQuiz = (quizData, maxScore, id, timeLimit) => async (dispatch) => {
  try {
    dispatch({ type: ADDQUIZ_REQUEST });
    const res = await axios.post(`/teacher/addQuiz/${id}`, {
      quizData,
      maxScore,
      timeLimit,
    });
    dispatch({ type: ADDQUIZ_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: ADDQUIZ_FAILURE, payload: error.response.data });
  }
};

//add quiz csv
export const addQuizCsv = (file, maxScore, id) => async (dispatch) => {
  try {
    dispatch({ type: ADDQUIZ_REQUEST });
    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("token"),
      },
    };
    let formData = new FormData();
    formData.append("quizData", file);
    formData.append("maxScore", maxScore);

    const res = await axios.post(`/teacher/addQuizCsv/${id}`, formData, config);
    dispatch({ type: ADDQUIZ_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: ADDQUIZ_FAILURE, payload: error.response.data });
  }
};

//enroll students
export const enrollStudents = (studentIds, id) => async (dispatch) => {
  try {
    dispatch({ type: ENROLLSTUDENTS_REQUEST });
    const res = await axios.post(`/teacher/enrollStudents/${id}`, {
      studentIds,
    });
    dispatch({ type: ENROLLSTUDENTS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: ENROLLSTUDENTS_FAILURE, payload: error.response.data });
  }
};

//get teacher courses
export const getTeacherCourses = (id) => async (dispatch) => {
  try {
    dispatch({ type: GETTEACHERCOURSES_REQUEST });
    const res = await axios.get(`/teacher/getMyCourses/${id}`);
    dispatch({ type: GETTEACHERCOURSES_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GETTEACHERCOURSES_FAILURE, payload: error.response.data });
  }
};

//get students
export const getStudents = () => async (dispatch) => {
  try {
    dispatch({ type: GETSTUDENTS_REQUEST });
    const res = await axios.get(`/teacher/getStudents`);
    dispatch({ type: GETSTUDENTS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GETSTUDENTS_FAILURE, payload: error.response.data });
  }
};

//get course quizes
export const getCourseQuizes = (id) => async (dispatch) => {
  try {
    dispatch({ type: GETCOURSEQUIZES_REQUEST });
    const res = await axios.get(`/teacher/getCourseQuizes/${id}`);
    dispatch({ type: GETCOURSEQUIZES_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GETCOURSEQUIZES_FAILURE, payload: error.response.data });
  }
};

//get quiz results
export const getQuizResults = (id) => async (dispatch) => {
  try {
    dispatch({ type: GETQUIZRESULTS_REQUEST });
    const res = await axios.get(`/teacher/getResults/${id}`);
    dispatch({ type: GETQUIZRESULTS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GETQUIZRESULTS_FAILURE, payload: error.response.data });
  }
};

// clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
