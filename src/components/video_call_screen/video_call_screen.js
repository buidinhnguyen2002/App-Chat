import React, {useEffect, useMemo, useRef, useState} from "react";
import "./video_call_screen.scss";
import PhoneDisconnect from "../../Assets/Image/PhoneDisconnect.png"
import connecting1 from "../../Assets/Image/connecting.png";
import connecting2 from "../../Assets/Image/connecting2.png";
import connecting3 from "../../Assets/Image/connecting3.png";
import {MeetingProvider, useMeeting, useParticipant} from "@videosdk.live/react-sdk";
import {useDispatch, useSelector} from "react-redux";
import {addParticipant, leaveMeetingRoom, rejectVideoCall} from "../../store/actions/meetingAction";
import {callAPIGetRoomChatMes, callAPISendChatRoom} from "../../service/loginService";
import {
    HEADER_JOIN_ROOM_MEETING,
    HEADER_LEAVE_VIDEO_CALL, HEADER_MEETING_END,
    HEADER_REJECT_VIDEO_CALL,
    HEADER_VIDEO_CALL, HEADER_VIDEO_CHAT_END
} from "../../util/constants";
import ParticipantView from "../participant_view/participant_view";
import JoinRoomChatVideo from "../join_room_chat_video/join_room_chat_video";

function VideoCallScreen(props) {
    const currentChat = useSelector(state => state.userReducer.currentChat);
    const meetingRoom = useSelector(state => state.meetingReducer.meetingRoom);
    const participant = useSelector(state => state.meetingReducer.meetingRoom.participants);
    const myName = useSelector(state => state.userReducer.username);
    const dispatch = useDispatch();
    const receiveCall = useSelector(state => state.meetingReducer.isCalling);
    const meetingId = props.meetingId;
    const [joined, setJoined] = useState(null);
    const [rendered, setRendered] = useState(false);
    const [myParticipantId, setMyParticipantId] = useState(null);
    const { leave, toggleMic, toggleWebcam } = useMeeting();
    const [openMic, setOpenMic] = useState(true);
    const [openCamera, setOpenCamera] = useState(true);
    const [isFullScreen, setIsFullScreen] = useState(true);
    const {join, participants} = useMeeting({
        onMeetingJoined: () => {
            setJoined("JOINED");
            callAPISendChatRoom(meetingRoom.meetingName, HEADER_JOIN_ROOM_MEETING);
            callAPIGetRoomChatMes(meetingRoom.meetingName);
        },
        onMeetingLeft: () => {
            console.log('LEAVE');
        },
    });
    const joinMeeting = () => {
        setJoined("JOINING");
        join();
        const participants = [...meetingRoom.participants];
        if(!participants.includes(myName)) {
            participants.push(myName);
            dispatch(addParticipant(myName));
        }
        meetingRoom.participants = participants;
        if(myName === meetingRoom.owner) callAPISendChatRoom(meetingRoom.meetingName,HEADER_VIDEO_CALL+ JSON.stringify(meetingRoom));
        callAPIGetRoomChatMes(meetingRoom.meetingName);
    };
    const handelRejectVideoCall = (isLeave) => {
        if(meetingRoom.participants.length === 1){
            callAPISendChatRoom(meetingRoom.meetingName,HEADER_MEETING_END);
        }else if(isLeave == true){
            callAPISendChatRoom(meetingRoom.meetingName,HEADER_LEAVE_VIDEO_CALL+myName);
        }else{
            callAPISendChatRoom(meetingRoom.meetingName,HEADER_REJECT_VIDEO_CALL);
        }
        callAPIGetRoomChatMes(meetingRoom.meetingName);
        leave();
        dispatch(rejectVideoCall());
    }
    const toggleChangeMic = () => {
        setOpenMic(!openMic);
        toggleMic();
    }
    const toggleCamera = () => {
        setOpenCamera(!openCamera);
        toggleWebcam();
    }
    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen);
    }
    const closeJoinVideoCall = () => {
        dispatch(rejectVideoCall());
    }
    const getWidthParticipantView = (num) => {
        switch (num) {
        case 1:
            return '100%';
            break;
        case 2:
                return '49%';
            case 3:
                return '49%';
        }

    }
    return (
        <div>
            {joined && joined == "JOINED" ? (
                <div className={` video_call_window ${isFullScreen == false ? "window-scale" : ""}`}  >
                    <div className="grid_view-container">
                        <div className="ic-scale-window" onClick={toggleFullScreen}>
                            {isFullScreen ? <i className="bi bi-box-arrow-down-left"></i> :
                                <i className="bi bi-box-arrow-in-up-right"></i>}
                        </div>
                        {[...participants.keys()].map((participantId) => (
                            <ParticipantView
                                width={getWidthParticipantView([...participants].length)}
                                handleRejectVideoCall={handelRejectVideoCall}
                                participantId={participantId}
                                key={participantId}
                            />
                        ))}
                    </div>
                    <div className="tool_bar">
                        <div className={`tool_bar-item mic ${openMic ? '': 'bg_white'}`} onClick={toggleChangeMic}>
                            {openMic ? <i className="bi bi-mic-fill" style={{color: "white"}}></i> : <i className="bi bi-mic-mute-fill"></i>}
                        </div>
                        <div className={`tool_bar-item camera ${openCamera ? '': 'bg_white'}`} onClick={toggleCamera}>
                            {openCamera ? <i className="bi bi-camera-video-fill" style={{color: "white"}}></i> : <i className="bi bi-camera-video-off-fill"></i>}
                        </div>
                        <div className="tool_bar-leave" onClick={()=> handelRejectVideoCall(true)}>
                            <img src={PhoneDisconnect} alt=""/>
                        </div>
                    </div>
                </div>
            ) : (joined && joined == "JOINING") ? (
                <div className={'video_call_window'}>
                    <div className="connecting-container">
                        <div className="connecting-avatar-container">
                            <div className="avatar from">
                                <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                                     alt=""/>
                                <p className={'name_call'}>Camel</p>
                            </div>
                            <div className="connecting">
                                <img src={connecting1} alt=""/>
                                <img src={connecting2} alt=""/>
                                <img src={connecting3} alt=""/>
                            </div>
                            <div className="avatar to">
                                <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                                     alt=""/>
                                <p className={'name_call'}>Horse</p>
                            </div>
                        </div>
                        <p>Connecting...</p>
                        {receiveCall == true && <div className="receive_call">
                            <div className={`receive_call_bar reject `} onClick={()=> handelRejectVideoCall}>
                                {<i className="bi bi-x-lg" style={{color: "white"}}></i>}
                            </div>
                            <div className={`receive_call_bar phone `}>
                                {<i className="bi bi-telephone-inbound" style={{color: "white"}}></i>}
                            </div>
                        </div>}
                        {receiveCall != true && <div className="receive_call">
                            <div className={`receive_call_bar reject close-call`} onClick={handelRejectVideoCall}>
                                <img src={PhoneDisconnect} alt=""/>
                            </div>
                        </div>}
                    </div>
                </div>
            ) : receiveCall == true ? (<div className={'video_call_window'}>
                <div className="connecting-container">
                    <div className="connecting-avatar-container">
                        <div className="avatar from">
                            <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                                 alt=""/>
                            <p className={'name_call'}>Camel</p>
                        </div>
                        <div className="connecting">
                            <img src={connecting1} alt=""/>
                            <img src={connecting2} alt=""/>
                            <img src={connecting3} alt=""/>
                        </div>
                        <div className="avatar to">
                            <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                                 alt=""/>
                            <p className={'name_call'}>Horse</p>
                        </div>
                    </div>
                    <p>Connecting...</p>
                    {receiveCall == true && <div className="receive_call">
                        <div className={`receive_call_bar reject `} onClick={handelRejectVideoCall}>
                            {<i className="bi bi-x-lg" style={{color: "white"}}></i>}
                        </div>
                        <div className={`receive_call_bar phone `} onClick={joinMeeting}>
                            {<i className="bi bi-telephone-inbound" style={{color: "white"}}></i>}
                        </div>
                    </div>}
                </div>
            </div>) : (
                <JoinRoomChatVideo joinMeeting={joinMeeting} closeJoinVideoCall={closeJoinVideoCall}/>
            )}
        </div>
    )

}

export default VideoCallScreen;