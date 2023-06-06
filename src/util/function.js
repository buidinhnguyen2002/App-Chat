import {
    HEADER_JOIN_ROOM_MEETING,
    HEADER_LEAVE_VIDEO_CALL,
    HEADER_MSG_VIDEO,
    HEADER_REJECT_VIDEO_CALL,
    HEADER_VIDEO_CALL
} from "./constants";

export const isVideo = (text) => {
    if(text.includes(HEADER_MSG_VIDEO)) return true;
    return false;
}
export const isVideoCall = (text) => {
    if(text.startsWith(HEADER_VIDEO_CALL)) return true;
    return false;
}
export const getMeetingRoom = (text) => {
    return JSON.parse(text.substring(HEADER_VIDEO_CALL.length , text.length));
}
export const isRejectVideoCall = (text) => {
    if(text.startsWith(HEADER_REJECT_VIDEO_CALL)) return true;
    return false;
}
export const isJoinRoomMeeting = (text) => {
    if(text.startsWith(HEADER_JOIN_ROOM_MEETING)) return true;
    return false;
}
export const isRejectRoomMeeting = (text) => {
    if(text.startsWith(HEADER_REJECT_VIDEO_CALL)) return true;
    return false;
}
export const isLeaveRoomMeeting = (text) => {
    if(text.startsWith(HEADER_LEAVE_VIDEO_CALL)) return true;
    return false;
}
export const getLayoutParticipant = (num) => {

    return false;
}
export const getURLVideo = (text) => {
    if(text.includes(HEADER_MSG_VIDEO)) {
        return text.substring(text.indexOf('=') + 1, text.length);
    }
    return '';
}
export function isJSON(str) {
    try {
        const searchStrings = ["{", "}", "[", "]", "text", "imgs"];
        for (const searchStringsKey of searchStrings) {
            if (!str.includes(searchStringsKey)) return false;
        }
        JSON.parse(str);
        return true;
    } catch (error) {
        return false;
    }
}
