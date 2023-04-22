import React from "react";
import "./toggle.scss";

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
            <div>
                <input type="checkbox" id="switch" class="toggle"/><label htmlFor="switch">Toggle</label>
            </div>
        )
    }
}


export default NavigationItem;