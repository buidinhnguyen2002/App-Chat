import React, { useState } from "react";
import "./messages.scss";
import { callAPIGetRoomChatMes, callAPISendChatRoom, client } from "../../service/loginService";
import { useDispatch, useSelector } from "react-redux";
import { updateChat } from "../../store/actions/userAction";
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import EmojiConvertor from "emoji-js";

function InputMessage(props) {
    const currentChats = useSelector(state => state.userReducer.currentChat);
    const [msg, setMsg] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const dispatch = useDispatch();
    const emojiConvertor = new EmojiConvertor();
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
        const encodedMsg = convertEmojiToEntities(emojiConvertor.replace_colons(msg));
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

    // Hàm chuyển đổi các ký tự emoji thành mã HTML entities
    const convertEmojiToEntities = (text) => {
        const regex = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
        return text.replace(regex, (match) => {
            const charCode = match.codePointAt(0);
            return `&#${charCode};`;
        });
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
                        <Picker onSelect={handleAddEmoji} />
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