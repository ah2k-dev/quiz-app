import axios from "axios";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  PRESISTLOGIN_REQUEST,
  PRESISTLOGIN_SUCCESS,
  PRESISTLOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  CLEAR_ERRORS,
} from "../constants/userConstants";

axios.defaults.baseURL = "http://localhost:8000";

// Login
export const login = (values) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(`/auth/login`, values, config);
    dispatch({ type: LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.response.data.message });
  }
};

// Presist login
export const presistLogin = (token) => async (dispatch) => {
  try {
    dispatch({ type: PRESISTLOGIN_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.post(
      `/auth/presist-login`,
      { token: token },
      config
    );
    dispatch({ type: PRESISTLOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRESISTLOGIN_FAILURE,
      payload: error.response.data,
    });
  }
};

//logout
export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.get(`/auth/logout`, config);
    localStorage.removeItem("token");
    dispatch({ type: LOGOUT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LOGOUT_FAILURE, payload: error.response.data });
  }
};

// clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
