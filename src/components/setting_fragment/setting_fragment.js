import ImageBackground from "../../Assets/Image/Call Service.png";
import "./setting_fragment.scss";
import {useNavigate} from "react-router-dom";
import {callAPILogout} from "../../service/loginService";


export default function SettingFragment(props) {
    const navigate = useNavigate();
    function logout() {
        callAPILogout();
        navigate("/");
    }
    return <div className={"chat_setting"}>
        <div className="list_setting">
            <h4 className={'title'}>Settings</h4>
            <div className="list_setting-container">
                <div className="list_setting-item" onClick={logout}>
                    <i className="bi bi-box-arrow-right"></i>
                    <span>Logout</span>
                </div>
            </div>
        </div>
        <div className="chat_setting-detail">
            <img src={ImageBackground} alt=""/>
        </div>
    </div>
}