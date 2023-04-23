import React from "react";
import moment from "moment";

const MessageReply =(props)=>{
    return(
        <li className="mb-3">
            <div className="board-chat__message d-flex flex-column">
                <div className="board-chat__message-header d-flex align-items-center">
                <div className="board-chat__message-sender font-weight-bold">
                    {props.sender}
                </div>
                <div className="board-chat__message-time ml-auto">
                    {moment(props.time).format("mm:ss")}
                </div>
            </div>
            <div className="board-chat__message-content">{props.content}</div>
            </div>
        </li>
    );
};
export default MessageReply;