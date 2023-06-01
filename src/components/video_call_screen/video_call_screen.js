import React, {useState} from "react";
import "./video_call_screen.scss";
import PhoneDisconnect from "../../Assets/Image/PhoneDisconnect.png"
import connecting1 from "../../Assets/Image/connecting.png";
import connecting2 from "../../Assets/Image/connecting2.png";
import connecting3 from "../../Assets/Image/connecting3.png";
function VideoCallScreen(props) {
    const [openMic, setOpenMic] = useState(true);
    const [openCamera, setOpenCamera] = useState(true);
    const toggleMic = () => {
        setOpenMic(!openMic);
    }
    const toggleCamera = () => {
        setOpenCamera(!openCamera);
    }
    return (
        <div className={'video_call_window'}>
            <div className="connecting-container">
                <div className="connecting-avatar-container">
                    <div className="avatar from">
                        <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200" alt=""/>
                        <p className={'name_call'}>Camel</p>
                    </div>
                    <div className="connecting">
                        <img src={connecting1} alt=""/>
                        <img src={connecting2} alt=""/>
                        <img src={connecting3} alt=""/>
                    </div>
                    <div className="avatar to">
                        <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200" alt=""/>
                        <p className={'name_call'}>Horse</p>
                    </div>
                </div>
                <p>Connecting...</p>
            </div>
            <div className="tool_bar">
                <div className={`tool_bar-item mic ${openMic ? '': 'bg_white'}`} onClick={toggleMic}>
                    {openMic ? <i className="bi bi-mic-fill" style={{color: "white"}}></i> : <i className="bi bi-mic-mute-fill"></i>}
                </div>
                <div className={`tool_bar-item camera ${openCamera ? '': 'bg_white'}`} onClick={toggleCamera}>
                    {openCamera ? <i className="bi bi-camera-video-fill" style={{color: "white"}}></i> : <i className="bi bi-camera-video-off-fill"></i>}
                </div>
                <div className="tool_bar-leave" onClick={props.handleLeaveVideoCall}>
                    <img src={PhoneDisconnect} alt=""/>
                </div>
            </div>
        </div>
    )

}

export default VideoCallScreen;