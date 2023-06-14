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
            let currentChat = null;
            if(isInit){
                const chatChoose = state.chats[0];
                if(chatChoose.type === 1){
                    currentChat = state.chatsRoom[0];
                    const urlAvatar= state.chats.find(room => room.name === currentChat.name).urlAvatar;
                    currentChat.urlAvatar = urlAvatar;
                }
                if(chatChoose.type === 0){
                    currentChat = state.chatsPeople[0];
                }
                isInit = false;
            }
            return {
                ...state,
                chatsPeople: [...action.payload],
                currentChat: currentChat && currentChat.length !== 0 ? currentChat : state.currentChat,

            }
        case 'CHANGE_CURRENT_CHAT':
            let nameChat = action.payload.nameChat;
            let type = action.payload.type;
            let currentChatChoose = null;
            if(type == 1){
                const room= state.chatsRoom.find(room => room.name === nameChat);
                const urlAvatar= state.chats.find(room => room.name === nameChat).urlAvatar;
                room.urlAvatar = urlAvatar;
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
        case '':
            let chatRecive = action.payload;
            let newListChat = [];
            let chat = null;
            if(chatRecive.type == 1){
                chat = state.chatsRoom.find(room => room.name === chatRecive.to);
                newListChat = [chatRecive, ...chat.chatData];
            }
            return {
                ...state,
                chatsRoom: {
                    ...state.chatsRoom,

                }
            }
        case 'UPDATE_CHATS':
            const updateChats = state.chatsRoom.map((room,index) => {
                if(room.name === action.payload.name){
                    return action.payload;
                }
                return room;
            });
            return {
                ...state,
                chatsRoom: updateChats,
                currentChat: action.payload,
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
        case 'UPDATE_AVATAR': {
            const currentChat = { ...state.currentChat };
            currentChat.urlAvatar = action.payload.urlAvatar;
            const chats = [...state.chats];
            const chatsUpdate = chats.map(room => {
                if(room.name === action.payload.nameChat){
                    room.urlAvatar = action.payload.urlAvatar;
                    return room;
                }
                return room;
            });
            return {
                ...state,
                currentChat: currentChat,
                chats: chatsUpdate,
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
        case 'LOGOUT_SUCCESS':
            return initialState;
        default:
            return state;
    }
}