import React, {useEffect, useMemo, useRef, useState} from "react";
import {useMeeting, useParticipant} from "@videosdk.live/react-sdk";
import ReactPlayer from "react-player";
import {useDispatch, useSelector} from "react-redux";
import "./participant_view.scss"
import PhoneDisconnect from "../../Assets/Image/PhoneDisconnect.png";
import {leaveMeetingRoom} from "../../store/actions/meetingAction";

function ParticipantView(props) {
    const myName = useSelector(state => state.userReducer.username);
    const micRef = useRef(null);
    const [openMic, setOpenMic] = useState(true);
    const [openCamera, setOpenCamera] = useState(true);
    const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
        useParticipant(props.participantId);
    const { leave, toggleMic, toggleWebcam } = useMeeting();
    const dispatch = useDispatch();
    const videoStream = useMemo(() => {
        if (webcamOn && webcamStream) {
            const mediaStream = new MediaStream();
            mediaStream.addTrack(webcamStream.track);
            return mediaStream;
        }
    }, [webcamStream, webcamOn]);

    useEffect(() => {
        if (micRef.current) {
            if (micOn && micStream) {
                const mediaStream = new MediaStream();
                mediaStream.addTrack(micStream.track);

                micRef.current.srcObject = mediaStream;
                micRef.current
                    .play()
                    .catch((error) =>
                        console.error("videoElem.current.play() failed", error)
                    );
            } else {
                micRef.current.srcObject = null;
            }
        }
    }, [micStream, micOn]);
    const toggleChangeMic = () => {
        setOpenMic(!openMic);
        toggleMic();
    }
    const toggleCamera = () => {
        setOpenCamera(!openCamera);
        toggleWebcam();
    }

    return (
            <div className={` participant_view `}>
                <audio ref={micRef} autoPlay playsInline muted={isLocal} />
                {webcamOn && (
                    <ReactPlayer
                        playsinline
                        pip={false}
                        light={false}
                        controls={false}
                        muted={true}
                        playing={true}
                        url={videoStream}
                        width="100%"
                        height="auto"
                        onError={(err) => {
                            console.log(err, "participant video error");
                        }}
                    />
                )}
                {/*<div className="tool_bar">*/}
                {/*    <div className={`tool_bar-item mic ${openMic ? '': 'bg_white'}`} onClick={toggleChangeMic}>*/}
                {/*        {openMic ? <i className="bi bi-mic-fill" style={{color: "white"}}></i> : <i className="bi bi-mic-mute-fill"></i>}*/}
                {/*    </div>*/}
                {/*    <div className={`tool_bar-item camera ${openCamera ? '': 'bg_white'}`} onClick={toggleCamera}>*/}
                {/*        {openCamera ? <i className="bi bi-camera-video-fill" style={{color: "white"}}></i> : <i className="bi bi-camera-video-off-fill"></i>}*/}
                {/*    </div>*/}
                {/*    <div className="tool_bar-leave" onClick={props.handleRejectVideoCall}>*/}
                {/*        <img src={PhoneDisconnect} alt=""/>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
    );
}
export default ParticipantView;