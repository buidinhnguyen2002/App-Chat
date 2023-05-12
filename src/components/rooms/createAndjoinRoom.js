import React, {useState} from "react";
import "./rooms.scss";
import {
    callAPICreateRoomChat,
    callAPIJoinRoomChat,
    callAPIGetRoomChatMes,
    client,
    callAPIGetUserList
} from "../../service/loginService";
import Modal from 'react-modal';
import {saveListChat, saveToListChatsDetail} from "../../store/actions/userAction";
import {useDispatch} from "react-redux";

// Đặt phần tử gốc của ứng dụng là #root
Modal.setAppElement('#root');

function CreateAndJoinRoom(props) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [error, setError] = useState(false);
    const dispatch = useDispatch;
    const createRoom = () => {
        const roomName = document.getElementById('roomName').value;
        console.log('roomName:', roomName);
        callAPICreateRoomChat(roomName);
        client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);

            callAPIGetUserList();
            if (dataFromServer['event'] === 'GET_USER_LIST') {
                const responseListChat = dataFromServer['data'];
                console.log(responseListChat, "Test");

            }
        }
        dispatch(saveListChat(''));
    }


    const joinRoom = () => {
        const roomName = document.getElementById('roomName').value;
        console.log('roomName:', roomName);
        callAPIGetRoomChatMes(roomName);
        client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            console.log(dataFromServer, "Test");
            if (dataFromServer['event'] === 'GET_ROOM_CHAT_MES') {
                const status = dataFromServer.status;
                if (status === 'success') {
                    callAPIJoinRoomChat(roomName);
                    callAPIGetUserList();
                } else {
                    setError('Room not exist!');
                }
            }
            if (dataFromServer['event'] === 'GET_USER_LIST') {
                const responseListChat = dataFromServer['data'];
                console.log(dataFromServer, "CHAT");
                dispatch(saveListChat(responseListChat));
            }
        }
    }

    const toggleDialog = () => {
        setIsDialogOpen(!isDialogOpen);
    };
    return (
        <>
            <a className="create-join" href="#" onClick={toggleDialog}>Create and Join room</a>
            <Modal
                isOpen={isDialogOpen}
                onRequestClose={toggleDialog}
                className="create-join-room-dialog"
                overlayClassName="create-join-room-dialog-overlay"
            >
                <div className="create-join-room-dialog-content">
                    <h2 className="create-join-room-dialog-title">Create and Join Room</h2>
                    <button className="close-dialog-btn" onClick={toggleDialog}>X</button>
                    <div className="create-room">
                        <input type="text" id="roomName" placeholder="Enter your chat room name"/>
                        <button className="create-room-btn" onClick={createRoom}>Create room</button>
                        <button className="join-room-btn" onClick={joinRoom}>Join room</button>
                        {error && (
                            <div className="error">{error}</div>
                        )}
                    </div>
                </div>
            </Modal>
        </>
    );

}

export default CreateAndJoinRoom;