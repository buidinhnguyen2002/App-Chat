import React, { useState } from "react";
import "./messages.scss";
import { callAPIGetRoomChatMes, callAPIGetUserList, callAPISendChatRoom, client } from "../../service/loginService";
import { useDispatch, useSelector } from "react-redux";
import { saveListChat, sendChat, updateChat } from "../../store/actions/userAction";
import { isAllOf } from "@reduxjs/toolkit";
import he from 'he';
import { Emoji, Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

function InputMessage(props) {
    const currentChats = useSelector(state => state.userReducer.currentChat);
    const [msg, setMsg] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const dispatch = useDispatch();

    const handleOnChangeInput = (event) => {
        const value = event.target.value;
        setMsg(value);
    };

    const toggleEmojiPicker = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };

    const handleAddEmoji = (emoji) => {
        const updatedMsg = msg + emoji.native;
        setMsg(updatedMsg);
    };

    const sendMsg = () => {
        const encodedMsg = convertEmojiToEntities(msg);
        callAPISendChatRoom(currentChats.name, encodedMsg);
        callAPIGetRoomChatMes(currentChats.name);
        client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            console.log("receive");
            console.log(dataFromServer);
            if (dataFromServer["event"] === "GET_ROOM_CHAT_MES") {
                dispatch(updateChat(dataFromServer["data"]));
            }
        };
        setMsg("");
    };

    const convertEmojiToEntities = (text) => {
        return he.encode(text, { decimal: true });
    };

    return (
        <div className="container-input">
            <div className="rectangle-16">
                <i className="fa-solid fa-link"></i>
                <div className="message">
                    <input type="text" placeholder="Write a message ..." onChange={handleOnChangeInput} value={msg} />
                </div>
                <i className="fa-regular fa-face-smile" onClick={toggleEmojiPicker}></i>
                {showEmojiPicker && (
                    <div className="emoji-picker-container">
                        <Picker set="facebook" exclude={['flags']} onSelect={handleAddEmoji} />
                    </div>
                )}
            </div>
            <button className="rectangle-17" onClick={sendMsg}>
                <i className="fa-regular fa-paper-plane"></i>
            </button>
        </div>
    );
}
export default InputMessage;
