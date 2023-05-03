import React, {Component} from "react";
import "./MessageReceive.scss";


class MessageReceive extends Component{

    constructor(props) {
        super(props);
        this.state = {
            isChoose: props.isChoose,
            icon: props.icon,
        }
    }

    render() {
        return (
            <div className={`message-receive_item message-receive_item-round d-flex ${this.state.isChoose ? '':'message-receive_item-bgWhite'}`} >
                <div className="message-receive-wrapper">
                    <div className="message-receive_content-wrapper">
                        <div className="message-receive-chat_message">
                            <h5 className={`${this.state.isChoose ? 'message-receive-chat_message-clWhite':'message-receive-chat_message-clGrey'}`}>Hi , how are yaa? </h5>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};
export default MessageReceive;