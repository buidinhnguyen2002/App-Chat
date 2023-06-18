import "./options_side_bar.scss";
import React, {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "../../firebase";
import {v4} from "uuid";
import {updateAvatar} from "../../store/actions/userAction";
import {GROUP_AVATAR_HOLDER, HEADER_UPDATE_GROUP_AVATAR, USER_AVATAR_HOLDER} from "../../util/constants";
import {getAvatar} from "../../util/function";
import {callAPIGetRoomChatMes, callAPISendChatRoom} from "../../service/loginService";
function OptionsSideBar(props) {
    const currentChat = useSelector(state => state.userReducer.currentChat);
    const peopleAvarars = useSelector(state => state.userReducer.avatarPeople);
    const groupAvatars =  useSelector(state => state.userReducer.avatarGroups);
    const [isOpenOptionsChat, setOpenOptionsChat] = useState(false);
    const fileInputRef = useRef(null);
    const dispatch = useDispatch();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        const imageRef = ref(storage, `group_avatar/${currentChat.name}/avatar`);
        const uploadTask = uploadBytesResumable(imageRef, file);
        uploadTask.on("state_changed",null,
            null,()=> {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        callAPISendChatRoom(currentChat.name, HEADER_UPDATE_GROUP_AVATAR + downloadURL);
                        dispatch(updateAvatar(currentChat.name, downloadURL));
                        callAPIGetRoomChatMes(currentChat.name);
                    })
                    .catch((error) => {
                        console.error("Lỗi khi lấy URL tải xuống:", error);
                    });
            })
    };
    const handleChooseImage = () => {
        fileInputRef.current.click();
    };
    function ItemOptionChat(props) {
        return <div className="drop_down-item" onClick={props.onClick}>
            {props.isChooseImage && <input className={"input_file_img"} type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef}/>}
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
                { currentChat && <img src={getAvatar(currentChat.type === 0 ? 0 : 1, peopleAvarars, groupAvatars, currentChat.name)} alt=""/>}
            </div>
            <p className={"title"}>{currentChat ? currentChat.name : "NULL"}</p>
            <div className="options_chat">
                <div className="options_chat-item" onClick={toggleShowOptionsChat}>
                    <span>Tùy chỉnh đoạn chat</span>
                    <i className="fa-solid fa-chevron-down" style={{transform: isOpenOptionsChat ? "rotate(180deg)": ""}}></i>
                </div>
                {isOpenOptionsChat && <div className="drop_down">
                    <ItemOptionChat icon={'bi bi-pencil'} title={currentChat.type !== 0 ?'Đổi tên đoạn chat': 'Đặt biệt danh'}/>
                    {currentChat.type !== 0 && <ItemOptionChat icon={'bi bi-image'} title={'Thay đổi ảnh'} isChooseImage={true} onClick={handleChooseImage}/>}
                    <ItemOptionChat icon={'fa-solid fa-thumbs-up'} title={'Thay đổi biểu tượng cảm xúc'}/>
                </div>}
            </div>
        </div>
    );
}
export default OptionsSideBar;