import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  PRESISTLOGIN_REQUEST,
  PRESISTLOGIN_SUCCESS,
  PRESISTLOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  CLEAR_ERRORS,
} from "../constants/userConstants";
export const userReducer = (state = { userData: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case PRESISTLOGIN_REQUEST:
    case LOGOUT_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
    case PRESISTLOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        userData: action.payload,
      };
    case LOGIN_FAILURE:
    case PRESISTLOGIN_FAILURE:
    case LOGOUT_FAILURE:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        userData: {},
        error: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        loading: false,
        isAuthenticated: false,
        userData: {},
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
