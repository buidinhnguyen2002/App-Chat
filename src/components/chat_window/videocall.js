import React, {Component} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faVideo} from "@fortawesome/free-solid-svg-icons";
import "./Chat_window.scss";

class Videocall extends Component{
    render() {
        return (

                <div className="board-video_icon">
                    <button className="board-video__icon-button" onClick={this.handleVideoCall}>
                        <FontAwesomeIcon icon={faVideo}/>
                    </button>
                </div>

        );
    }

}
export default Videocall;