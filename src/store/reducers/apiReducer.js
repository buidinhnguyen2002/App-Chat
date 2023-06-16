const initialState = {
    userCheck: null,
    isUserExist: null,
    error: null,
};
export default function apiReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_USER_EXIST': {
            return {
                ...state,
                isUserExist: action.payload,
            }
        }
        case 'SET_USER_CHECK': {
            return {
                ...state,
                userCheck: action.payload,
            }
        }
        case 'SET_ERROR': {
            return {
                ...state,
                error: action.payload,
            }
        }
        default:
            return state;
    }
}