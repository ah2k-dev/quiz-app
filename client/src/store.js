import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userReducer } from "./reducers/userReducer";
import { adminReducer } from "./reducers/adminReducer";
import { teacherReducer } from "./reducers/teacherReducer";
import { studentReducer } from "./reducers/studentReducer";
const reducer = combineReducers({
  userReducer,
  adminReducer,
  teacherReducer,
  studentReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
