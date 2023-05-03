import React from "react";
import "./message_item.scss";

class MessageItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myMessage: props.myMessage,
        }
    }

    render() {
        return (
            <div className={`message_item message_item-round ${this.state.myMessage ? "message_item-bgBlue": "message_item-bgWhite"}`}>
                <p className={`message ${this.state.myMessage ? "message-myMessage": "message-peopleMessage"}`}>Thnx!</p>
            </div>
        )
    }

}

export default MessageItem;