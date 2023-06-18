export function setMeetingRoom(meet) {
    return {
        type: "SET_MEETING_ROOM",
        payload: meet,
    }
}
export function leaveMeetingRoom() {
    return {
        type: "LEAVE_MEETING_ROOM",
        payload: null,
    }
}
export function addParticipant(participant) {
    return {
        type: "ADD_PARTICIPANTS",
        payload: participant,
    }
}
export function removeParticipant(participant) {
    return {
        type: "REMOVE_PARTICIPANT",
        payload: participant,
    }
}
export function setCalling(isCalling) {
    return {
        type: "SET_CALLING",
        payload: isCalling,
    }
}
export function setAcceptCall(isAccept) {
    return {
        type: "SET_ACCEPT_CALL",
        payload: isAccept,
    }
}
export function setRequestCall(isRequest) {
    return {
        type: "SET_REQUEST_CALL",
        payload: isRequest,
    }
}
export function rejectVideoCall() {
    return {
        type: "REJECT_VIDEO_CALL",
        payload: null,
    }
}
export function setAudioCall(isAudioCall) {
    return {
        type: "SET_AUDIO_CALL",
        payload: isAudioCall,
    }
}