import {React} from "react";
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Login from "./page/login/login";
import ChatPage from "./page/Chat/chat";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate, Routes} from "react-router-dom";
import store from "./store/store";
import {Provider} from "react-redux";


const router = createBrowserRouter(
        createRoutesFromElements([
            <Route path={"/"} element={<Login status={"login"}/>}/>,
            <Route path={"/chat"}  element={<ChatPage />} />



            ]
        ),
);


function App() {
    return (
        // <div className="app">
        //
        //     {/*<Login status="login"/>*/}
        // </div>
        <RouterProvider router={router}/>
    );
}

export default App;
