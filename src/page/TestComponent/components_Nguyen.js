import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import NavigationItem from "../../components/navigation_item/navigation_item";
import Chat_item from "../../components/chat_item/chat_item";
import SearchBar from "../../components/search_bar/search_bar";


function Components_Nguyen() {
    return (
        <div className="d-flex" style={{backgroundColor: '#F0F4FA', minHeight: '100vh'}}>
            <NavigationItem active={1} icon={'bi bi-chat-dots'}/>
            <NavigationItem active={0} icon={'bi bi-chat-dots'}/>
            <NavigationItem active={1} icon={'bi bi-people'}/>
            <NavigationItem active={0} icon={'bi bi-people'}/>
            <NavigationItem active={1} icon={'bi bi-telephone'}/>
            <NavigationItem active={0} icon={'bi bi-telephone'}/>
            <NavigationItem active={1} icon={'bi bi-gear'}/>
            <NavigationItem active={0} icon={'bi bi-gear'}/>
            <Chat_item />
            <Chat_item isChoose={true}/>
            <SearchBar/>
        </div>
    );
}

export default Components_Nguyen;