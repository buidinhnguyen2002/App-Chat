const initialState = {
    meetingRoom: null,
    isCalling: null,
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
            }
        }
        case 'ADD_PARTICIPANTS': {
            return {
                ...state,
                meetingRoom: {
                    ...state.meetingRoom,
                    participants: [...state.meetingRoom.participants, action.payload],
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
            }
        }
        case 'REMOVE_PARTICIPANT': {
            let participants = [];
            if(state.meetingRoom) participants= [...state.meetingRoom.participants].filter(participant => participant != action.payload);
            return {
                ...state,
                meetingRoom: {
                    ...state.meetingRoom,
                    participants: [...state.meetingRoom.participants].filter(participant => participant != action.payload),
                }
            }
        }
        default:
            return state;
    }
}