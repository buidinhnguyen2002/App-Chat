import React from "react";
import "./toggle.scss";

class ToggleItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: props.active,
            icon: props.icon,
        }
    }

    render() {
        return (
            <div className="rectangle-1">
                <div className="rectangle-6"></div>
                <div className="ellipse-2"></div>
            </div>
        )
    }
}


export default ToggleItem;