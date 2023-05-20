
export function loginSuccess(username) {
    return {
        type: 'LOGIN_SUCCESS',
        payload: {
            username,
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
        type: 'SAVE_LIST_CHATS_ROOM',
        payload: chat,
    }
}
export function saveToListChatsPeople(chat) {
    return {
        type: 'SAVE_LIST_CHATS_PEOPLE',
        payload: chat,
    }
}
export function changeCurrentChat(nameChat, type) {
    return {
        type: "CHANGE_CURRENT_CHAT",
        payload: {
            nameChat: nameChat,
            type: type,
        }
    }
}
export function sendChat(nameChat, type, mes) {
    console.log(nameChat, 1, mes)
    return {
        type: "SEND_CHAT",
        payload: {
            nameChat: nameChat,
            type: type,
            mes: mes,
        }
    }
}
export function updateChat(newChats) {
    return {
        type: "UPDATE_CHATS",
        payload: newChats,
    }
}
export function receiveChat(chat) {
    return {
        type: "RECEIVE_CHAT",
        payload: chat,
    }
}

