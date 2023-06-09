import "./join_room_chat_video.scss"
function JoinRoomChatVideo(props){
    const getTitle = () => {
        if(props.owner === ''){
            return "Tham gia đoạn chat.";
        }
        return "Gọi cho nhóm.";
    }
    const getNameButton = () => {
        if(props.owner === ''){
            return "Tham gia";
        }
        return "Gọi.";
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