const initialState = {
    meetingRoom: null,
    isCalling: null,
    isAudioCall: null,
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
        default:
            return state;
    }
}