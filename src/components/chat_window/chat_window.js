import React from "react";
import "./chat_window.scss";
import ChatDetailHeader from "../chat_detail_header/chat_detail_header";
import InputMessage from "../message-page/input_message";

class WindowChat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: props.active,
        }
    }
    render() {
        return (
            <div className={"window-chat"}>
                <div className="window-chat-header">
                    <ChatDetailHeader/>
                </div>
                <div className="window-chat-body"></div>
                <InputMessage/>
            </div>
        )
    }
}


export default WindowChat;