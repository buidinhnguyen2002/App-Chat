import React, {useState} from "react";
import "./messages.scss";
import {
    callAPIGetPeopleChatMes,
    callAPIGetRoomChatMes,
    callAPIGetUserList,
    callAPISendChatPeople,
    callAPISendChatRoom,
    client
} from "../../service/loginService";
import {useDispatch, useSelector} from "react-redux";
import {changeCurrentChat, saveListChat, sendChat, updateChat} from "../../store/actions/userAction";
import {isAllOf} from "@reduxjs/toolkit";

function InputMessage(props) {
    const currentChats = useSelector(state => state.userReducer.currentChat);
    const [msg, setMsg] = useState('');
    const dispatch = useDispatch();
    const handleOnchangeInput = (event) => {
        const  value = event.target.value;
        setMsg(value);
    }
    const sendMsg=()=>{
        console.log(currentChats);
        if(currentChats?.type === 0){
            callAPISendChatPeople(currentChats.name,msg)
            callAPIGetPeopleChatMes(currentChats.name, msg);
        }
        else{
            callAPISendChatRoom(currentChats.name, msg);
            callAPIGetRoomChatMes(currentChats.name);
        }

        client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            console.log('recieve');
            console.log(dataFromServer,currentChats);
            if(dataFromServer['event'] === 'GET_ROOM_CHAT_MES'){
                dispatch(updateChat(dataFromServer['data']));
            }
            else if(dataFromServer['event'] === 'GET_PEOPLE_CHAT_MES'){
                dispatch(changeCurrentChat({
                    chatsPeople:dataFromServer['data'],
                    type:0,
                    nameChat:currentChats.name
                }));
            }
            setMsg('')
        }
    }
    return (
        <div className="container-input">
            <div className="rectangle-16">
                <i className="fa-solid fa-link"></i>
                <div className="message">
                    <input type="text" placeholder="Write a message ..." onChange={handleOnchangeInput} value={msg}/>
                </div>
                <i className="fa-regular fa-face-smile"></i>
            </div>
            <button className="rectangle-17" onClick={sendMsg}>
                <i className="fa-regular fa-paper-plane"></i>
            </button>
        </div>
    );
}


export default InputMessage;