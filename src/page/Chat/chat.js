import React, {useEffect, useState} from "react";
import "./chat.scss";
import NavigationBar from "../../components/navigation_bar/navigation_bar";
import {listAll, ref, getDownloadURL, getStorage, getMetadata} from "firebase/storage";
import {redirect, useNavigate, Outlet} from "react-router-dom";
import {
    callAPICheckUser,
    callAPICreateRoomChat, callAPIGetPeopleChatMes,
    callAPIGetRoomChatMes,
    callAPIGetUserList, callAPIJoinRoomChat,
    callAPIReLogIn, callAPISendChatPeople, callAPISendChatRoom, client,
    reConnectionServer, waitConnection
} from "../../service/loginService";
import {useDispatch, useSelector} from "react-redux";
import {
    addPeople, changeCurrentChat,
    loginSuccess,
    receiveChat, receiveChatPeople, saveAllImage, saveGroupAvatar,
    saveListChat, savePeopleAvatar,
    saveToListChatsDetail,
    saveToListChatsPeople, setInitChat, updateChat, updateChatPeople
} from "../../store/actions/userAction";
import listChats from "../../components/list_chats/list-chats";
import {storage} from "../../firebase";
import VideoCallScreen from "../../components/video_call_screen/video_call_screen";
import {
    decryptData, encryptData, getAuthName, getMeetingIdFromRequestAudioCall, getMeetingIdFromRequestCall,
    getMeetingRoom,
    getNameParticipant, isAcceptCall, isAudioCall, isAudioCallFailed, isJoinRoomMeeting, isJoinRoomMeetingAudio,
    isLeaveRoomMeeting, isLeaveRoomMeetingAudio, isMeetingEnd, isRejectCallPeople,
    isRejectVideoCall, isRequestAudioCall, isRequestCall,
    isVideoCall, isVideoCallFailed
} from "../../util/function";
import {
    HEADER_ACCEPT_VIDEO_CALL,
    HEADER_AUDIO_CALL,
    HEADER_REJECT_VIDEO_CALL,
    HEADER_VIDEO_CALL
} from "../../util/constants";
import ChatDetailHeader from "../../components/chat_detail_header/chat_detail_header";
import {MeetingProvider} from "@videosdk.live/react-sdk";
import {authToken} from "../../service/VideoCallService";
import {
    addParticipant, rejectVideoCall,
    removeParticipant, setAcceptCall,
    setAudioCall,
    setCalling,
    setMeetingRoom
} from "../../store/actions/meetingAction";
import CryptoJS from "crypto-js";
import store from "../../store/store";
import {setError, setUserExist} from "../../store/actions/apiAction";

function ChatPage(props) {
    const currentAuth = useSelector(state => state.userReducer.username);
    const currentChat = useSelector(state => state.userReducer.currentChat);
    const audioCall = useSelector(state => state.meetingReducer.isAudioCall);
    const userCheck = useSelector(state => state.apiReducer.userCheck);
    const meetingRoomData = useSelector(state => state.meetingReducer.meetingRoom);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [videoCall, setVideoCall] = useState(false);

    const handleLeaveVideoCall = () => {
        setVideoCall(false);
    }
    const handelAcceptVideoCall = () => {
        callAPISendChatRoom(currentChat.name,HEADER_ACCEPT_VIDEO_CALL);
    }
    const [meetingId, setMeetingId] = useState(null);
    useEffect(() => {
        const storedData = sessionStorage.getItem('dataReLogIn');
        if(storedData == null){
            navigate('/');
            return;
        }
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
            let listPeople = [];
            let listRoom = [];
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
                        const responseListChat = dataFromServer['data'].filter(chat => chat.name !== getAuthName());
                        dispatch(saveListChat(responseListChat));
                        listChats = responseListChat;
                        resolve();
                    }
                }
            })
            // await getGroupAvatar(listChats);
            for (let i = 0; i < listChats.length; i++) {
                const name = listChats[i].name;
                const type = listChats[i].type;
                if (type === 1) {
                    if(!listRoom.includes(name)) listRoom.push(name);
                    callAPIGetRoomChatMes(name);
                }
                if (type === 0) {
                    if(!listPeople.includes(name)) listPeople.push(name);
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
                                name: chatData[0].to === getAuthName() ? chatData[0].name : chatData[0].to,
                                type: chatData[0].type,
                                chatData: chatData,
                            };
                            console.log(chatObj);
                            chatPeople.push(chatObj);
                        }
                        countChat++;
                    }
                    if(dataFromServer['event'] === 'GET_ROOM_CHAT_MES'){
                        let owner = {};
                        owner.name = dataFromServer['data'].own;
                        const userList = [...dataFromServer['data'].userList, owner];
                        userList.forEach(user=> {
                           if(!listPeople.includes(user.name)) listPeople.push(user.name);
                        });
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
            await fetchAndSetAvatar(listRoom, "group_avatar/", true);
            await fetchAndSetAvatar(listPeople, "people_avatar/", false);
            dispatch(setInitChat());
            client.onmessage = (message) => {
                const dataFromServer = JSON.parse(message.data);
                console.log(dataFromServer, 'check user')
                const dataMessage = dataFromServer['data'];
                if(dataFromServer['event'] === 'SEND_CHAT'){
                    console.log(dataMessage);
                    const date = new Date();
                    const newTime = date.getFullYear()+ '-'+ date.getMonth() + '-'+ date.getDay() + ' ' + date.getHours()
                        + ':' + date.getMinutes()+':' + date.getSeconds();
                    dataMessage.createAt = newTime;
                    console.log(isRequestCall(dataMessage.mes))
                    if(isRequestCall(dataMessage.mes)){
                        const roomRequest = {
                            meetId : getMeetingIdFromRequestCall(dataMessage.mes),
                            meetingName: dataMessage.to,
                            owner: dataMessage.name,
                        }
                        dispatch(setMeetingRoom(roomRequest));
                        dispatch(setCalling(true));
                    }
                    if(isRequestAudioCall(dataMessage.mes)){
                        const roomRequest = {
                            meetId : getMeetingIdFromRequestAudioCall(dataMessage.mes),
                            meetingName: dataMessage.to,
                            owner: dataMessage.name,
                        }
                        dispatch(setAudioCall(true));
                        dispatch(setMeetingRoom(roomRequest));
                        dispatch(setCalling(true));
                    }
                    if(isMeetingEnd(dataMessage.mes) || isAudioCallFailed(dataMessage.mes) || isVideoCallFailed(dataMessage.mes)){
                        dispatch(rejectVideoCall());
                    }
                    if(isAcceptCall(dataMessage.mes)){
                        dispatch(setAcceptCall(true));
                    }
                    if(isRejectCallPeople(dataMessage.mes)){
                        dispatch(setAcceptCall(false));
                    }
                    if(isVideoCall(dataMessage.mes)){
                        const meetingRoom = getMeetingRoom(dataMessage.mes);
                        dispatch(setMeetingRoom(meetingRoom));
                        dispatch(setCalling(true));
                        dispatch(addParticipant(dataMessage.name));
                    }
                    if(isAudioCall(dataMessage.mes)){
                        const meetingRoom = getMeetingRoom(dataMessage.mes);
                        dispatch(setMeetingRoom(meetingRoom));
                        dispatch(setCalling(true));
                        dispatch(setAudioCall(true));
                        dispatch(addParticipant(dataMessage.name));
                    }
                    if(isJoinRoomMeeting(dataMessage.mes) || isJoinRoomMeetingAudio(dataMessage.mes)){
                        const participant = dataMessage.name;
                        dispatch(addParticipant(participant));
                    }
                    if(isLeaveRoomMeeting(dataMessage.mes) || isLeaveRoomMeetingAudio(dataMessage.mes)){
                        const getParticipant = getNameParticipant(dataMessage.mes);
                        dispatch(removeParticipant(getParticipant));
                    }
                    if(dataMessage.type === 0){
                        dispatch(receiveChatPeople(dataMessage));
                    }else {
                        dispatch(receiveChat(dataMessage));
                    }
                }
                if (dataFromServer['event'] === 'GET_ROOM_CHAT_MES') {
                    dispatch(updateChat(dataFromServer['data']));
                }
                if (dataFromServer['event'] === 'GET_PEOPLE_CHAT_MES') {
                    dispatch(updateChatPeople(dataFromServer['data']));
                }
                if (dataFromServer['event'] === 'CHECK_USER') {
                    const data = dataFromServer['data'];
                    console.log(dataFromServer);
                    const namePeople = document.getElementById('roomName').value;
                    dispatch(addPeople(namePeople));
                    dispatch(changeCurrentChat(namePeople, 0));
                    // if(data.status === true){
                    //     dispatch(addPeople(userCheck));
                    // }
                    // dispatch(setError('User not exist.'));
                }
                if (dataFromServer['event'] === 'GET_USER_LIST') {
                    const responseListChat = dataFromServer['data'].filter(chat => chat.name !== getAuthName());
                    dispatch(saveListChat(responseListChat));
                }
                if(dataFromServer['event'] === 'CREATE_ROOM'){
                    const status = dataFromServer['status'];
                    const msg = dataFromServer['mes'];
                    if(status === 'error'){
                        dispatch(setError(msg));
                        return;
                    }
                    const roomName = document.getElementById('roomName').value;
                    callAPIGetUserList();
                    callAPIGetRoomChatMes(roomName);
                    dispatch(changeCurrentChat(roomName, 1));
                    dispatch(setError(null));
                }
                if (dataFromServer['event'] === 'JOIN_ROOM') {
                    const status = dataFromServer.status;
                    const msg = dataFromServer['mes'];
                    console.log(dataFromServer)
                    if (status === 'success') {
                        const roomName = document.getElementById('roomName').value;
                        callAPIGetUserList();
                        callAPIGetRoomChatMes(roomName);
                        dispatch(setError(null));
                    } else {
                        dispatch(setError(msg));
                        return;
                    }
                }
            }
        }
        f();
    }, []);
    const callPeople = () => {
        if(currentAuth === meetingRoomData.owner) {
            const headerMeeting = audioCall ? HEADER_AUDIO_CALL : HEADER_VIDEO_CALL;
            callAPISendChatPeople(meetingRoomData.meetingName,headerMeeting+ JSON.stringify(meetingRoomData));
            callAPIGetPeopleChatMes(meetingRoomData.meetingName);
        }
    }
    const fetchAndSetAvatar = async (list, folderPath, isGroup) => {
        const storage = getStorage();
        const folderRef = ref(storage, folderPath);
        const holderAvatar = isGroup ? 'https://png.pngtree.com/element_our/png_detail/20181021/group-avatar-icon-design-vector-png_141882.jpg': 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwsKDQgJDwoQCAgICA0ICAgIDg8IDQgNFREWFhQRExMYHiggGBolGxMTITEhJSkrOi46Fx8zODMtNygtLisBCgoKDQ0NDg0NESsZHxkrKysrKystKy0rKysrKysrKysrKystKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAN4A4wMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAQQFAgMG/8QANRABAAECAgcHAgUEAwAAAAAAAAECEQMhBAUSFDFSkRMiQVFhYqEVMjNCcYHhI0Ny8WOCsf/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABYRAQEBAAAAAAAAAAAAAAAAAAARAf/aAAwDAQACEQMRAD8A+8AaQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQLGi6HiY03+2jzlBXLtzB1ZhU8b1z6rEaNhx/bjoUfNj6SdFwp/twrYuq8Or7f6clGIl7aRoleDOcXjnh4KJAAAAAAAAAAAAAAAAAAAAAjOYjxmbQCzq/RJxqrz+HTx9W9TTFMRERaIytDx0PB7Oimm2cxer9VhlQAAAHniYcVxNMxeJ+GDpujTg1TH5Z+2X0SprDA7TDqi3ejOJUYIj/AElUAAAAAAAAAAAAAAAAAAHtoWHt4uHHlN5eK3qiP6s/45IN4BFAAAAETGUx6JAfM6RTs14lPhFWThZ1lERjV+uasqACgAAAAAAAAAAAAAAAAuap/F/6qb10PE2MSieGdpRX0giJSgAAAAAiqqIiZ8Ii4MDWU3xq/TJWd41W3XXV4TVeP0cKgAoAAAAAAAAAAAAAAAAI/wDb3SA3tXY/aYcZ96nKVt85oePODXt/lnKql9BhYtOJEVRN4n4ZV2FwAC4ChrTH2KJpie9XPwtaRj04cTVM29PGXz+lY1WLVNU/tAPLNINIAAAAAAAAAAAAAAAAAAAgEvXRtJrwZ7s3pnjTLxulBt6NrHCxOM7FXlPBcpxKZ4VRP7vl9lOfnMfpkRX004tMcaoj91PH1nh0ZU9+fTNi5+fXNGyQemkY9eNMzVOXhHk4QlcQEXSAAAAAAAAAAAAAAAAAi6YiZmIiLzPCIaOh6sv3q5ynPYhBQw8OqubU0zV6xwW8LVeJVxmKY6tjDwqaIiKaYpj0dzHoisyNTx44nw6+kUc9TSAZv0ijnqPpFHPU0gGb9Io56j6RRz1NIBm/SKOeXE6n/wCRqgMLF1Zi05x349FWuiqjjTNP6vprOMXBpxItVTFQPmUr+matmi9VEXjxpUPiyoAKAAAAAAAAAABEXmI8Zm0IaeqdGvfFqi+fdiQWNX6DGHEVznXVnn+VesmC7KgXLgBcAC4ABcAC4AXLgi38s3WGgxVE4lMWq4zEeLTui38wD5bzjhMcYSv610bYntYjKrjDPuqJAUAAAAAAAAdYNG3VTRx2pfRYdEUU00RFopizI1Ph3xKquWGzKKm5dzcug6uXc3Lg6uXc3Lg6uXc3Lg6uXc3Lg6uXc3Lg6uXc3Lg6uXc3Lg50jDjEpqptxibPnK6dmaqeWbPpbsPWVGzi1e7NcRWAUAAAAAAAAaWp4yxJ85s0Zln6o+3E/wAl+QTcu5BXQi5cRIi5cE3LuQV0XRdAOrl3IDq5dyA6uXcgOrszW8Z4dXnDRZ+t5/C/cRnAAAAAADw7f2/J2/t+Qe48O39vybx7fkGzqie7iR47V19gaBpuxXPdymOES1N+p5J6oLYqb9TyT1N+p5J6gtipv1PJPU36nknqC2Km/U8k9TfqeSeoLYqb9TyT1N+p5J6gtipv1PJPU36nknqC2Km/U8k9TfqeSeoLYqb9TyT1N+p5J6gtipv1PJPU36nknqC2zdbTnhR4xd779TyT1ZGmaZ2lczs/blGYJHhvHt+Tt/b8qPceHb+35O39vyD3Hh2/t+UA/9k=';
        try {
            const result = await listAll(folderRef);
            let avatars = [];
            for (const folder of result.prefixes) {
                for (let i = 0; i < list.length; i++) {
                    const keyName = list[i];
                    const stor = getStorage();
                    if (folder.name === keyName) {
                        const path = folder.fullPath + '/avatar';
                        const imageRef = ref(stor, path);
                        try {
                            const downloadURL = await getDownloadURL(imageRef);
                            const avatar = {
                                name: keyName,
                                urlAvatar: downloadURL,
                            }
                            avatars.push(avatar);
                        } catch (error) {
                            console.log(error);
                        }
                    } else {
                        const avatar = {
                            name: keyName,
                            urlAvatar: holderAvatar,
                        }
                        avatars.push(avatar);
                    }
                }
            }
            if(isGroup){
                dispatch(saveGroupAvatar(avatars));
            }else{
                dispatch(savePeopleAvatar(avatars));
            }
        } catch (error) {
            console.error("Error listing folders:", error);
        }
    }
    const getPeopleAvatar = async (listPeople) => {
        const storage = getStorage();
        const folderRef = ref(storage, "people_avatar/");
        try {
            const result = await listAll(folderRef);
            let avatarPeoples = [];
            for (const folder of result.prefixes) {
                for (let i = 0; i < listPeople.length; i++) {
                    const people = listPeople[i];
                    const stor = getStorage();
                    if (folder.name === people) {
                        const path = folder.fullPath + '/avatar';
                        const imageRef = ref(stor, path);
                        try {
                            const downloadURL = await getDownloadURL(imageRef);
                            const avatar = {
                                name: people,
                                urlAvatar: downloadURL,
                            }
                            avatarPeoples.push(avatar);
                        } catch (error) {
                            console.log(error);
                        }
                    } else {
                        const avatar = {
                            name: people,
                            urlAvatar: 'data:image/jpeg;base64,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',
                        }
                        avatarPeoples.push(avatar);
                    }
                }
            }
            dispatch(savePeopleAvatar(avatarPeoples));
        } catch (error) {
            console.error("Error listing folders:", error);
        }
    }
    const getGroupAvatar = async (list) => {
        const storage = getStorage();
        const folderRef = ref(storage, "group_avatar/");
        try {
            const result = await listAll(folderRef);
            for (const folder of result.prefixes) {
                for (let i = 0; i < list.length; i++) {
                    const chat = list[i];
                    if (chat.type === 0) continue;
                    const chatName = chat.name;
                    const stor = getStorage();
                    if (folder.name === chatName) {
                        const path = folder.fullPath + '/avatar';
                        const imageRef = ref(stor, path);
                        try {
                            const downloadURL = await getDownloadURL(imageRef);
                            chat.urlAvatar = downloadURL;
                        } catch (error) {
                            chat.urlAvatar = "https://png.pngtree.com/element_our/png_detail/20181021/group-avatar-icon-design-vector-png_141882.jpg";
                        }
                    } else {
                        chat.urlAvatar = "https://png.pngtree.com/element_our/png_detail/20181021/group-avatar-icon-design-vector-png_141882.jpg";
                    }
                }
            }
            dispatch(saveListChat(list));
        } catch (error) {
            console.error("Error listing folders:", error);
        }
    };
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
            {(meetingRoomData != null) && <MeetingProvider
                config={{
                    meetingId: meetingRoomData.meetId,
                    micEnabled: true,
                    webcamEnabled: audioCall == true ? false : true,
                    name: currentAuth,
                }}
                token={authToken}
            >
                 <VideoCallScreen meetId={meetingRoomData.meetId}/>
                </MeetingProvider>}
        </div>
    )
}


export default ChatPage;