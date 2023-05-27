import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"
const firebaseConfig = {
    apiKey: "AIzaSyDopXdiWvayvG88DDL9DkxJAWbGE3V9j1Y",
    authDomain: "chatapp-f5e30.firebaseapp.com",
    projectId: "chatapp-f5e30",
    storageBucket: "chatapp-f5e30.appspot.com",
    messagingSenderId: "227951521309",
    appId: "1:227951521309:web:f92da65aacd7cb18d120f4",
    measurementId: "G-0032NRDYDB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);