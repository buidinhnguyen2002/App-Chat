import React from "react";
import "./toggle.scss";

class ToggleItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: props.active,
        }
    }
    handleToggle = () => {
        this.setState(
            {
                active: !this.state.active,
            }
        );
    }
    render() {
        return (
            <div className={`toggle ${this.state.active ? "toggle-bgBlue":"toggle-bgWhite"}`}onClick={this.handleToggle}>
                <button className={`btn-toggle ${this.state.active ? "btn-toggle-active":""}`} ></button>
            </div>
        )
    }
}


export default ToggleItem;