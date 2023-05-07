
export function loginSuccess(username, keyReLogin) {
    return {
        type: 'LOGIN_SUCCESS',
        payload: {
            username,
            keyReLogin,
        },
    };
}
export function saveListChat(chats) {
    return {
        type: 'SAVE_LIST_CHATS',
        payload: chats,
    }
}