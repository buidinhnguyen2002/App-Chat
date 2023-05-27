import React, {useEffect, useState} from "react";
import "./messages.scss";
import {callAPIGetRoomChatMes, callAPIGetUserList, callAPISendChatRoom, client} from "../../service/loginService";
import {useDispatch, useSelector} from "react-redux";
import {saveListChat, sendChat, updateChat} from "../../store/actions/userAction";
import {isAllOf} from "@reduxjs/toolkit";
import {storage} from "../../firebase";
import {ref, uploadBytes, getDownloadURL, uploadBytesResumable} from "firebase/storage";
import {v4} from "uuid";

function InputMessage(props) {
    const currentAuth = useSelector(state => state.userReducer.username);
    const currentChats = useSelector(state => state.userReducer.currentChat);
    const [msg, setMsg] = useState({'text': '', 'imgs': []});
    const dispatch = useDispatch();
    const [msgImgs, setMsgImgs] = useState([]);
    const [msgFileImgs, setMsgFileImgs] = useState([]);

    const handleOnchangeInput = (event) => {
        const value = event.target.value;
        const currentMsg = {...msg};
        currentMsg.text = value;
        setMsg(currentMsg);
    }
    const sendMsg = async () => {
        await handleUploadToFirebase();
    }
    const handleUploadToFirebase = async () => {
        const newMsg = {
            ...msg,
            imgs: [],
        };
        const uploadTasks = msgFileImgs.map((image) => {
            if (image == null) return null;
            const imageRef = ref(storage, `images/${currentAuth}/${image.name + v4()}`);
            const uploadTask = uploadBytesResumable(imageRef, image);
            return new Promise((resolve, reject) => {
                uploadTask.on(
                    "state_changed",
                    null,
                    null,
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref)
                            .then((downloadURL) => {
                                const newImgs = [...newMsg.imgs, downloadURL];
                                newMsg.imgs = newImgs;
                                resolve();
                            })
                            .catch((error) => {
                                console.error("Lỗi khi lấy URL tải xuống:", error);
                                reject(error);
                            });
                    }
                );
            });
        });
        Promise.all(uploadTasks)
            .then(() => {
                callAPISendChatRoom(currentChats.name, JSON.stringify(newMsg));
                callAPIGetRoomChatMes(currentChats.name);
                client.onmessage = (message) => {
                    const dataFromServer = JSON.parse(message.data);
                    console.log('recieve');
                    console.log(dataFromServer);
                    if (dataFromServer['event'] === 'GET_ROOM_CHAT_MES') {
                        dispatch(updateChat(dataFromServer['data']));
                    }
                }
                setMsg({'text': '', 'imgs': []});
                setMsgImgs([]);
                setMsgFileImgs([]);
            })
            .catch((error) => {
                console.error("Lỗi khi tải lên hình ảnh:", error);
            });
    };
    const uploadImg = (e) => {
        const files = e.target.files;
        const newBuffersImg = [];
        const newFileImgs = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            newFileImgs.push(file);
            const fileReader = new FileReader();
            fileReader.onload = function () {
                newBuffersImg.push(fileReader.result);
                if (newBuffersImg.length === files.length) {
                    setMsgImgs(newBuffersImg);
                    setMsgFileImgs(newFileImgs);
                }
            }
            fileReader.readAsDataURL(file);
        }
    }

    return (
        <div className="container-input">
            <div className="rectangle-16">
                <div className="container-input-file">
                    <input type="file" className={"input_file"} onChange={uploadImg} multiple/>
                    <i className="fa-solid fa-link"></i>
                </div>
                <div className="message">
                    <div className="message_img">
                        {msgImgs.map((file, index) => (<div className="message_img-item d-flex">
                            <div className="message_img-item-close">
                                <i className="bi bi-x"></i>
                            </div>
                            <img src={file} alt="" className={"imgLoad"}/>
                        </div>))}

                    </div>
                    <input type="text" placeholder="Write a message ..." onChange={handleOnchangeInput}
                           value={msg.text}/>
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