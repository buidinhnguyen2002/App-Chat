import React, {useEffect, useMemo, useRef, useState} from "react";
import "./video_call_screen.scss";
import PhoneDisconnect from "../../Assets/Image/PhoneDisconnect.png"
import connecting1 from "../../Assets/Image/connecting.png";
import connecting2 from "../../Assets/Image/connecting2.png";
import connecting3 from "../../Assets/Image/connecting3.png";
import {MeetingProvider, useMeeting, useParticipant} from "@videosdk.live/react-sdk";
import {useDispatch, useSelector} from "react-redux";
import {addParticipant, leaveMeetingRoom, rejectVideoCall} from "../../store/actions/meetingAction";
import {callAPISendChatRoom} from "../../service/loginService";
import {HEADER_JOIN_ROOM_MEETING, HEADER_REJECT_VIDEO_CALL, HEADER_VIDEO_CALL} from "../../util/constants";
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
    const {join, participants} = useMeeting({
        onMeetingJoined: () => {
            setJoined("JOINED");
            console.log('JOIN');
            // callAPISendChatRoom(meetingRoom.meetingName, HEADER_JOIN_ROOM_MEETING);
        },
        onMeetingLeft: () => {
            console.log('LEAVE');
        },
    });
    const joinMeeting = () => {
        setJoined("JOINING");
        join();
        callAPISendChatRoom(meetingRoom.meetingName,HEADER_VIDEO_CALL+ JSON.stringify(meetingRoom));
    };
    const handleLeaveVideoCall = () => {
        dispatch(leaveMeetingRoom());
    }
    const handleEndVideoCall = () => {
        if (meetingRoom.owner === myName) {
            dispatch(leaveMeetingRoom());
        }
    }
    const handelRejectVideoCall = () => {
        callAPISendChatRoom(meetingRoom.meetingName,HEADER_REJECT_VIDEO_CALL);
        dispatch(rejectVideoCall());
    }
    return (
        <div>
            {joined && joined == "JOINED" ? (
                <div className={'video_call_window'}>
                    <div className="grid_view-container">
                        {[...participants.keys()].map((participantId) => (
                            <ParticipantView
                                participantId={participantId}
                                key={participantId}
                            />
                        ))}
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
                            <div className={`receive_call_bar reject `} onClick={handelRejectVideoCall}>
                                {<i className="bi bi-x-lg" style={{color: "white"}}></i>}
                            </div>
                            <div className={`receive_call_bar phone `}>
                                {<i className="bi bi-telephone-inbound" style={{color: "white"}}></i>}
                            </div>
                        </div>}
                        {receiveCall != true && <div className="receive_call">
                            <div className={`receive_call_bar reject close-call`} onClick={handleLeaveVideoCall}>
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
                        <div className={`receive_call_bar phone `}>
                            {<i className="bi bi-telephone-inbound" style={{color: "white"}}></i>}
                        </div>
                    </div>}
                </div>
            </div>) : (
                <JoinRoomChatVideo joinMeeting={joinMeeting}/>
            )}
        </div>

        // <div className={'video_call_window'}>
        //     <div className="connecting-container">
        //         <div className="connecting-avatar-container">
        //             <div className="avatar from">
        //                 <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200" alt=""/>
        //                 <p className={'name_call'}>Camel</p>
        //             </div>
        //             <div className="connecting">
        //                 <img src={connecting1} alt=""/>
        //                 <img src={connecting2} alt=""/>
        //                 <img src={connecting3} alt=""/>
        //             </div>
        //             <div className="avatar to">
        //                 <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200" alt=""/>
        //                 <p className={'name_call'}>Horse</p>
        //             </div>
        //         </div>
        //         <p>Connecting...</p>
        //         {receiveCall && <div className="receive_call">
        //             <div className={`receive_call_bar reject `} onClick={props.handelRejectVideoCall}>
        //                 {<i className="bi bi-x-lg" style={{color: "white"}}></i>}
        //             </div>
        //             <div className={`receive_call_bar phone `} onClick={toggleMic}>
        //                 {<i className="bi bi-telephone-inbound" style={{color: "white"}}></i>}
        //             </div>
        //         </div>}
        //         {receiveCall == null && <div className="receive_call">
        //             <div className={`receive_call_bar reject close-call`} onClick={toggleCamera}>
        //                 <img src={PhoneDisconnect} alt=""/>
        //             </div>
        //         </div>}
        //     </div>
        //     {startVideoCall && <div className="tool_bar">
        //         <div className={`tool_bar-item mic ${openMic ? '': 'bg_white'}`} onClick={toggleMic}>
        //             {openMic ? <i className="bi bi-mic-fill" style={{color: "white"}}></i> : <i className="bi bi-mic-mute-fill"></i>}
        //         </div>
        //         <div className={`tool_bar-item camera ${openCamera ? '': 'bg_white'}`} onClick={toggleCamera}>
        //             {openCamera ? <i className="bi bi-camera-video-fill" style={{color: "white"}}></i> : <i className="bi bi-camera-video-off-fill"></i>}
        //         </div>
        //         <div className="tool_bar-leave" onClick={props.handleLeaveVideoCall}>
        //             <img src={PhoneDisconnect} alt=""/>
        //         </div>
        //     </div>}
        // </div>
    )

}

export default VideoCallScreen;