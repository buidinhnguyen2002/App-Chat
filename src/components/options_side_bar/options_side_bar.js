import "./options_side_bar.scss";
import React, {useState} from "react";
import {useSelector} from "react-redux";
function OptionsSideBar(props) {
    const currentChat = useSelector(state => state.userReducer.currentChat);
    const [isOpenOptionsChat, setOpenOptionsChat] = useState(false);
    function ItemOptionChat(props) {
        return <div className="drop_down-item">
            <i className={props.icon}></i>
            <span>{props.title}</span>
        </div>
    }
    const toggleShowOptionsChat = () => {
        setOpenOptionsChat(!isOpenOptionsChat);
    }
    return (
        <div className={`options_side-bar ${props.openOption ? "options_side-bar-open":"options_side-bar-close"}`}>
            <div className="avatar-container">
                <img src="data:image/jpeg;base64,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" alt=""/>
            </div>
            <p className={"title"}>{currentChat ? currentChat.name : "NULL"}</p>
            <div className="options_chat">
                <div className="options_chat-item" onClick={toggleShowOptionsChat}>
                    <span>Tùy chỉnh đoạn chat</span>
                    <i className="fa-solid fa-chevron-down" style={{transform: isOpenOptionsChat ? "rotate(180deg)": ""}}></i>
                </div>
                {isOpenOptionsChat && <div className="drop_down">
                    <ItemOptionChat icon={'bi bi-pencil'} title={'Đổi tên đoạn chat'}/>
                    <ItemOptionChat icon={'bi bi-image'} title={'Thay đổi ảnh'}/>
                    <ItemOptionChat icon={'fa-solid fa-thumbs-up'} title={'Thay đổi biểu tượng cảm xúc'}/>
                </div>}
            </div>
        </div>
    );
}
export default OptionsSideBar;