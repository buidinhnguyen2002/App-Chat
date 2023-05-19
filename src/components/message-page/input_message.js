import React, {useState} from "react";
import "./messages.scss";
import {callAPIGetUserList, callAPISendChatRoom, client} from "../../service/loginService";
import {useSelector} from "react-redux";
import {saveListChat} from "../../store/actions/userAction";
import {isAllOf} from "@reduxjs/toolkit";

function InputMessage(props) {
    const currentChats = useSelector(state => state.userReducer.currentChat);
    const [msg, setMsg] = useState('');
    const handleOnchangeInput = (event) => {
        const  value = event.target.value;
        setMsg(value);
    }
    const sendMsg=()=>{
        callAPISendChatRoom(currentChats.name, msg);

        client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            console.log('send')
            console.log(dataFromServer);
        }
        setMsg('');
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