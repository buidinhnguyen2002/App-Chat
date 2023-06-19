import React, {useEffect, useMemo, useRef, useState} from "react";
import "./video_call_screen.scss";
import PhoneDisconnect from "../../Assets/Image/PhoneDisconnect.png"
import connecting1 from "../../Assets/Image/connecting.png";
import connecting2 from "../../Assets/Image/connecting2.png";
import connecting3 from "../../Assets/Image/connecting3.png";
import {MeetingProvider, useMeeting, useParticipant} from "@videosdk.live/react-sdk";
import {useDispatch, useSelector} from "react-redux";
import {addParticipant, leaveMeetingRoom, rejectVideoCall, setCalling} from "../../store/actions/meetingAction";
import {
    callAPIGetPeopleChatMes,
    callAPIGetRoomChatMes,
    callAPISendChatPeople,
    callAPISendChatRoom
} from "../../service/loginService";
import screenCastActive from "../../Assets/Image/Screencast-active.png";
import screenCastNoneActive from "../../Assets/Image/Screencast-none-active.png";
import {
    GROUP_AVATAR_HOLDER,
    HEADER_ACCEPT_VIDEO_CALL,
    HEADER_AUDIO_CALL,
    HEADER_JOIN_ROOM_MEETING, HEADER_JOIN_ROOM_MEETING_AUDIO, HEADER_LEAVE_AUDIO_CALL,
    HEADER_LEAVE_VIDEO_CALL, HEADER_MEETING_END, HEADER_REJECT_AUDIO_CALL, HEADER_REJECT_CALL_PEOPLE,
    HEADER_REJECT_VIDEO_CALL, HEADER_REQUEST_AUDIO_CALL, HEADER_REQUEST_CALL,
    HEADER_VIDEO_CALL, HEADER_VIDEO_CHAT_END, USER_AVATAR_HOLDER
} from "../../util/constants";
import ParticipantView from "../participant_view/participant_view";
import JoinRoomChatVideo from "../join_room_chat_video/join_room_chat_video";
import PresenterView from "../participant_view/PresenterView";
import {deactivateRoom} from "../../service/VideoCallService";
import {getNameChat} from "../../util/function";

function VideoCallScreen(props) {
    const currentChat = useSelector(state => state.userReducer.currentChat);
    const meetingRoom = useSelector(state => state.meetingReducer.meetingRoom);
    const myName = useSelector(state => state.userReducer.username);
    const isAudioCall = useSelector(state => state.meetingReducer.isAudioCall);
    const peopleAvarars = useSelector(state => state.userReducer.avatarPeople);
    const groupAvatars =  useSelector(state => state.userReducer.avatarGroups);
    const groupNickName = useSelector(state => state.userReducer.nickNameGroups);
    const peopleNickName = useSelector(state => state.userReducer.nickNamePeople);
    const dispatch = useDispatch();
    const receiveCall = useSelector(state => state.meetingReducer.isCalling);
    const meetingId = props.meetingId;
    const [joined, setJoined] = useState(null);
    const [rendered, setRendered] = useState(false);
    const [myParticipantId, setMyParticipantId] = useState(null);
    const { leave, toggleMic, toggleWebcam } = useMeeting();
    const [openMic, setOpenMic] = useState(true);
    const [openCamera, setOpenCamera] = useState( isAudioCall ? false: true);
    const [isFullScreen, setIsFullScreen] = useState(true);
    const [screenCast, setScreenCast] = useState(false);
    const {end,join, participants, enableScreenShare, disableScreenShare, toggleScreenShare, presenterId, disableWebcam} = useMeeting({
        onMeetingJoined: () => {
            setJoined("JOINED");
            const headerMeeting = isAudioCall ? HEADER_JOIN_ROOM_MEETING_AUDIO : HEADER_JOIN_ROOM_MEETING;
            if (currentChat.type !== 0){
                callAPISendChatRoom(meetingRoom.meetingName,headerMeeting);
                callAPIGetRoomChatMes(meetingRoom.meetingName);
            }
            dispatch(setCalling(false));
        },
        onMeetingLeft: () => {
            console.log('LEAVE');
        },
    });
    const getAvatarCall = (name, type) => {
        if(type === 1){
            const group = groupAvatars.find(group => group.name === name);
            if(group) {
                return group.urlAvatar;
            }else{
                return GROUP_AVATAR_HOLDER;
            }
        }else{
            const people = peopleAvarars.find(people => people.name === name);
            if(people) {
                return people.urlAvatar;
            }else{
                return USER_AVATAR_HOLDER;
            }
        }
    }
    useEffect(()=> {
        if(meetingRoom && meetingRoom.accept === true && props.meetId && props.meetId != '') {
            join();
        }
    },[meetingRoom]);
    const joinMeeting = () => {
        setJoined("JOINING");
        join();
        const participants = [...meetingRoom.participants];
        if(!participants.includes(myName)) {
            participants.push(myName);
            dispatch(addParticipant(myName));
        }
        meetingRoom.participants = participants;
        if(myName === meetingRoom.owner) {
            const headerMeeting = isAudioCall ? HEADER_AUDIO_CALL : HEADER_VIDEO_CALL;
            if (currentChat.type === 0){
                callAPISendChatPeople(meetingRoom.meetingName,headerMeeting+ JSON.stringify(meetingRoom));
                callAPIGetPeopleChatMes(meetingRoom.meetingName);
            }else{
                callAPISendChatRoom(meetingRoom.meetingName,headerMeeting+ JSON.stringify(meetingRoom));
                callAPIGetRoomChatMes(meetingRoom.meetingName);
            }
        }
    };
    const sendRequestCall = () => {
        setJoined("JOINING");
        const headerMeeting = isAudioCall ? HEADER_REQUEST_AUDIO_CALL : HEADER_REQUEST_CALL;
        callAPISendChatPeople(meetingRoom.meetingName,headerMeeting + meetingRoom.meetId);
        callAPIGetPeopleChatMes(meetingRoom.meetingName);
    }
    const acceptCall = () => {
        setJoined("JOINING");
        callAPISendChatPeople(meetingRoom.owner,HEADER_ACCEPT_VIDEO_CALL);
        callAPIGetPeopleChatMes(meetingRoom.owner);
    }
    const handelRejectCall = (isReject) => {
        end();
        deactivateRoom(meetingRoom.meetId);
        const to = meetingRoom.meetingName === myName ? meetingRoom.owner : meetingRoom.meetingName;
        if(isReject == true) {
            console.log(to)
            callAPISendChatPeople(to,HEADER_REJECT_CALL_PEOPLE);
        }else{
            callAPISendChatPeople(to,HEADER_MEETING_END);
        }
        callAPIGetPeopleChatMes(to);
    }
    const handelRejectVideoCall = (isLeave) => {
        let message = '';
        if(meetingRoom.participants.length === 1 && receiveCall != true && meetingRoom.join != true){
            message = HEADER_MEETING_END;
            deactivateRoom(meetingRoom.meetId);
        }else if(isLeave == true){
            const header = isAudioCall ? HEADER_LEAVE_AUDIO_CALL : HEADER_LEAVE_VIDEO_CALL;
            message = header + myName;
        }else{
            const header = isAudioCall ? HEADER_REJECT_AUDIO_CALL : HEADER_REJECT_AUDIO_CALL;
            message = header;
        }
        if(currentChat.type === 0){
            const to = meetingRoom.meetingName === myName ? meetingRoom.owner : meetingRoom.meetingName;
            callAPISendChatPeople(to,message);
            callAPIGetPeopleChatMes(to);
        }else{
            callAPISendChatRoom(meetingRoom.meetingName,message);
            callAPIGetRoomChatMes(meetingRoom.meetingName);
        }
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
    const getHeightParticipantView = (num) => {
        switch (num) {
            case 1:
                return '100%';
                break;
            case 2:
                return '50%';
            case 3:
                return '49%';
            default:
                return '50%';
        }
    }

    const handleEnableScreenShare = () => {
        // enableScreenShare();
        setScreenCast(!screenCast);
    };
    const handleDisableScreenShare = () => {
        disableScreenShare();
    };

    const handleToggleScreenShare = () => {
        setScreenCast(!screenCast);
        toggleScreenShare();
    };
    return (
        <div>
            {joined && joined == "JOINED" ? (
                <div className={` video_call_window ${isFullScreen == false ? "window-scale" : "window-full-screen"}`}  >
                    {presenterId != null && <PresenterView key={presenterId} presenterId={presenterId}/>}
                    {meetingRoom.type === 1 && <div className={`grid_view-container ${presenterId != null ? 'sidebar_container': ''}`} >
                        <div className="ic-scale-window" onClick={toggleFullScreen}>
                            {isFullScreen ? <i className="bi bi-box-arrow-down-left"></i> :
                                <i className="bi bi-box-arrow-in-up-right"></i>}
                        </div>
                        {[...participants.keys()].map((participantId, index) => (
                            presenterId === participantId ? <></> :
                            <ParticipantView
                                key={index}
                                width={presenterId == null ? getWidthParticipantView([...participants].length) : '100%'}
                                height={presenterId == null ? getHeightParticipantView([...participants].length) : 'auto'}
                                isJoin={meetingRoom.join == true ? true: false}
                                handleRejectVideoCall={handelRejectVideoCall}
                                isItemSideBar={presenterId == null ? false: true}
                                participantId={participantId}
                                type={1}
                                key={participantId}
                            />
                        ))}
                    </div>}
                    {meetingRoom.type ===0 && <div className={`grid_view-container ${presenterId != null ? 'sidebar_container': ''}`} >
                        <div className="ic-scale-window" onClick={toggleFullScreen}>
                            {isFullScreen ? <i className="bi bi-box-arrow-down-left"></i> :
                                <i className="bi bi-box-arrow-in-up-right"></i>}
                        </div>
                        {[...participants.keys()].map((participantId, index) => (
                            presenterId === participantId ? <></> :
                                <ParticipantView
                                    key={index}
                                    width={presenterId == null ? getWidthParticipantView([...participants].length) : '100%'}
                                    height={presenterId == null ? getHeightParticipantView([...participants].length) : 'auto'}
                                    isJoin={meetingRoom.join == true ? true: false}
                                    handleRejectVideoCall={handelRejectVideoCall}
                                    isItemSideBar={presenterId == null ? false: true}
                                    participantId={participantId}
                                    type={0}
                                    key={participantId}
                                />
                        ))}
                    </div>}
                    <div className="tool_bar">
                        <div className={`tool_bar-item screen_cast ${screenCast ? '': 'bg_white'}`} onClick={handleToggleScreenShare}>
                            {screenCast ?  <img src={screenCastActive} alt=""/> : <img src={screenCastNoneActive} alt=""/>}
                        </div>
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
                    {isFullScreen == false && <div className="ic_full-screen" onClick={toggleFullScreen}><i className="bi bi-arrows-fullscreen"></i></div>}
                </div>
            ) : (joined && joined == "JOINING") ? (
                <div className={'video_call_window'}>
                    <div className="connecting-container">
                        <div className="connecting-avatar-container">
                            <div className="avatar from">
                                {/*<img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"*/}
                                {/*     alt=""/>*/}
                                <img src={getAvatarCall(meetingRoom.owner,0)}
                                     alt=""/>
                                 {/*<p className={'name_call'}>{meetingRoom.owner}</p>*/}
                                <p className={'name_call'}>{getNameChat( 0 , peopleNickName, groupNickName, meetingRoom.owner)}</p>
                            </div>
                            <div className="connecting">
                                <img src={connecting1} alt=""/>
                                <img src={connecting2} alt=""/>
                                <img src={connecting3} alt=""/>
                            </div>
                            <div className="avatar to">
                                {/*<img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"*/}
                                {/*     alt=""/>*/}
                                <img src={getAvatarCall(meetingRoom.meetingName, meetingRoom.type) }
                                     alt=""/>
                                {/*<p className={'name_call'}>{meetingRoom.meetingName}</p>*/}
                                <p className={'name_call'}>{getNameChat( meetingRoom.type , peopleNickName, groupNickName, meetingRoom.meetingName)}</p>
                            </div>
                        </div>
                        <p>Connecting...</p>
                        {/*{receiveCall == true && <div className="receive_call">*/}
                        {/*    <div className={`receive_call_bar reject `} onClick={()=> handelRejectVideoCall}>*/}
                        {/*        {<i className="bi bi-x-lg" style={{color: "white"}}></i>}*/}
                        {/*    </div>*/}
                        {/*    <div className={`receive_call_bar phone `}>*/}
                        {/*        {<i className="bi bi-telephone-inbound" style={{color: "white"}}></i>}*/}
                        {/*    </div>*/}
                        {/*</div>}*/}
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
                            <img src={getAvatarCall(meetingRoom.owner,0)}
                                 alt=""/>
                            {/*<p className={'name_call'}>{meetingRoom.owner}</p>*/}
                            <p className={'name_call'}>{getNameChat( 0 , peopleNickName, groupNickName, meetingRoom.owner)}</p>
                        </div>
                        <div className="connecting">
                            <img src={connecting1} alt=""/>
                            <img src={connecting2} alt=""/>
                            <img src={connecting3} alt=""/>
                        </div>
                        <div className="avatar to">
                            <img src={getAvatarCall(meetingRoom.meetingName, meetingRoom.type) }
                                 alt=""/>
                            {/*<p className={'name_call'}>{meetingRoom.meetingName}</p>*/}
                            <p className={'name_call'}>{getNameChat( meetingRoom.type , peopleNickName, groupNickName, meetingRoom.meetingName)}</p>
                        </div>
                    </div>
                    <p>Connecting...</p>
                    {receiveCall == true && <div className="receive_call">
                        <div className={`receive_call_bar reject `} onClick={ ()=> meetingRoom.type === 1 ? handelRejectVideoCall : handelRejectCall(true)}>
                            {<i className="bi bi-x-lg" style={{color: "white"}}></i>}
                        </div>
                        <div className={`receive_call_bar phone `} onClick={meetingRoom.type === 1 ? joinMeeting : acceptCall }>
                            {<i className="bi bi-telephone-inbound" style={{color: "white"}}></i>}
                        </div>
                    </div>}
                </div>
            </div>) : (
                <JoinRoomChatVideo meetingRoom={meetingRoom} joinMeeting={meetingRoom.type === 1 ? joinMeeting : sendRequestCall} closeJoinVideoCall={closeJoinVideoCall}/>
            )}
        </div>
    )

}

export default VideoCallScreen;