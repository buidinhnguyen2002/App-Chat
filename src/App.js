import {React} from "react";
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Login from "./page/login/login";
import ChatPage from "./page/Chat/chat";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate, Routes} from "react-router-dom";
import store from "./store/store";
import {Provider, useDispatch} from "react-redux";
import ChatDetail from "./components/chat/chat";
import SettingFragment from "./components/setting_fragment/setting_fragment";
import WindowChat from "./components/chat_window/chat_window";
import {callAPIGetUserList, callAPIReLogIn, client, waitConnection} from "./service/loginService";
import {saveListChat} from "./store/actions/userAction";

// import {
//     MeetingProvider,
//     MeetingConsumer,
//     useMeeting,
//     useParticipant,
// } from "@videosdk.live/react-sdk";
// import { authToken, createMeeting } from "./service/VideoCallService";
// import ReactPlayer from "react-player";
// import  { useEffect, useMemo, useRef, useState } from "react";
// function JoinScreen({ getMeetingAndToken }) {
//     const [meetingId, setMeetingId] = useState(null);
//     const onClick = async () => {
//         await getMeetingAndToken(meetingId);
//     };
//     return (
//         <div>
//             <input
//                 type="text"
//                 placeholder="Enter Meeting Id"
//                 onChange={(e) => {
//                     setMeetingId(e.target.value);
//                 }}
//             />
//             <button onClick={onClick}>Join</button>
//             {" or "}
//             <button onClick={onClick}>Create Meeting</button>
//         </div>
//     );
// }
//
// function ParticipantView(props) {
//     const micRef = useRef(null);
//     const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
//         useParticipant(props.participantId);
//
//     const videoStream = useMemo(() => {
//         if (webcamOn && webcamStream) {
//             const mediaStream = new MediaStream();
//             mediaStream.addTrack(webcamStream.track);
//             return mediaStream;
//         }
//     }, [webcamStream, webcamOn]);
//
//     useEffect(() => {
//         if (micRef.current) {
//             if (micOn && micStream) {
//                 const mediaStream = new MediaStream();
//                 mediaStream.addTrack(micStream.track);
//
//                 micRef.current.srcObject = mediaStream;
//                 micRef.current
//                     .play()
//                     .catch((error) =>
//                         console.error("videoElem.current.play() failed", error)
//                     );
//             } else {
//                 micRef.current.srcObject = null;
//             }
//         }
//     }, [micStream, micOn]);
//
//     return (
//         <div>
//             <p>
//                 Participant: {displayName} | Webcam: {webcamOn ? "ON" : "OFF"} | Mic:{" "}
//                 {micOn ? "ON" : "OFF"}
//             </p>
//             <audio ref={micRef} autoPlay playsInline muted={isLocal} />
//             {webcamOn && (
//                 <ReactPlayer
//                     //
//                     playsinline // very very imp prop
//                     pip={false}
//                     light={false}
//                     controls={false}
//                     muted={true}
//                     playing={true}
//                     //
//                     url={videoStream}
//                     //
//                     height={"300px"}
//                     width={"300px"}
//                     onError={(err) => {
//                         console.log(err, "participant video error");
//                     }}
//                 />
//             )}
//         </div>
//     );
// }
//
// function Controls(props) {
//     const { leave, toggleMic, toggleWebcam } = useMeeting();
//     return (
//         <div>
//             <button onClick={() => leave()}>Leave</button>
//             <button onClick={() => toggleMic()}>toggleMic</button>
//             <button onClick={() => toggleWebcam()}>toggleWebcam</button>
//         </div>
//     );
// }
//
// function MeetingView(props) {
//     const [joined, setJoined] = useState(null);
//     //Get the method which will be used to join the meeting.
//     //We will also get the participants list to display all participants
//     const { join, participants } = useMeeting({
//         //callback for when meeting is joined successfully
//         onMeetingJoined: () => {
//             setJoined("JOINED");
//         },
//         //callback for when meeting is left
//         onMeetingLeft: () => {
//             props.onMeetingLeave();
//         },
//     });
//     const joinMeeting = () => {
//         setJoined("JOINING");
//         join();
//     };
//
//     return (
//         <div className="container">
//             <h3>Meeting Id: {props.meetingId}</h3>
//             {joined && joined == "JOINED" ? (
//                 <div>
//                     <Controls />
//                     //For rendering all the participants in the meeting
//                     {[...participants.keys()].map((participantId) => (
//                         <ParticipantView
//                             participantId={participantId}
//                             key={participantId}
//                         />
//                     ))}
//                 </div>
//             ) : joined && joined == "JOINING" ? (
//                 <p>Joining the meeting...</p>
//             ) : (
//                 <button onClick={joinMeeting}>Join</button>
//             )}
//         </div>
//     );
// }
// function App() {
//     const [meetingId, setMeetingId] = useState(null);
//
//     //Getting the meeting id by calling the api we just wrote
//     const getMeetingAndToken = async (id) => {
//         const meetingId =
//             id == null ? await createMeeting({ token: authToken }) : id;
//         setMeetingId(meetingId);
//     };
//
//     //This will set Meeting Id to null when meeting is left or ended
//     const onMeetingLeave = () => {
//         setMeetingId(null);
//     };
//
//     return authToken && meetingId ? (
//         <MeetingProvider
//             config={{
//                 meetingId,
//                 micEnabled: true,
//                 webcamEnabled: true,
//                 name: "C.V. Raman",
//             }}
//             token={authToken}
//         >
//             <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
//         </MeetingProvider>
//     ) : (
//         <JoinScreen getMeetingAndToken={getMeetingAndToken} />
//     );
// }

function App() {

    const dispatch = useDispatch();
    const chatLoader = async () =>{
        await waitConnection();
        callAPIReLogIn();
        callAPIGetUserList();
        client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            if (dataFromServer['event'] === 'RE_LOGIN') {
                const dataFromServer = JSON.parse(message.data);
                const dataReLogIn = JSON.parse(sessionStorage.getItem('dataReLogIn'));
                console.log(dataFromServer, "RELO");
                dataReLogIn.keyReLogIn = dataFromServer['data']?.['RE_LOGIN_CODE'];
                sessionStorage.setItem('dataReLogIn', JSON.stringify(dataReLogIn));
            }
            if(dataFromServer['event'] === 'GET_USER_LIST'){
                const responseListChat = dataFromServer['data'];
                console.log(dataFromServer, "CHAT");
                dispatch(saveListChat(responseListChat));
            }
        }
        return null;
    }
    const router = createBrowserRouter(
        [
            {
                path: "/",
                element: <Login status={"login"}/>,
            }, {
            path: "/",
            element: <ChatPage />,
            children: [
                {
                    path: "chat",
                    element: <ChatDetail/>,
                    // children: [
                    //     {
                    //         path: '/:chatId',
                    //         element: <WindowChat/>,
                    //     }
                    // ],
                },
                {
                    path: "setting",
                    element: <SettingFragment/>,
                },
            ],
        },
        ]
    );
    return (
        <RouterProvider router={router}/>
    );
}

export default App;
