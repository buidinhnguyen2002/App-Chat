import "./join_room_chat_video.scss"
function JoinRoomChatVideo(props){
    return (
        <div className={'join_room-container'}>
            <p className={'title'}>Gọi cho nhóm.</p>
            <div className="ic_close-join" onClick={props.closeJoinVideoCall}><i className="bi bi-x"></i></div>
            <hr/>
            <button className={'btn_join'} onClick={props.joinMeeting}>Call</button>
        </div>
    );
}
export default JoinRoomChatVideo;