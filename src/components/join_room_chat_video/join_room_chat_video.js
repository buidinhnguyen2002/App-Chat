import "./join_room_chat_video.scss"
import {HEADER_AUDIO_CALL, HEADER_VIDEO_CALL} from "../../util/constants";
import {
    callAPIGetPeopleChatMes,
    callAPIGetRoomChatMes,
    callAPISendChatPeople,
    callAPISendChatRoom
} from "../../service/loginService";
function JoinRoomChatVideo(props){
    const getTitle = () => {
        if(props.meetingRoom.newRoom) return "Đoạn chat video đã kết thúc.";
        if(props.meetingRoom.join != null){
            return "Tham gia đoạn chat.";
        }
        return "Gọi cho nhóm.";
    }
    const getNameButton = () => {
        if(props.meetingRoom.newRoom) return "Bắt đầu cuộc gọi mới.";
        if(props.meetingRoom.join != null){
            return "Tham gia";
        }
        return "Gọi";
    }

    return (
        <div className={'join_room-container'}>
            <p className={'title'}>{getTitle()}</p>
            <div className="ic_close-join" onClick={props.closeJoinVideoCall}><i className="bi bi-x"></i></div>
            <hr/>
            <button className={'btn_join'} onClick={props.joinMeeting}>{getNameButton()}</button>
        </div>
    );
}
export default JoinRoomChatVideo;