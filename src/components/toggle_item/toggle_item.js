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
            <div className="container d-flex">
                <input type="checkbox" id="toggle" className="toggle-input" />
                <label htmlFor="toggle" className="toggle-label">
                    <div className="rectangle-6"></div>
                    <div className="ellipse-2"></div>
                </label>
            </div>
        )
    }
}


export default ToggleItem;