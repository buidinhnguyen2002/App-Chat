
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
export function saveToListChatsDetail(chat) {
    return {
        type: 'SAVE_LIST_CHATS_DETAIL',
        payload: chat,
    }
}