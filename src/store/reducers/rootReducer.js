import {combineReducers} from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import meetingReducer from "./meetingReducer";

const rootReducer = combineReducers({
    userReducer: userReducer,
    meetingReducer: meetingReducer,
});
export default rootReducer;