import {React} from "react";
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Login from "./page/login/login";
import ChatPage from "./page/Chat/chat";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate, Routes} from "react-router-dom";
import store from "./store/store";
import {Provider, useDispatch} from "react-redux";
import ChatDetail from "./components/chat/chat";
import SettingFragment from "./components/setting_fragment/setting_fragment";
import WindowChat from "./components/chat_window/chat_window";
import {callAPIGetUserList, callAPIReLogIn, client, waitConnection} from "./service/loginService";
import {saveListChat} from "./store/actions/userAction";





function App() {
    const dispatch = useDispatch();
    const chatLoader = async () =>{
        await waitConnection();
        callAPIReLogIn();
        callAPIGetUserList();
        client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            if (dataFromServer['event'] === 'RE_LOGIN') {
                const dataFromServer = JSON.parse(message.data);
                const dataReLogIn = JSON.parse(sessionStorage.getItem('dataReLogIn'));
                console.log(dataFromServer, "RELO");
                dataReLogIn.keyReLogIn = dataFromServer['data']?.['RE_LOGIN_CODE'];
                sessionStorage.setItem('dataReLogIn', JSON.stringify(dataReLogIn));
            }
            if(dataFromServer['event'] === 'GET_USER_LIST'){
                const responseListChat = dataFromServer['data'];
                console.log(dataFromServer, "CHAT");
                dispatch(saveListChat(responseListChat));
            }
        }
        return null;
    }
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
                    element: <ChatDetail/>,
                    // children: [
                    //     {
                    //         path: '/:chatId',
                    //         element: <WindowChat/>,
                    //     }
                    // ],
                },
                {
                    path: "setting",
                    element: <SettingFragment/>,
                },
            ],
        },
        ]
    );
    return (
        <RouterProvider router={router}/>
    );
}

export default App;
