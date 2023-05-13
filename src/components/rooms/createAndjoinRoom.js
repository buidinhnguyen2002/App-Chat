import {useEffect, useState} from "react";
import "./rooms.scss";
import {
    callAPICreateRoomChat,
    callAPIJoinRoomChat,
    callAPIGetRoomChatMes,
    client,
    callAPIGetUserList
} from "../../service/loginService";
import {saveListChat, saveToListChatsDetail} from "../../store/actions/userAction";
import {useDispatch} from "react-redux";

function CreateAndJoinRoom(props) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const createRoom = () => {
        const roomName = document.getElementById('roomName').value;
        callAPICreateRoomChat(roomName);
        client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            if(dataFromServer['event'] === 'CREATE_ROOM'){
                const status = dataFromServer['status'];
                const msg = dataFromServer['mes'];
                console.log(status)
                if(status === 'error'){
                    setError(msg);
                    return;
                }
            }
            callAPIGetUserList();
            if (dataFromServer['event'] === 'GET_USER_LIST') {
                const responseListChat = dataFromServer['data'];
                console.log(responseListChat, "Test");
                dispatch(saveListChat(responseListChat));
            }
            setError('');
            document.getElementById('roomName').value = '';
            toggleDialog();
        }
    }


    const joinRoom = () => {
        const roomName = document.getElementById('roomName').value;
        callAPIJoinRoomChat(roomName);
        client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            if (dataFromServer['event'] === 'JOIN_ROOM') {
                const status = dataFromServer.status;
                const msg = dataFromServer['mes'];
                if (status === 'success') {
                    callAPIJoinRoomChat(roomName);
                    callAPIGetUserList();
                } else {
                    setError(msg);
                    return;
                }
            }
            if (dataFromServer['event'] === 'GET_USER_LIST') {
                const responseListChat = dataFromServer['data'];
                dispatch(saveListChat(responseListChat));
            }
            setError('');
            document.getElementById('roomName').value = '';
            toggleDialog();
        }
    }

    const toggleDialog = () => {
        setIsDialogOpen(!isDialogOpen);
    };
    return (
        <div>
            <p className="create-join" onClick={toggleDialog}>Create and Join room</p>
            <div className={"room_container"} style={{display: isDialogOpen ? "block" : "none"}}>
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
            </div>
        </div>
    );
}



export default CreateAndJoinRoom;