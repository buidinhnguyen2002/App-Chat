import {
    GROUP_AVATAR_HOLDER,
    HEADER_ACCEPT_VIDEO_CALL,
    HEADER_AUDIO_CALL,
    HEADER_AUDIO_CALL_FAILED,
    HEADER_CONNECT_CHAT_PEOPLE, HEADER_JOIN_GROUP,
    HEADER_JOIN_ROOM_MEETING,
    HEADER_JOIN_ROOM_MEETING_AUDIO,
    HEADER_LEAVE_AUDIO_CALL,
    HEADER_LEAVE_VIDEO_CALL,
    HEADER_MEETING_END,
    HEADER_MSG_VIDEO,
    HEADER_REJECT_CALL_PEOPLE,
    HEADER_REJECT_VIDEO_CALL,
    HEADER_REQUEST_AUDIO_CALL,
    HEADER_REQUEST_CALL,
    HEADER_UPDATE_GROUP_AVATAR,
    HEADER_UPDATE_GROUP_NAME,
    HEADER_VIDEO_CALL,
    HEADER_VIDEO_CALL_FAILED,
    USER_AVATAR_HOLDER
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
export const isAcceptCall = (text) => {
    if(text.startsWith(HEADER_ACCEPT_VIDEO_CALL)) return true;
    return false;
}
export const isRequestCall = (text) => {
    if(text.startsWith(HEADER_REQUEST_CALL)) return true;
    return false;
}
export const isRequestAudioCall = (text) => {
    if(text.startsWith(HEADER_REQUEST_AUDIO_CALL)) return true;
    return false;
}
export const getMeetingIdFromRequestCall = (text) => {
    return text.substring(HEADER_REQUEST_CALL.length , text.length)
}
export const getMeetingIdFromRequestAudioCall = (text) => {
    return text.substring(HEADER_REQUEST_AUDIO_CALL.length , text.length)
}
export const isAudioCall = (text) => {
    if(text.startsWith(HEADER_AUDIO_CALL)) return true;
    return false;
}
export const isRejectCallPeople = (text) => {
    if(text.startsWith(HEADER_REJECT_CALL_PEOPLE)) return true;
    return false;
}
export const isUpdateGroupAvatar = (text) => {
    if(text.startsWith(HEADER_UPDATE_GROUP_AVATAR)) return true;
    return false;
}
export const isJoinGroup = (text) => {
    if(text.startsWith(HEADER_JOIN_GROUP)) return true;
    return false;
}
export const getURLUpdateGroupAvatar = (text) => {
    return text.substring(HEADER_UPDATE_GROUP_AVATAR.length , text.length)
}
export const isUpdateGroupName = (text) => {
    if(text.startsWith(HEADER_UPDATE_GROUP_NAME)) return true;
    return false;
}
export const getGroupNameChange = (text) => {
    return text.substring(HEADER_UPDATE_GROUP_NAME.length , text.length)
}
export const isAudioCallFailed = (text) => {
    if(text.startsWith(HEADER_AUDIO_CALL_FAILED)) return true;
    return false;
}
export const isVideoCallFailed = (text) => {
    if(text.startsWith(HEADER_VIDEO_CALL_FAILED)) return true;
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
export const isConnectChatPeople = (text) => {
    if(text.startsWith(HEADER_CONNECT_CHAT_PEOPLE)) return true;
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
export function getAuthName(){
    const storedData = sessionStorage.getItem('dataReLogIn');
    const dataReLogIn = decryptData(storedData);
    return dataReLogIn.userName;
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
export function getCurrentTime() {
    const date = new Date();
    const newTime = date.getFullYear()+ '-'+ date.getMonth() + '-'+ date.getDay() + ' ' + date.getHours()
        + ':' + date.getMinutes()+':' + date.getSeconds();
    return newTime;
}
export function getTimeHourAndMinute(msg) {
    const newTime = msg.substring(msg.length - 8, msg.length-3);
    return newTime;
}
export const getAvatar = (type, peopleAvarars, groupAvatars, name) => {
    let urlAvatar ='';
    if(type == 0){
        const avatar = peopleAvarars.find(ava => ava.name === name);
        urlAvatar = avatar ? avatar.urlAvatar : USER_AVATAR_HOLDER;
    }else{
        const avatar = groupAvatars.find(ava => ava.name === name);
        urlAvatar = avatar ? avatar.urlAvatar : GROUP_AVATAR_HOLDER
    }
    return urlAvatar;
}
export const getNameChat = (type, peopleNickName, groupNickName, name) => {
    let nickName ='';
    if(type == 0){
        const people = peopleNickName.find(people => people.name === name);
        nickName = people ? people.nickName : name;
    }else{
        const group = groupNickName.find(group => group.name === name);
        nickName = group ? group.nickName : name;
    }
    return nickName;
}
