import React from "react";
import "./message_item.scss";
import {useSelector} from "react-redux";

function MessageItem(props) {
    const dataReLogIn = JSON.parse(sessionStorage.getItem('dataReLogIn'));
    const myName = dataReLogIn.userName;
    return (
        <div ref={props.scrollTargetRef} className={`message_container ${props.name === myName ? 'message_container-flexRight':'message_container-flexleft'}`}>
            <div
                className={`message_item message_item-round ${props.name === myName ? "message_item-bgBlue" : "message_item-bgWhite"}`}>
                <span className={`msg ${props.name === myName ? "message-myMessage" : "message-peopleMessage"}`}>{props.mes}</span>
            </div>
        </div>
    )

}

export default MessageItem;