import React from "react";
import "./navigation_bar.scss";
import NavigationItem from "../navigation_item/navigation_item";
import ToggleItem from "../toggle_item/toggle_item";
import MyAvatar from "../../Assets/Image/my avatar.png";
import Budgie from "../../Assets/Image/Budgie.png";
import login from "../../page/login/login";
import {Link} from "react-router-dom";

class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            indexActive: 0,
        }
    }
    changeIndexNav = (index) => {
        this.setState(
            {
                indexActive: index,
            }
        )
    }
    render() {
        return (
            <div className={"navigation-bar"}>
                <div className="navigation-bar-top">
                    <div className="img-top">
                        <img src={Budgie} alt=""/>
                    </div>
                    <div className="navigation-bar-item" onClick={()=>this.changeIndexNav(0)}>
                        <Link to={"/chat"}><NavigationItem active={this.state.indexActive === 0} icon={'bi bi-chat-dots'}/></Link>
                    </div>
                    <div className="navigation-bar-item" onClick={()=>this.changeIndexNav(1)}>
                        <NavigationItem active={this.state.indexActive === 1} icon={'bi bi-people'}/>
                    </div>
                    <div className="navigation-bar-item navigation-bar-item-phone" onClick={()=>this.changeIndexNav(2)}>
                        <NavigationItem active={this.state.indexActive === 2} icon={'bi bi-telephone'}/>
                    </div>
                    <div className="navigation-bar-item navigation-bar-item-setting" onClick={()=>this.changeIndexNav(3)}>
                        <Link to={"/setting"}>
                            <NavigationItem active={this.state.indexActive === 3} icon={'bi bi-gear'}/>
                        </Link>
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