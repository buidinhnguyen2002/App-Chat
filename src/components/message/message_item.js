import React, {useState} from "react";
import "./message_item.scss";
import {useSelector} from "react-redux";
import {saveAs} from 'file-saver';
import {HEADER_MSG_VIDEO} from "../../util/constants";
import {getURLVideo, isJoinRoomMeeting, isRejectRoomMeeting} from "../../util/function";

function MessageItem(props) {
    const dataReLogIn = JSON.parse(sessionStorage.getItem('dataReLogIn'));
    // const myName = dataReLogIn.userName;
    const myName = useSelector(state => state.userReducer.username);
    let listImg = props.isJson ? JSON.parse(props.mes).imgs : [];
    let mesText = props.isJson ? JSON.parse(props.mes).text : props.mes;
    const [imgDetail, setImgDetail] = useState('');
    const [videoDetail, setVideoDetail] = useState('');
    const [showImageDetail, setShowImageDetail] = useState(false);
    const [showVideoDetail, setShowVideoDetail] = useState(false);
    const video = getURLVideo(mesText);
    const setURLImageDetail = (e) => {
        setImgDetail(e.target.src);
        setShowImageDetail(true);
    }
    const setURLVideoDetail = (e) => {
        setVideoDetail(e.target.src);
        setShowVideoDetail(true);
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
    const getMessage = () => {
        if(isJoinRoomMeeting(mesText)) return (props.name === myName ? 'Bạn ':myName) + ' đã tham gia đoạn chat video.';
        if(isRejectRoomMeeting(mesText)) return (props.name === myName ? 'Bạn ' : myName) + ' đã rời khỏi đoạn chat video.';
        return  null;
    }
    return (
        <div>
            <div className={`image_container d-flex ${props.name === myName ? 'message_container-flexRight':'message_container-flexleft'}`}>
                <div className={'flex-container d-flex'}>
                    {listImg.map((img, index) => <div className={"image_item"}><img src={img} alt="" onClick={setURLImageDetail}/></div>)}
                </div>
            </div>
            {video !== '' ? <div className={`message_container ${props.name === myName ? 'message_container-flexRight':'message_container-flexleft'}`}>
                <div
                    className={`message_item-video message_item-video-round`}>
                    <video controls>
                        <source src={video} type={"video/mp4"}/>
                    </video>
                </div>
            </div> :
                getMessage() != null ? <p className={"mes_call"}>{getMessage()}</p> : <div style={{display: mesText === ''? "none": "flex"}} className={`message_container ${props.name === myName ? 'message_container-flexRight':'message_container-flexleft'}`}>
                 <div
                    className={`message_item message_item-round ${props.name === myName ? "message_item-bgBlue" : "message_item-bgWhite"}`}>
                    <span className={`msg ${props.name === myName ? "message-myMessage" : "message-peopleMessage"}`}>{mesText}</span>
                </div>
            </div>
            }
            {showImageDetail ? <div className={"image_detail-container"}>
                <img src={imgDetail} alt=""/>
                <div className={'ic_close'} onClick={closeImageDetail}><i className="bi bi-x-circle"></i></div>
                <div className={'ic_download'} onClick={dowloadImage}><i className="bi bi-download"></i></div>
            </div> : <></>}
            {showVideoDetail ? <div className={"image_detail-container"}>
                <video controls>
                    <source src={video} type={"video/mp4"} onDoubleClick={setURLVideoDetail}/>
                </video>
                <div className={'ic_close'} onClick={closeImageDetail}><i className="bi bi-x-circle"></i></div>
                <div className={'ic_download'} onClick={dowloadImage}><i className="bi bi-download"></i></div>
            </div> : <></>}
        </div>
    )

}

export default MessageItem;