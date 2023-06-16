import {useEffect, useState} from "react";
import "./rooms.scss";
import {
    callAPICreateRoomChat,
    callAPIJoinRoomChat,
    callAPIGetRoomChatMes,
    client,
    callAPIGetUserList, callAPICheckUser
} from "../../service/loginService";
import {saveListChat, saveToListChatsDetail} from "../../store/actions/userAction";
import {useDispatch, useSelector} from "react-redux";
import {setError, setUserCheck} from "../../store/actions/apiAction";

function CreateAndJoinRoom(props) {
    const isUserExist = useSelector(state => state.apiReducer.isUserExist);
    const errorMsg = useSelector(state => state.apiReducer.error);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    // const [error, setError] = useState(false);
    const dispatch = useDispatch();
    // const getError = () => {
    //     if(error != null) return error;
    //     if(isUserExist === false) return 'Người dùng không tồn tại.';
    //     return null;
    // }
    const createRoom = () => {
        const roomName = document.getElementById('roomName').value;
        callAPICreateRoomChat(roomName);
    }
    const createChatPeople = () => {
        const peopleName = document.getElementById('roomName').value;
        dispatch(setUserCheck(peopleName));
        callAPICheckUser(peopleName);
    }

    const joinRoom = () => {
        const roomName = document.getElementById('roomName').value;
        callAPIJoinRoomChat(roomName);
    }

    const toggleDialog = () => {
        dispatch(setError(null));
        document.getElementById('roomName').value = '';
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
                        <div className="btn_container">
                            <button className="create-room-btn" onClick={createRoom}>Create room</button>
                            <button className="join-room-btn" onClick={joinRoom}>Join room</button>
                            <button className="join-room-btn" onClick={createChatPeople}>Chat people</button>
                        </div>
                        {/*{error && (*/}
                        {/*    <div className="error">{error}</div>*/}
                        {/*)}*/}
                        {errorMsg && <div className="error">{errorMsg}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}



export default CreateAndJoinRoom;