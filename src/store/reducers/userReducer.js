const initialState = {
    username: '',
    keyReLogin: '',
    isAuthenticated: false,
    chats: [],
    chatsRoom: [],
    chatsPeople: [],
    currentChat: [],
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
            let currentChat = [];
            if(isInit){
                const chatChoose = state.chats[0];
                if(chatChoose.type === 1){
                    currentChat = state.chatsRoom[0].chatData;
                }
                if(chatChoose.type === 0){
                    currentChat = state.chatsPeople[0].chatData;
                }
                isInit = false;
            }
            return {
                ...state,
                chatsPeople: [...action.payload],
                currentChat: currentChat.length !== 0 ? currentChat : [...state.currentChat],

            }
        case 'CHANGE_CURRENT_CHAT':
            return {
                ...state,
                chatsRoom: [...state.chatsRoom, action.payload],
            }
        case 'LOGOUT_SUCCESS':
            return initialState;
        default:
            return state;
    }
}