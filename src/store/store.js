import {createStore, combineReducers} from "@reduxjs/toolkit";
import rootReducer from "./reducers/rootReducer";
const store = createStore(rootReducer);
store.subscribe(()=> {
    console.log('State update: ',store.getState());
})
export default store;