import {
  ADDTEACHER_FAILURE,
  ADDTEACHER_REQUEST,
  ADDTEACHER_SUCCESS,
  GETTEACHERS_FAILURE,
  GETTEACHERS_REQUEST,
  GETTEACHERS_SUCCESS,
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
  GETSTUDENTRESULTS_FAILURE,
  GETSTUDENTRESULTS_REQUEST,
  GETSTUDENTRESULTS_SUCCESS,
} from "../constants/adminConstants";
import { CLEAR_ERRORS } from "../constants/userConstants";

import axios from "axios";

//axios defaults
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");
axios.defaults.headers.common["Content-Type"] = "appliccation/json";

// Add Teacher
export const addTeacher = (data) => async (dispatch) => {
  try {
    const { name, email, password, qualification } = data;
    dispatch({ type: ADDTEACHER_REQUEST });
    const res = await axios.post("/admin/addTeacher", {
      name,
      email,
      password,
      role: "teacher",
      qualification,
    });
    dispatch({ type: ADDTEACHER_SUCCESS, payload: res });
  } catch (error) {
    dispatch({ type: ADDTEACHER_FAILURE, payload: error.response.data });
  }
};

//Get all teachers
export const getTeachers = () => async (dispatch) => {
  try {
    dispatch({ type: GETTEACHERS_REQUEST });
    const res = await axios.get("/admin/getTeachers");
    dispatch({ type: GETTEACHERS_SUCCESS, payload: res });
  } catch (error) {
    dispatch({ type: GETTEACHERS_FAILURE, payload: error.response.data });
  }
};

//get all students
export const getStudents = () => async (dispatch) => {
  try {
    dispatch({ type: GETSTUDENTS_REQUEST });
    const res = await axios.get("/admin/getStudents");
    dispatch({ type: GETSTUDENTS_SUCCESS, payload: res });
  } catch (error) {
    dispatch({ type: GETSTUDENTS_FAILURE, payload: error.response.data });
  }
};

//get quizes
export const getQuizes = () => async (dispatch) => {
  try {
    dispatch({ type: GETQUIZES_REQUEST });
    const res = await axios.get("/admin/getQuizes");
    dispatch({ type: GETQUIZES_SUCCESS, payload: res });
  } catch (error) {
    dispatch({ type: GETQUIZES_FAILURE, payload: error.response.data });
  }
};

//get course quizes
export const getCourseQuizes = (id) => async (dispatch) => {
  try {
    dispatch({ type: GETQUIZES_REQUEST });
    const res = await axios.get(`/admin/getCourseQuizes/${id}`);
    dispatch({ type: GETQUIZES_SUCCESS, payload: res });
  } catch (error) {
    dispatch({ type: GETQUIZES_FAILURE, payload: error.response.data });
  }
};

//get courses
export const getCourses = () => async (dispatch) => {
  try {
    dispatch({ type: GETCOURSES_REQUEST });
    const res = await axios.get("/admin/getCourses");
    dispatch({ type: GETCOURSES_SUCCESS, payload: res });
  } catch (error) {
    dispatch({ type: GETCOURSES_FAILURE, payload: error.response.data });
  }
};

//get quiz results
export const getQuizResults = (id) => async (dispatch) => {
  try {
    dispatch({ type: GETQUIZRESULTS_REQUEST });
    const res = await axios.get(`/admin/getResults/${id}`);
    dispatch({ type: GETQUIZRESULTS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GETQUIZRESULTS_FAILURE, payload: error.response.data });
  }
};

//get quiz results
export const getStudentResults = (id) => async (dispatch) => {
  try {
    dispatch({ type: GETSTUDENTRESULTS_REQUEST });
    const res = await axios.get(`/admin/getResults/${id}`);
    dispatch({ type: GETSTUDENTRESULTS_SUCCESS, payload: res });
  } catch (error) {
    dispatch({ type: GETSTUDENTRESULTS_FAILURE, payload: error.response.data });
  }
};

// clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
