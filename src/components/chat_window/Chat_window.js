import React, { Component } from "react";
import "./Chat_window.scss";


class ChatWindow extends Component {
    render() {
        return (
            <div className="board-item d-flex ">
                <div className="d-flex ">
                    <div className="board-item__avatar mr-3">
                        <img
                            src="https://via.placeholder.com/48x48"
                            alt="Avatar"
                            className="rounded-circle"
                        />
                        <div className="board-item__user-status">
                            <div className="board-item__user-status-dot"></div>
                        </div>
                    </div>
                        <div className="board-item__username ">
                            Pink pandaa
                        </div>
                        <div className="board-item__status">
                            Online
                        </div>

                </div>
            </div>

        );
    }
}
export default ChatWindow;
