import React, {useRef, useState} from "react";
import "./navigation_bar.scss";
import NavigationItem from "../navigation_item/navigation_item";
import ToggleItem from "../toggle_item/toggle_item";
import MyAvatar from "../../Assets/Image/my avatar.png";
import Budgie from "../../Assets/Image/Budgie.png";
import login from "../../page/login/login";
import {Link} from "react-router-dom";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "../../firebase";
import {updateAvatar, updateMyAvatar} from "../../store/actions/userAction";
import {useDispatch, useSelector} from "react-redux";
import {USER_AVATAR_HOLDER} from "../../util/constants";

function NavigationBar(props) {
    const fileInputRef = useRef(null);
    const myName = useSelector(state => state.userReducer.username);
    const myAvatar = useSelector(state => state.userReducer.avatarPeople).find(avatar => avatar.name === myName);
    const urlAvatar = myAvatar ? myAvatar.urlAvatar : USER_AVATAR_HOLDER;
    const [indexActive, setIndexActive] = useState(0);
    const dispatch = useDispatch();
    const changeIndexNav = (index) => {
        setIndexActive(index);
    }
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        const imageRef = ref(storage, `people_avatar/${myName}/avatar`);
        const uploadTask = uploadBytesResumable(imageRef, file);
        uploadTask.on("state_changed",null,
            null,()=> {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        dispatch(updateMyAvatar( myName,downloadURL));
                    })
                    .catch((error) => {
                        console.error("Lỗi khi lấy URL tải xuống:", error);
                    });
            })
    };
    const handleChooseImage = () => {
        fileInputRef.current.click();
    };
    return (
        <div className={"navigation-bar"}>
            <div className="navigation-bar-top">
                <div className="img-top">
                    <img src={Budgie} alt=""/>
                </div>
                <div className="navigation-bar-item" onClick={() => changeIndexNav(0)}>
                    <Link to={"/chat"}><NavigationItem active={indexActive === 0} icon={'bi bi-chat-dots'}/></Link>
                </div>
                <div className="navigation-bar-item" onClick={() => changeIndexNav(1)}>
                    <NavigationItem active={indexActive === 1} icon={'bi bi-people'}/>
                </div>
                <div className="navigation-bar-item navigation-bar-item-phone" onClick={() => changeIndexNav(2)}>
                    <NavigationItem active={indexActive === 2} icon={'bi bi-telephone'}/>
                </div>
                <div className="navigation-bar-item navigation-bar-item-setting" onClick={() => changeIndexNav(3)}>
                    <Link to={"/setting"}>
                        <NavigationItem active={indexActive === 3} icon={'bi bi-gear'}/>
                    </Link>
                    <div className="horizontal-line"></div>
                </div>
            </div>
            <div className="navigation-bar-bottom">
                <ToggleItem/>
                <div className="avatar avatar-circle">
                    <img src={urlAvatar} alt=""/>
                    <div className="edit_avatar" onClick={handleChooseImage}>
                        <input className={"input_file_img"} type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef}/>
                        <i className="bi bi-pencil"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavigationBar;