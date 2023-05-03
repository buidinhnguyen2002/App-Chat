import React, {Component} from "react";
import "./Chat_window.scss";


class MessageReply extends Component{
    render() {
        return (
            <div className="board-message d-flex sent">
                <div className="board-message__message-content">
                           <h6>hi,how are ya</h6>
                </div>
            </div>
        );
    }
};
export default MessageReply;