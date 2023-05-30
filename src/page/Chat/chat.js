import React, {useEffect} from "react";
import "./chat.scss";
import NavigationBar from "../../components/navigation_bar/navigation_bar";
import {listAll, ref, getDownloadURL} from "firebase/storage";
import {redirect, useNavigate, Outlet} from "react-router-dom";
import {
    callAPICheckUser,
    callAPICreateRoomChat, callAPIGetPeopleChatMes,
    callAPIGetRoomChatMes,
    callAPIGetUserList, callAPIJoinRoomChat,
    callAPIReLogIn, client,
    reConnectionServer, waitConnection
} from "../../service/loginService";
import {useDispatch, useSelector} from "react-redux";
import {
    loginSuccess,
    receiveChat, saveAllImage,
    saveListChat,
    saveToListChatsDetail,
    saveToListChatsPeople, updateChat
} from "../../store/actions/userAction";
import listChats from "../../components/list_chats/list-chats";
import {storage} from "../../firebase";

function ChatPage(props) {
    const currentAuth = useSelector(state => state.userReducer.username);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const isLogin = sessionStorage.getItem('isLogIn');
        if (!isLogin) {
            navigate('/');
            return;
        }
        async function f() {
            await waitConnection();
            callAPIReLogIn();
            callAPIGetUserList();
            let listChats = [];
            let chatsRoom = [];
            let chatPeople = [];
            let countChat = 0;
            await new Promise((resolve)=> {
                client.onmessage = (message) => {
                    const dataFromServer = JSON.parse(message.data);
                    if (dataFromServer['event'] === 'RE_LOGIN') {
                        const dataFromServer = JSON.parse(message.data);
                        const dataReLogIn = JSON.parse(sessionStorage.getItem('dataReLogIn'));
                        console.log(dataFromServer, "RELO");
                        dataReLogIn.keyReLogIn = dataFromServer['data']?.['RE_LOGIN_CODE'];
                        sessionStorage.setItem('dataReLogIn', JSON.stringify(dataReLogIn));
                        dispatch(loginSuccess(dataReLogIn.userName));
                        fetchAndSetMyImage(dataReLogIn.userName);
                    }
                    if(dataFromServer['event'] === 'GET_USER_LIST'){
                        const responseListChat = dataFromServer['data'];
                        dispatch(saveListChat(responseListChat));
                        listChats = responseListChat;
                        resolve();
                    }
                }
            })

            for (let i = 0; i < listChats.length; i++) {
                const name = listChats[i].name;
                const type = listChats[i].type;
                if (type === 1) {
                    callAPIGetRoomChatMes(name);
                }
                if (type === 0) {
                    callAPIGetPeopleChatMes(name);
                }
            }
            await new Promise((resolve) => {
                client.onmessage = (message) => {
                    const dataFromServer = JSON.parse(message.data);
                    if(dataFromServer['event'] === 'GET_PEOPLE_CHAT_MES' ){
                        let chatData = dataFromServer['data'];
                        if(chatData.length !== 0){
                            let chatObj = {
                                name: chatData[0].to,
                                type: chatData[0].type,
                                chatData: chatData,
                            };
                            chatPeople.push(chatObj);
                        }
                        countChat++;
                    }
                    if(dataFromServer['event'] === 'GET_ROOM_CHAT_MES'){
                        chatsRoom.push(dataFromServer['data']);
                        countChat++;
                    }
                    if (countChat === listChats.length) {
                        resolve();
                    }
                };
            });
            dispatch(saveToListChatsDetail(chatsRoom));
            dispatch(saveToListChatsPeople(chatPeople));
            callAPICheckUser();
            client.onmessage = (message) => {
                const dataFromServer = JSON.parse(message.data);
                console.log(dataFromServer, 'check user')
                const dataMessage = dataFromServer['data'];
                // const dataMessage = JSON.parse(dataFromServer['data']);
                const date = new Date();
                const newTime = date.getFullYear()+ '-'+ date.getMonth() + '-'+ date.getDay() + ' ' + date.getHours()
                    + ':' + date.getMinutes()+':' + date.getSeconds();
                dataMessage.createAt = newTime;
                console.log(dataMessage, 'DATA MESSGE');
                if(dataFromServer['event'] === 'SEND_CHAT'){
                    console.log('Vao duoc r');
                    dispatch(receiveChat(dataMessage));
                }
                if (dataFromServer['event'] === 'GET_ROOM_CHAT_MES') {
                    dispatch(updateChat(dataFromServer['data']));
                }
            }
        }
        f();
    }, []);
    const fetchAndSetMyImage = (myName) => {
        const imageListRef = ref(storage, `images/${myName}/`);
        listAll(imageListRef).then((response)=> {
            const urlImgs = [];
            response.items.forEach(item => {
                getDownloadURL(item).then(url => {
                    urlImgs.push(url);
                });
            })
            dispatch(saveAllImage(urlImgs));
        });
    }
    return (
        <div className={"page-chat"}>
            <NavigationBar/>
            <div className="detail">
                <Outlet/>
            </div>
        </div>
    )
}


export default ChatPage;