import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Toggle_item from "../../components/toggle_item/toggle_item";
import Header from "../../components/header/header-chat"
import Archive_item from "../../components/archive-item/archive_item";

function Components_Trung() {
    return (
        <div className="toggle">
            <Toggle_item/>
            <div className="header-chat">
                <Header/>
                <div className="archive">
                    <Archive_item/>
                </div>
            </div>
        </div>
    );
}

export default Components_Trung;

