import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Toggle_item from "../../components/toggle_item/toggle_item";
import Header from "../../components/header/header-chat"

function Components_Trung() {
    return (
        <div className="toggle">
            <Toggle_item/>
            <div className="header-chat">
                <Header/>
            </div>
        </div>
    );
}

export default Components_Trung;

