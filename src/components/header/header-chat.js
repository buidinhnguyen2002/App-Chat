import React from "react";
import "./header.scss";

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
            <div className="h-chats">
               <h2 class="header">Chats</h2>
                <div class="header" className="outer-circle">
                </div>
            </div>
        )
    }
}


export default NavigationItem;