import {combineReducers} from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import meetingReducer from "./meetingReducer";
import apiReducer from "./apiReducer";

const rootReducer = combineReducers({
    userReducer: userReducer,
    meetingReducer: meetingReducer,
    apiReducer: apiReducer,
});
export default rootReducer;