import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Toggle_item from "../../components/toggle_item/toggle_item";
import Header from "../../components/header/header-chat"
import Archive_item from "../../components/archive-item/archive_item";
import MessagesPage from "../../components/message-page/input_message";
import HeaderChat from "../../components/header/header-chat";


function Components_Trung() {
    return (
        <div className="d-flex" style={{flexWrap: "wrap"}}>
            <Toggle_item/>
            <HeaderChat/>
            <Archive_item/>
            <MessagesPage/>
        </div>
    );
}

export default Components_Trung;

