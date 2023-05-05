const initialState = {
    username: '',
    keyReLogin: '',
    isAuthenticated: false,
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
        case 'LOGOUT_SUCCESS':
            return initialState;
        default:
            return state;
    }
}