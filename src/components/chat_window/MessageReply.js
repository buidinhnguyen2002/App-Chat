import React, {Component} from "react";
import "./MessageReply.scss";


class MessageReply extends Component{

    constructor(props) {
        super(props);
        this.state = {
            isChoose: props.isChoose,
            icon: props.icon,
        }
    }

    render() {
        return (
            <div className={`message_item message_item-round d-flex ${this.state.isChoose ? 'message_item-bgBlue':''}`} >
                <div className="message-wrapper">
                    <div className="message_content-wrapper">
                        <div className="message-chat_message">
                            <h5 className={`${this.state.isChoose ? 'message-chat_message-clWhite':'chat_message-clGrey'}`}> thnx!</h5>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};
export default MessageReply;