import {getCurrentTime} from "../../util/function";
import {callAPIGetPeopleChatMes, callAPISendChatPeople} from "../../service/loginService";
import {HEADER_CONNECT_CHAT_PEOPLE} from "../../util/constants";

const initialState = {
    username: '',
    keyReLogin: '',
    isAuthenticated: false,
    chats: [],
    chatsRoom: [],
    chatsPeople: [],
    currentChat: null,
    images: [],
    avatarPeople: [],
    avatarGroups: [],
};
let isInit = true;

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                username: action.payload.username,
                isAuthenticated: true,
            };
        case 'SAVE_LIST_CHATS':
            return {
                ...state,
                chats: action.payload,
            }
        case 'SAVE_LIST_CHATS_ROOM':
            return {
                ...state,
                chatsRoom: [...action.payload],
            }
        case 'SAVE_LIST_CHATS_PEOPLE':
            return {
                ...state,
                chatsPeople: [...action.payload],
            }
        case 'SET_INIT_CHAT': {
            let currentChat = null;
            if(state.chats.length !== 0){
                const chatChoose = state.chats[0];
                if(chatChoose.type === 1){
                    currentChat = state.chatsRoom[0];
                }
                if(chatChoose.type === 0){
                    currentChat = state.chatsPeople[0];
                }
            }
            return {
                ...state,
                currentChat: currentChat ? currentChat : state.currentChat,
            }
        }
        case 'CHANGE_CURRENT_CHAT':
            let nameChat = action.payload.nameChat;
            let type = action.payload.type;
            let currentChatChoose = null;
            if(type == 1){
                const room= state.chatsRoom.find(room => room.name === nameChat);
                currentChatChoose = room;
                console.log(room+"HELLO")
            }
            if(type == 0){
                const people= state.chatsPeople.find(people => people.name === nameChat);
                if(people){
                    currentChatChoose = people;
                }
            }
            return {
                ...state,
                currentChat: currentChatChoose,
            }
        case 'UPDATE_CHATS':
            // let isExist = false;
            const updateChats = state.chatsRoom.map((room,index) => {
                if(room.name === action.payload.name){
                    // isExist = true;
                    return action.payload;
                }
                return room;
            });
            // if(!isExist) updateChats.push(action.payload);
            return {
                ...state,
                chatsRoom: updateChats,
                currentChat: action.payload,
            }
        case 'UPDATE_CHAT_PEOPLE': {
            const updateChats = [...state.chatsPeople];
            const chatUpdate = updateChats.find(people => people.name === state.currentChat.name);
            let newPeople = null;
            if(chatUpdate) {
                chatUpdate.chatData = action.payload;
            }else{
                newPeople = {
                    name: action.payload.name,
                    type: action.payload.type,
                    chatData: [action.payload],
                }
                updateChats.push(newPeople);
            }
            // updateChats.find(people => people.name === state.currentChat.name).chatData = action.payload;
            return {
                ...state,
                chatsPeople: updateChats,
                currentChat: {
                    ...state.currentChat,
                    chatData: action.payload,
                },
            }
        }
        case 'RECEIVE_CHAT':
            const updateChat = state.chatsRoom.map((room,index) => {
                    if(room.name === action.payload.to){
                        return {
                            ...room,
                            chatData: [action.payload, ...room.chatData],
                        };
                    }
                    return room;
                });
            return {
                ...state,
                chatsRoom: updateChat,
                currentChat: {
                    ...state.currentChat,
                    chatData: state.currentChat.name === action.payload.to ? [  action.payload,...state.currentChat.chatData] : [...state.currentChat.chatData],
                },
            }
        case 'RECEIVE_CHAT_PEOPLE': {
            let userExist = false;
            const updateChat = state.chatsPeople.map((people,index) => {
                if(people.name === action.payload.name){
                    userExist = true;
                    return {
                        ...people,
                        chatData: [action.payload, ...people.chatData],
                    };
                }
                return people;
            });
            let newChat = null;
            let newChatPeople = null;
            if(!userExist){
                newChat = {
                    name: action.payload.name,
                    type: 0,
                    actionTime: getCurrentTime(),
                }
                newChatPeople = {
                    name: action.payload.name,
                    type: 0,
                    chatData: [action.payload],
                }
                updateChat.push(newChatPeople);
                callAPISendChatPeople(action.payload.name, HEADER_CONNECT_CHAT_PEOPLE);
                callAPIGetPeopleChatMes(action.payload.name);
            }
            return {
                ...state,
                chats: !userExist ? [newChat,...state.chats]: [...state.chats],
                chatsPeople: updateChat,
                currentChat: state.currentChat ?  {
                    ...state.currentChat,
                    chatData: state.currentChat.name === action.payload.name && userExist === true ? [  action.payload,...state.currentChat.chatData] : [...state.currentChat.chatData],
                } : newChatPeople,
            }
        }
        case 'SEND_CHAT':
            const roomChat = action.payload.nameChat;
            const typeChat = action.payload.type;
            let mes = action.payload.mes;
            let username = JSON.parse(sessionStorage.getItem('dataReLogIn')).username;
            let msgObj = {
                name: username,
                type: 1,
                to: '',
                mes: mes,
                createAt: "2020 11:28:23",
            }

            // if(type == 1){
            //     const room= state.chatsRoom.find(room => room.name === nameChat);
            //     currentChatChoose = room;
            // }
            // if(type == 0){
            //     const people= state.chatsPeople.find(people => people.name === nameChat);
            //     if(people){
            //         currentChatChoose = people;
            //     }
            // }
            return {
                ...state,
                chatsRoom: state.chatsRoom.map(room => {
                    if(room.name === roomChat){
                        return {
                            ...room,
                            chatData: [msgObj,...room.chatData ],
                        };
                    }
                }),
                currentChat: {
                    ...state.currentChat,
                    chatData: [msgObj, ...state.currentChat.chatData],
                }
            }
        case 'SAVE_MY_IMAGES':
            return {
                ...state,
                images: action.payload,
            }
        case 'SET_CALLING': {
            return {
                ...state,
                isCalling: action.payload,
            }
        }
        case 'UPDATE_GROUP_AVATAR': {
            const groupAvatars = [...state.avatarGroups];
            groupAvatars.find(group => group.name === action.payload.nameChat).urlAvatar = action.payload.urlAvatar;
            return {
                ...state,
                avatarGroups: groupAvatars,
            }
        }
        case 'UPDATE_MY_AVATAR': {
            const avatarPeople = [...state.avatarPeople];
            avatarPeople.find(people => people.name === action.payload.name).urlAvatar = action.payload.urlAvatar;
            return {
                ...state,
                avatarPeople: avatarPeople,
            }
        }
        case 'SAVE_PEOPLE_AVATAR': {
            return {
                ...state,
                avatarPeople: action.payload,
            }
        }
        case 'SAVE_GROUP_AVATAR': {
            return {
                ...state,
                avatarGroups: action.payload,
            }
        }
        case 'ADD_PEOPLE': {
            let chatsTmp = [...state.chats];
            const date = new Date();
            const newTime = date.getFullYear()+ '-'+ date.getMonth() + '-'+ date.getDay() + ' ' + date.getHours()
                + ':' + date.getMinutes()+':' + date.getSeconds();
            const newPeople = {
                name: action.payload,
                type: 0,
                actionTime: newTime,
            };
            if(chatsTmp.filter(chat => chat.name === action.payload && chat.type === 0).length === 0) chatsTmp = [newPeople,...chatsTmp];
            const chatsPeopleTmp = [...state.chatsPeople];
            const newChatPeople = {
                name: action.payload,
                type: 0,
                chatData: [],
            }
            chatsPeopleTmp.push(newChatPeople);
            return {
                ...state,
                chatsPeople: chatsPeopleTmp,
                chats: chatsTmp,
            }
        }
        case 'LOGOUT_SUCCESS':
            return initialState;
        default:
            return state;
    }
}