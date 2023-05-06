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
import ChatDetail from "./components/chat/chat";



const router = createBrowserRouter(
    [
        {
        path: "/",
        element: <Login status={"login"}/>,
    }, {
        path: "/",
        element: <ChatPage />,
        children: [
            {
                path: "chat",
                element: <ChatDetail/>
            },
            {
              path: "setting",
              element: <div>Setting</div>,
            },
        ],
        },
    ]
);


function App() {
    return (
        <RouterProvider router={router}/>
    );
}

export default App;
