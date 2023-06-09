import React, {useEffect, useMemo, useRef, useState} from "react";
import {useMeeting, useParticipant} from "@videosdk.live/react-sdk";
import ReactPlayer from "react-player";
import {useDispatch, useSelector} from "react-redux";
import "./participant_view.scss";
import "./presenter.scss";
import PhoneDisconnect from "../../Assets/Image/PhoneDisconnect.png";
import {leaveMeetingRoom} from "../../store/actions/meetingAction";

function PresenterView(props) {
    const { screenShareAudioStream, isLocal, screenShareStream, screenShareOn } =
        useParticipant(props.presenterId);
    const mediaStream = useMemo(() => {
        if (screenShareOn && screenShareStream) {
            const mediaStream = new MediaStream();
            mediaStream.addTrack(screenShareStream.track);
            return mediaStream;
        }
    }, [screenShareStream, screenShareOn]);
    const audioPlayer = useRef();
    useEffect(() => {
        if (
            !isLocal &&
            audioPlayer.current &&
            screenShareOn &&
            screenShareAudioStream
        ) {
            const mediaStream = new MediaStream();
            mediaStream.addTrack(screenShareAudioStream.track);

            audioPlayer.current.srcObject = mediaStream;
            audioPlayer.current.play().catch((err) => {
                if (
                    err.message ===
                    "play() failed because the user didn't interact with the document first. https://goo.gl/xX8pDD"
                ) {
                    console.error("audio" + err.message);
                }
            });
        } else {
            audioPlayer.current.srcObject = null;
        }
    }, [screenShareAudioStream, screenShareOn, isLocal]);

    return (
        <div className={` participant_view presenter`}>
            <ReactPlayer
                playsinline
                playIcon={<></>}
                pip={false}
                light={false}
                controls={false}
                muted={true}
                playing={true}
                url={mediaStream}
                height={"100%"}
                width={"100%"}
                onError={(err) => {
                    console.log(err, "presenter video error");
                }}
            />
            <audio autoPlay playsInline controls={false} ref={audioPlayer} />
        </div>
    );
}
export default PresenterView;