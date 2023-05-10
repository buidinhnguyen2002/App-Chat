const initialState = {
    username: '',
    keyReLogin: '',
    isAuthenticated: false,
    chats: [],
    chatsDetail: [],
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                username: action.payload.username,
                keyReLogin: action.payload.keyReLogin,
                isAuthenticated: true,
            };
        case 'SAVE_LIST_CHATS':
            return {
                ...state,
                chats: action.payload,
            }
        case 'SAVE_LIST_CHATS_DETAIL':
            return {
                ...state,
                chatsDetail: [...state.chatsDetail, action.payload],
            }
        case 'LOGOUT_SUCCESS':
            return initialState;
        default:
            return state;
    }
}