import {
    MeetingProvider,
    MeetingConsumer,
    useMeeting,
    useParticipant,
} from "@videosdk.live/react-sdk";
import React, {useEffect, useState} from "react";

import "./chat_detail_header.scss";
import {useDispatch, useSelector} from "react-redux";
import {authToken, createMeeting} from "../../service/VideoCallService";
import {setAudioCall, setMeetingRoom} from "../../store/actions/meetingAction";
import {callAPISendChatRoom} from "../../service/loginService";
import {HEADER_VIDEO_CALL} from "../../util/constants";
import OptionsSideBar from "../options_side_bar/options_side_bar";


function ChatDetailHeader (props) {
    const currentChat = useSelector(state => state.userReducer.currentChat);
    const isCalling = useSelector(state => state.userReducer.isCalling);
    const myName = useSelector(state => state.userReducer.username);
    const [meetingId, setMeetingId] = useState(null);
    const dispatch = useDispatch();
    const [openOptionChat, setOpenOptionChat] = useState(false);
    const getMeetingAndToken = async (id) => {
        const meetingId = id == null ? await createMeeting({token: authToken}): id;
        setMeetingId(meetingId);
        return meetingId.toString();
    }
    const handelCallVideo = async (isAudioCall) => {
        const meetId = await getMeetingAndToken(null);
        if(meetId){
            const meetingRoom = {
                meetId,
                meetingName: currentChat.name,
                owner: myName,
                participants: [myName],
            };
            dispatch(setMeetingRoom(meetingRoom));
        }
        dispatch(setAudioCall(isAudioCall));
    }
    const toggleOpenOptionChat = () => {
        setOpenOptionChat(!openOptionChat);
    }
        return (
            <div className="chat_detail_header chat_detail_header-bgLight">
                <div className="chat_detail_header-leading">
                    <div className="chat_avatar-wrapper">
                        <div className="chat_avatar chat_avatar-circle">
                            <div className="img-wrapper">
                                <img src={currentChat ? currentChat.urlAvatar : ''} alt=""/>
                            </div>
                        </div>
                        <span className="chat_status chat_status-active"></span>
                    </div>
                    <div className="chat_detail_header-wrapper">
                        <div className="chat_content-wrapper">
                            <div className="chat_name ">
                                <h4 className='chat_name-clBlack'>{currentChat ? currentChat.name:''}</h4>
                            </div>
                            <div className="chat_message">
                                <h5 className='chat_message-clGrey'>Online</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="chat_detail_header-trailing">
                    <div className="video_call chat_detail-icon" onClick={()=>handelCallVideo(false)}>
                        <i className="bi bi-camera-video"></i>
                    </div>
                    <div className="audio_call chat_detail-icon" onClick={()=>handelCallVideo(true)}>
                        <i className="bi bi-telephone"></i>
                    </div>
                    <div className="find_message chat_detail-icon">
                        <i className="bi bi-search"></i>
                    </div>
                    <div className="more chat_detail-icon">
                        <div className="vertical-line"></div>
                        <i className="fa-solid fa-chevron-down" style={{transform: openOptionChat ? "rotate(90deg)": ""}} onClick={toggleOpenOptionChat}></i>
                    </div>
                </div>
                <OptionsSideBar openOption={openOptionChat}/>
            </div>
        )

}

export default ChatDetailHeader;