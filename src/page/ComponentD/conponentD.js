import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import ChatWindow from "../../components/chat_window/Chat_window";
import MessageReply from "../../components/chat_window/MessageReply";
import MessageReceive from "../../components/chat_window/MessageReceive";
import Video from "../../components/chat_window/videocall";

function ComponentD() {
    return (
        <div className="d-flex" style={{backgroundColor: '#F0F4FA', minHeight: '100vh'}}>
            <ChatWindow/>
            <MessageReply isChoose={true}/>
            <MessageReceive/>
            <Video active={1} icon={'fa-solid fa-video'}/>
        </div>
    );
}

export default ComponentD;