import React, {useState} from "react";
import "./message_item.scss";
import {useSelector} from "react-redux";
import {saveAs} from 'file-saver';

function MessageItem(props) {
    const dataReLogIn = JSON.parse(sessionStorage.getItem('dataReLogIn'));
    const myName = dataReLogIn.userName;
    let listImg = props.isJson ? JSON.parse(props.mes).imgs : [];
    let mesText = props.isJson ? JSON.parse(props.mes).text : props.mes;
    const [imgDetail, setImgDetail] = useState('');
    const [showImageDetail, setShowImageDetail] = useState(false);
    const setURLImageDetail = (e) => {
        setImgDetail(e.target.src);
        setShowImageDetail(true);
    }
    const closeImageDetail = () => {
        setImgDetail('');
        setShowImageDetail(false);
    }
    const dowloadImage = () => {
        fetch(imgDetail, {mode: "cors"}).then((response) => response.blob()).then((blob) => {
           saveAs(blob, 'image.png');
        });
    }
    return (
        <div>
            <div className={`image_container d-flex ${props.name === myName ? 'message_container-flexRight':'message_container-flexleft'}`}>
                <div className={'flex-container d-flex'}>
                    {listImg.map((img, index) => <div className={"image_item"}><img src={img} alt="" onClick={setURLImageDetail}/></div>)}
                </div>
            </div>
            <div className={`message_container ${props.name === myName ? 'message_container-flexRight':'message_container-flexleft'}`}>
                <div
                    className={`message_item message_item-round ${props.name === myName ? "message_item-bgBlue" : "message_item-bgWhite"}`}>
                    <span className={`msg ${props.name === myName ? "message-myMessage" : "message-peopleMessage"}`}>{mesText}</span>
                </div>
            </div>
            {showImageDetail ? <div className={"image_detail-container"}>
                <img src={imgDetail} alt=""/>
                <div className={'ic_close'} onClick={closeImageDetail}><i className="bi bi-x-circle"></i></div>
                <div className={'ic_download'} onClick={dowloadImage}><i className="bi bi-download"></i></div>
            </div> : <></>}
        </div>
    )

}

export default MessageItem;