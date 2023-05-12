import React from "react";
import "./rooms.scss";
import {callAPICreateRoomChat, callAPIJoinRoomChat} from "../../service/loginService";
class CreateAndJoinRoom extends React.Component {
    constructor(props) {
        super(props);
        this.createRoom = this.createRoom.bind(this);
        this.joinRoom = this.joinRoom.bind(this);
        this.state = {
            showCreateRoom: false
        }
    }

    createRoom() {
        const roomName = document.getElementById('roomName').value;
        console.log('roomName:', roomName);
        callAPICreateRoomChat(roomName);
    }

    joinRoom() {
        if (document.getElementById('roomName')) {
            const roomName = document.getElementById('roomName').value;
            console.log('roomName:', roomName);
            callAPIJoinRoomChat(roomName);
        }
    }


    toggleCreateRoom = () => {
        this.setState(prevState => ({ showCreateRoom: !prevState.showCreateRoom }))
    }

    render() {
        const { showCreateRoom } = this.state;
        return (
            <>
                <a className="create-join" href="#" onClick={this.toggleCreateRoom}>Create and Join room</a>
                {showCreateRoom && (
                    <div className="create-room">
                        <input type="text" id="roomName" placeholder="Enter your chat room name" />
                        <button className="create-room-btn" onClick={this.createRoom}>Create room</button>
                        <button className="join-room-btn" onClick={this.joinRoom}>Join room</button>
                    </div>
                )}
            </>
        );
    }
}
export default CreateAndJoinRoom;