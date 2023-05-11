import React from "react";
import "./rooms.scss";
import {callAPICreateRoomChat, callAPIJoinRoomChat} from "../../service/loginService";
class createAndjoinRoom extends React.Component {
    constructor(props) {
        super(props);
        this.createRoom = this.createRoom.bind(this);
        this.joinRoom = this.joinRoom.bind(this);
    }

    createRoom() {
        const roomName = document.getElementById('roomName').value;
        console.log('roomName:', roomName);
        callAPICreateRoomChat(roomName);
    }
    joinRoom() {
        const roomName = document.getElementById('roomName').value;
        console.log('roomName:', roomName);
        callAPIJoinRoomChat(roomName);
    }

    render() {
        return (
            <div className="create-room">
                <input type="text" id="roomName" placeholder="Enter your chat room name" />
                <button className="create-room-btn" onClick={this.createRoom}>Create room</button>
                <button className="join-room-btn" onClick={this.joinRoom}>Join room</button>
            </div>
        );
    }
}

export default createAndjoinRoom;