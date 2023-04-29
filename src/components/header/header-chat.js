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
            <div className="rectangle-2">
                <div className="chats">
                    <span>Chats</span>
                </div>
                <div className="circle-dashed">
                    <div className="vector1"></div>
                    <div className="vector2"></div>
                    <div className="vector3"></div>
                    <div className="vector4"></div>
                    <div className="vector5"></div>
                    <div className="vector6"></div>
                    <div className="vector7"></div>
                </div>
            </div>
        )
    }
}


export default HeaderChat;