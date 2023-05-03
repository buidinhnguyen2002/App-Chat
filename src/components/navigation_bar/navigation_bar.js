import React from "react";
import "./navigation_bar.scss";
import NavigationItem from "../navigation_item/navigation_item";
import ToggleItem from "../toggle_item/toggle_item";
import MyAvatar from "../../Assets/Image/my avatar.png";
import Budgie from "../../Assets/Image/Budgie.png";

class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: props.active,
        }
    }
    render() {
        return (
            <div className={"navigation-bar"}>
                <div className="navigation-bar-top">
                    <div className="img-top">
                        <img src={Budgie} alt=""/>
                    </div>
                    <div className="navigation-bar-item">
                        <NavigationItem active={1} icon={'bi bi-chat-dots'}/>
                    </div>
                    <div className="navigation-bar-item">
                        <NavigationItem active={0} icon={'bi bi-people'}/>
                    </div>
                    <div className="navigation-bar-item navigation-bar-item-phone">
                        <NavigationItem active={0} icon={'bi bi-telephone'}/>
                    </div>
                    <div className="navigation-bar-item navigation-bar-item-setting">
                        <NavigationItem active={0} icon={'bi bi-gear'}/>
                        <div className="horizontal-line"></div>
                    </div>
                </div>
                <div className="navigation-bar-bottom">
                    <ToggleItem/>
                    <div className="avatar avatar-circle">
                        <img src={MyAvatar} alt=""/>
                    </div>
                </div>
            </div>
        )
    }
}
export default NavigationBar;