import {
    HEADER_AUDIO_CALL,
    HEADER_JOIN_ROOM_MEETING, HEADER_JOIN_ROOM_MEETING_AUDIO, HEADER_LEAVE_AUDIO_CALL,
    HEADER_LEAVE_VIDEO_CALL, HEADER_MEETING_END,
    HEADER_MSG_VIDEO,
    HEADER_REJECT_VIDEO_CALL,
    HEADER_VIDEO_CALL
} from "./constants";
import CryptoJS from "crypto-js";

export const isVideo = (text) => {
    if(text.includes(HEADER_MSG_VIDEO)) return true;
    return false;
}
export const isVideoCall = (text) => {
    if(text.startsWith(HEADER_VIDEO_CALL)) return true;
    return false;
}
export const isAudioCall = (text) => {
    if(text.startsWith(HEADER_AUDIO_CALL)) return true;
    return false;
}
export const getMeetingRoom = (text) => {
    return JSON.parse(text.substring(HEADER_VIDEO_CALL.length , text.length));
}
export const getMeetingRoomAudio = (text) => {
    return JSON.parse(text.substring(HEADER_AUDIO_CALL.length , text.length));
}
export const getNameParticipant = (text) => {
    return text.substring(HEADER_LEAVE_VIDEO_CALL.length , text.length);
}
export const isRejectVideoCall = (text) => {
    if(text.startsWith(HEADER_REJECT_VIDEO_CALL)) return true;
    return false;
}
export const isJoinRoomMeeting = (text) => {
    if(text.startsWith(HEADER_JOIN_ROOM_MEETING)) return true;
    return false;
}
export const isJoinRoomMeetingAudio = (text) => {
    if(text.startsWith(HEADER_JOIN_ROOM_MEETING_AUDIO)) return true;
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
export const isLeaveRoomMeetingAudio = (text) => {
    if(text.startsWith(HEADER_LEAVE_AUDIO_CALL)) return true;
    return false;
}
export const isMeetingEnd = (text) => {
    if(text.startsWith(HEADER_MEETING_END)) return true;
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
export function isLink(str) {
    const linkRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return linkRegex.test(str);
}
export function encryptData(data) {
    const dataEncrypt = CryptoJS.AES.encrypt(JSON.stringify(data), process.env.REACT_APP_SECRET_KEY).toString();
    return dataEncrypt;
}
export function decryptData(data) {
    const decryptedBytes = CryptoJS.AES.decrypt(data, process.env.REACT_APP_SECRET_KEY);
    const dataDescrypt = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
    return dataDescrypt;
}
