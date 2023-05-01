import React from "react";
import "./header.scss";

class HeaderChat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: props.active,
            icon: props.icon,
        }
    }

render() {
        return (
            <div className="container d-flex">
                <div className="chats">
                    <span>Chats</span>
                    <div className="outer-circle"></div>
                </div>
            </div>
        );
    }
}


export default HeaderChat;