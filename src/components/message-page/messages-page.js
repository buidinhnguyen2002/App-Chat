import React from "react";
import "./messages.scss";

class NavigationItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: props.active,
            icon: props.icon,
        }
    }

    render() {
        return (
            <div className="msg-bottom">
                <div className="input-group">
                    <i className="fa-solid fa-link"></i>
                    <input type="text" className="form-control"  placeholder="        Write a message..."></input>
                    <i className="fa-regular fa-face-smile"></i>
                    <div className="input-group-append ">
                            <button className="fa-regular fa-paper-plane"><i className="bi bi-send "></i>
                            </button>
                    </div>
                </div>
            </div>
        )
    }
}


export default NavigationItem;