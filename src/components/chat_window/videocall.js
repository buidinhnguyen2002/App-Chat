import React, {Component} from "react";

import "./video.scss";

class Video extends Component{

    constructor(props) {
        super(props);
        this.state = {
            active: props.active,
            icon: props.icon,
        }
    }
    render() {
        return (
            <div className={this.state.active==1 ? "Video_item Video_item-txtBlack ": ""}>
                <i className={this.state.icon}></i>
            </div>

        );
    }


}
export default Video;