import React, {useEffect, useState} from "react";
import "./chat.scss";
import NavigationBar from "../../components/navigation_bar/navigation_bar";
import {listAll, ref, getDownloadURL} from "firebase/storage";
import {redirect, useNavigate, Outlet} from "react-router-dom";
import {
    callAPICheckUser,
    callAPICreateRoomChat, callAPIGetPeopleChatMes,
    callAPIGetRoomChatMes,
    callAPIGetUserList, callAPIJoinRoomChat,
    callAPIReLogIn, callAPISendChatRoom, client,
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
import VideoCallScreen from "../../components/video_call_screen/video_call_screen";
import {
    decryptData, encryptData,
    getMeetingRoom,
    getNameParticipant,
    isLeaveRoomMeeting,
    isRejectVideoCall,
    isVideoCall
} from "../../util/function";
import {HEADER_ACCEPT_VIDEO_CALL, HEADER_REJECT_VIDEO_CALL, HEADER_VIDEO_CALL} from "../../util/constants";
import ChatDetailHeader from "../../components/chat_detail_header/chat_detail_header";
import {MeetingProvider} from "@videosdk.live/react-sdk";
import {authToken} from "../../service/VideoCallService";
import {removeParticipant, setCalling, setMeetingRoom} from "../../store/actions/meetingAction";
import CryptoJS from "crypto-js";
import store from "../../store/store";

function ChatPage(props) {
    const currentAuth = useSelector(state => state.userReducer.username);
    const currentChat = useSelector(state => state.userReducer.currentChat);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [videoCall, setVideoCall] = useState(false);
    const meetingRoom = useSelector(state => state.meetingReducer.meetingRoom);
    const handleLeaveVideoCall = () => {
        setVideoCall(false);
    }
    const handelAcceptVideoCall = () => {
        callAPISendChatRoom(currentChat.name,HEADER_ACCEPT_VIDEO_CALL);
    }
    const [meetingId, setMeetingId] = useState(null);
    useEffect(() => {
        const storedData = sessionStorage.getItem('dataReLogIn');
        const dataReLogIn = decryptData(storedData);
        if(!dataReLogIn.isLogin){
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
                        const storedData = sessionStorage.getItem('dataReLogIn');
                        const dataReLogIn = decryptData(storedData);
                        console.log(dataFromServer, "RELO");
                        dataReLogIn.keyReLogIn = dataFromServer['data']?.['RE_LOGIN_CODE'];
                        const encryptedData = encryptData(dataReLogIn);
                        sessionStorage.setItem('dataReLogIn', encryptedData);
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
            // callAPICheckUser();
            client.onmessage = (message) => {
                const dataFromServer = JSON.parse(message.data);
                console.log(dataFromServer, 'check user')
                const dataMessage = dataFromServer['data'];
                const date = new Date();
                const newTime = date.getFullYear()+ '-'+ date.getMonth() + '-'+ date.getDay() + ' ' + date.getHours()
                    + ':' + date.getMinutes()+':' + date.getSeconds();
                dataMessage.createAt = newTime;
                // console.log(dataMessage, 'DATA MESSGE');
                if(dataFromServer['event'] === 'SEND_CHAT'){
                    if(isVideoCall(dataMessage.mes)){
                        const meetingRoom = getMeetingRoom(dataMessage.mes);
                        dispatch(setMeetingRoom(meetingRoom));
                        dispatch(setCalling(true));
                        return;
                    }
                    if(isLeaveRoomMeeting(dataMessage.mes)){
                        const getParticipant = getNameParticipant(dataMessage.mes);
                        dispatch(removeParticipant(getParticipant));
                        return;
                    }
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
            {(meetingRoom != null) && <MeetingProvider
                config={{
                    meetingId: meetingRoom.meetId,
                    micEnabled: true,
                    webcamEnabled: true,
                    name: currentAuth,
                }}
                token={authToken}
            ><VideoCallScreen /></MeetingProvider>}
        </div>
    )
}


export default ChatPage;