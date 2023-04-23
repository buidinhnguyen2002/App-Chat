import React, { Component } from "react";
import "./Chat_window.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faVideo, faTimes, faPaperPlane, faPhone, faMagnifyingGlass,} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import MessageReply from "./MessageReply";


class ChatWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: true,
            chatTime: moment().format("YYYY-MM-DD HH:mm:ss"),//settime gửi
            messageInput:"",// state lưu trữ noi dung tin nhắn
            message:[] , //tạo mảng để hiển thị ra màn hình

        };

    }
    toggleActive = () => {
        this.setState((prevState) => ({
            active: !prevState.active,
        }));
    };
    handleVideoCall =()=>{
        console.log("Click on video call icon")
    }
    handleSubmit= (event)=>{
        event.preventDefault();
        const message = this.state.messageInput;
        console.log("New message:",message);
        // tạo 1 tin nhắn mới
        this.setState((prevState) =>  ({
            message:[...prevState.message,message],
            messageInput: "",
        }));
    }

    render() {
        return (
            <div className="board-chat d-flex flex-column h-100">
                <div className="board-chat__header d-flex justify-content-between align-items-center py-3 px-4 ">
                    <div className="d-flex align-items-center">
                        <div className="board-chat__avatar mr-3">
                            <img
                                src="https://via.placeholder.com/50x50"
                                alt="Avatar"
                                className="rounded-circle"
                            />
                            <div className="board-chat__user-status">
                                <div className="board-chat__user-status-dot"></div>
                            </div>
                        </div>

                        <div className="board-chat__title h5 text-white m-0">
                            <div className="board-chat__username font-weight-bold">
                                Pink pandaa
                            </div>
                            <div className="board-chat__status small text-white text-dark">
                                Online
                            </div>
                        </div>
                    </div>
                    <div className="board-chat__icon">
                        <button className="board-chat__icon" onClick={this.handleVideoCall}>
                            <FontAwesomeIcon icon={faVideo}/>
                            <FontAwesomeIcon icon={faPhone}/>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </div>
                <div className="board-chat__body flex-grow1 overflow-auto px-4">
                    <ul className="list-unstyled">
                        {this.state.message.map((message,index)=>(
                        <li className="mb-3">
                            <div className="board-chat__message d-flex flex-column">
                                <div className="board-chat__message-header d-flex align-items-center">
                                    <div className="board-chat__message-sender font-weight-bold">
                                        Pink pandaa
                                    </div>
                                    <div className="board-chat__message-time ml-auto">
                                        {moment(this.state.chatTime).format("mm:ss")}
                                    </div>
                                </div>
                                <div className="board-chat__message-content">{message}</div>
                            </div>
                        </li>
                            ))}
                        <MessageReply sender="Duong" time={this.state.chatTime} content ="heello!"/>
                    </ul>
                </div>
                <div className="board-chat__footer  px-4 py-3">
                    <form className="input-group d-flex align-items-center"onSubmit={this.handleSubmit}>
                        <div className="input-group">
                        <input
                            style={{backgroundColor: "#eaf2fe"}}
                            type="text"
                            placeholder="type a message "
                            className="form-control border-0 flex-grow-1 "
                            value={this.state.messageInput}
                            onChange={(event)=>
                            this.setState({messageInput:event.target.value})// gán giá trị của state và cập nhật giá trị state message khi người dùng nhập
                        }
                        />
                        <div className="input-group-append">
                            <button type="submit" className=" btn btn-primary btn-sm">
                                <FontAwesomeIcon icon={faPaperPlane} />
                            </button>
                        </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
export default ChatWindow;
