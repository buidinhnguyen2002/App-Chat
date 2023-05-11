import React from "react";
import "./messages.scss";

class InputMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: props.active,
            icon: props.icon,
        }
    }
    render() {
        return (
            <div className="container-input">
                <div className="rectangle-16">
                    <i className="fa-solid fa-link"></i>
                    <div className="message">
                        <input type="text" placeholder="Write a message ..." />
                    </div>
                    <i className="fa-regular fa-face-smile"></i>
                </div>
                <div className="rectangle-17">
                    <div className="input-group-append">
                        <button className="fa-regular fa-paper-plane">
                            <i className="bi bi-send"></i>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}


export default InputMessage;