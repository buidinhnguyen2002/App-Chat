import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import ChatWindow from "../../components/chat_window/Chat_window";
import MessageReply from "../../components/chat_window/MessageReply";
import Videocall from "../../components/chat_window/videocall";
import MessageReceive from "../../components/chat_window/MessageReceive";

function ComponentD() {
    return (
        <div className="board-chat">
            <ChatWindow/>
            <MessageReply/>
            <MessageReceive/>
            <Videocall/>
        </div>
    );
}

export default ComponentD;