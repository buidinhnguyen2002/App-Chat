import React from "react";
import "./navigation_item.scss";

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
            <div className={this.state.active==1 ? "navigation_item navigation_item-txtWhite navigation_item-bgBlue": "navigation_item navigation_item-txtBlack navigation_item-bgTrans"}>
                <i className={this.state.icon}></i>
            </div>
        )
    }

}

export default NavigationItem;