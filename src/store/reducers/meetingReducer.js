import {
    HEADER_AUDIO_CALL,
    HEADER_AUDIO_CALL_FAILED,
    HEADER_VIDEO_CALL,
    HEADER_VIDEO_CALL_FAILED
} from "../../util/constants";
import {callAPIGetPeopleChatMes, callAPISendChatPeople} from "../../service/loginService";

const initialState = {
    meetingRoom: null,
    isCalling: null,
    isAudioCall: null,
    isRequestCall: null,
};
export default function meetingReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_MEETING_ROOM': {
            return {
                ...state,
                meetingRoom: action.payload,
            }
        }
        case 'LEAVE_MEETING_ROOM': {
            return {
                ...state,
                meetingRoom: null,
                isCalling: null,
                isAudioCall: null,
            }
        }
        case 'ADD_PARTICIPANTS': {
            const participantsTemp = [...state.meetingRoom.participants];
            if(!participantsTemp.includes(action.payload)) participantsTemp.push(action.payload);
            return {
                ...state,
                meetingRoom: {
                    ...state.meetingRoom,
                    participants: participantsTemp,
                }
            }
        }
        case 'SET_CALLING': {
            return {
                ...state,
                isCalling: action.payload,
            }
        }
        case 'REJECT_VIDEO_CALL': {
            return {
                ...state,
                isCalling: null,
                meetingRoom: null,
                isAudioCall: null,
            }
        }
        case 'REMOVE_PARTICIPANT': {
            if(state.meetingRoom == null) return;
            return {
                ...state,
                meetingRoom: {
                    ...state.meetingRoom,
                    participants: [...state.meetingRoom.participants].filter(participant => participant != action.payload),
                }
            }
        }
        case 'SET_AUDIO_CALL': {
            return {
                ...state,
                isAudioCall: action.payload,
            }
        }
        case 'SET_ACCEPT_CALL': {
            let newMeetingRoom = {...state.meetingRoom};
            if(action.payload){
                newMeetingRoom.accept = action.payload;
                const headerMeeting = state.isAudioCall ? HEADER_AUDIO_CALL : HEADER_VIDEO_CALL;
                callAPISendChatPeople(state.meetingRoom.meetingName,headerMeeting+ JSON.stringify(newMeetingRoom));
                callAPIGetPeopleChatMes(state.meetingRoom.meetingName);
            }else{
                newMeetingRoom = null;
                const headerMeeting = state.isAudioCall ? HEADER_AUDIO_CALL_FAILED : HEADER_VIDEO_CALL_FAILED;
                callAPISendChatPeople(state.meetingRoom.meetingName,headerMeeting);
                callAPIGetPeopleChatMes(state.meetingRoom.meetingName);
            }
            return {
                ...state,
                meetingRoom: newMeetingRoom,
            }
        }
        case 'SET_REQUEST_CALL': {
            return {
                ...state,
                isRequestCall: action.payload,
            }
        }
        default:
            return state;
    }
}