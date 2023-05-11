import React from "react";
import "./header.scss";

class HeaderChat extends React.Component {
    constructor(props) {
        super(props);
    }

render() {
        return (
                <div className="chat_header">
                    <span className="chat">Chats</span>
                    <div className="outer-circle"></div>
                </div>
        );
    }
}


export default HeaderChat;