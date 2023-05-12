import React from "react";
import "./rooms.scss";
import {callAPICreateRoomChat, callAPIJoinRoomChat, callAPIGetRoomChatMes} from "../../service/loginService";
import Modal from 'react-modal';

// Đặt phần tử gốc của ứng dụng là #root
Modal.setAppElement('#root');

class CreateAndJoinRoom extends React.Component {
    constructor(props) {
        super(props);
        this.createRoom = this.createRoom.bind(this);
        this.joinRoom = this.joinRoom.bind(this);
        this.state = {
            isDialogOpen: false,
            error: null
        };
    }

    createRoom() {
        const roomName = document.getElementById('roomName').value;
        console.log('roomName:', roomName);
        callAPICreateRoomChat(roomName);
    }

    async joinRoom() {
        const roomName = document.getElementById('roomName').value;
        console.log('roomName:', roomName);
        const roomList = await callAPIGetRoomChatMes(roomName);
        console.log('roomList:', roomList);

        if (roomList) {
            const roomExists = roomList.some(room => room.roomName === roomName);

            if (roomExists) {
                callAPIJoinRoomChat(roomName);
                this.setState({ isDialogOpen: false });
            } else {
                this.setState({ error: 'The chat room does not exist' });
            }
        } else {
            this.setState({ error: 'Error occurred while retrieving chat rooms' });
        }
    }

    toggleDialog = () => {
        this.setState(prevState => ({ isDialogOpen: !prevState.isDialogOpen }))
    };

    render() {
        const { isDialogOpen, error } = this.state;
        return (
            <>
                <a className="create-join" href="#" onClick={this.toggleDialog}>Create and Join room</a>
                <Modal
                    isOpen={isDialogOpen}
                    onRequestClose={this.toggleDialog}
                    className="create-join-room-dialog"
                    overlayClassName="create-join-room-dialog-overlay"
                >
                    <div className="create-join-room-dialog-content">
                        <h2 className="create-join-room-dialog-title">Create and Join Room</h2>
                        <button className="close-dialog-btn" onClick={this.toggleDialog}>X</button>
                        <div className="create-room">
                            <input type="text" id="roomName" placeholder="Enter your chat room name" />
                            <button className="create-room-btn" onClick={this.createRoom}>Create room</button>
                            <button className="join-room-btn" onClick={this.joinRoom}>Join room</button>
                            {error && (
                                <div className="error">{error}</div>
                            )}
                        </div>
                    </div>
                </Modal>
            </>
        );
    }
}

export default CreateAndJoinRoom;