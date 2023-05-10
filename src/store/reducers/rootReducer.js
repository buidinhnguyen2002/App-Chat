import {combineReducers} from "@reduxjs/toolkit";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    userReducer: userReducer,
});
export default rootReducer;