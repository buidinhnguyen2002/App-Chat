import {createStore, combineReducers} from "@reduxjs/toolkit";
import rootReducer from "./reducers/rootReducer";
const store = createStore(rootReducer);
store.subscribe(()=> {
    console.log('State update: ',store.getState());
    // localStorage.setItem('user_login',JSON.stringify(store.getState()));
    localStorage.setItem('isLogIn',true);
})
export default store;