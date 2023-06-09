import React, {useEffect, useMemo, useRef, useState} from "react";
import {useMeeting, useParticipant} from "@videosdk.live/react-sdk";
import ReactPlayer from "react-player";
import {useDispatch, useSelector} from "react-redux";
import "./participant_view.scss"
import {addParticipant} from "../../store/actions/meetingAction";
import {getNameChat} from "../../util/function";

function ParticipantView(props) {
    const myName = useSelector(state => state.userReducer.username);
    const micRef = useRef(null);
    const [openMic, setOpenMic] = useState(true);
    const [openCamera, setOpenCamera] = useState(true);
    const [openScreenShare, setOpenScreenShare] = useState(false);
    const groupNickName = useSelector(state => state.userReducer.nickNameGroups);
    const peopleNickName = useSelector(state => state.userReducer.nickNamePeople);
    const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
        useParticipant(props.participantId, );
    const { leave, toggleMic, toggleWebcam, disableWebcam, participants } = useMeeting();
    const dispatch = useDispatch();
    const videoStream = useMemo(() => {
        if (webcamOn && webcamStream) {
            const mediaStream = new MediaStream();
            mediaStream.addTrack(webcamStream.track);
            return mediaStream;
        }
    }, [webcamStream, webcamOn]);
    useEffect(() => {
        if(props.isJoin) dispatch(addParticipant(displayName));
        if (micRef.current) {
            if (micOn && micStream) {
                const mediaStream = new MediaStream();
                mediaStream.addTrack(micStream.track);

                micRef.current.srcObject = mediaStream;
                micRef.current
                    .play()
                    .catch((error) =>
                        console.error("videoElem.current.play() failed", error)
                    );
            } else {
                micRef.current.srcObject = null;
            }
        }
    }, [micStream, micOn]);
    const toggleChangeMic = () => {
        setOpenMic(!openMic);
        toggleMic();
    }
    const toggleCamera = () => {
        setOpenCamera(!openCamera);
        toggleWebcam();
    }

    return (
         props.type === 1 ? <div className={` participant_view `} style={{width: props.width, height: props.height}}>
                <audio ref={micRef} autoPlay playsInline muted={ isLocal} />
                { webcamOn ? (
                    <ReactPlayer
                        playsinline
                        pip={false}
                        light={false}
                        controls={false}
                        muted={true}
                        playing={true}
                        url={videoStream}
                        width="100%"
                        height="100%"
                        onError={(err) => {
                            console.log(err, "participant video error");
                        }}
                    />
                ) : <div className={`holder_participant ${props.isItemSideBar ? 'sidebar_item': ''}`}>
                    <div className={`title-container `}>
                        {/*<p>{displayName}</p>*/}
                        <p>{getNameChat( 0 , peopleNickName, groupNickName, displayName)}</p>
                    </div>
                </div>}
            </div> : <div className={` participant_view ${displayName === myName ? 'my_view': ''}`} style={displayName === myName ? {width: "20%", height: "auto"} :{width: "100%", height: "100%"}}>
             <audio ref={micRef} autoPlay playsInline muted={ isLocal} />
             { webcamOn ? (
                 <ReactPlayer
                     playsinline
                     pip={false}
                     light={false}
                     controls={false}
                     muted={true}
                     playing={true}
                     url={videoStream}
                     width="100%"
                     height="100%"
                     onError={(err) => {
                         console.log(err, "participant video error");
                     }}
                 />
             ) : <div className={`holder_participant ${displayName === myName ? 'my_holder': ''}`}>
                 <div className={`title-container `}>
                     {/*<p>{displayName}</p>*/}
                     <p>{getNameChat( 0 , peopleNickName, groupNickName, displayName)}</p>
                 </div>
             </div>}
         </div>
    );
}
export default ParticipantView;