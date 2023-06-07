import "./join_room_chat_video.scss"
function JoinRoomChatVideo(props){
    return (
        <div className={'join_room-container'}>
            <p className={'title'}>Gọi cho nhóm.</p>
            <hr/>
            <button className={'btn_join'} onClick={props.joinMeeting}>Call</button>
        </div>
    );
}
export default JoinRoomChatVideo;