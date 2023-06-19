

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
export function updateChatPeople(newChats) {
    return {
        type: "UPDATE_CHAT_PEOPLE",
        payload: newChats,
    }
}
export function receiveChat(chat) {
    return {
        type: "RECEIVE_CHAT",
        payload: chat,
    }
}
export function receiveChatPeople(chat) {
    return {
        type: "RECEIVE_CHAT_PEOPLE",
        payload: chat,
    }
}
export function saveAllImage(images) {
    return {
        type: "SAVE_MY_IMAGES",
        payload: images,
    }
}
export function updateAvatar(nameChat, urlAvatar) {
    return {
        type: "UPDATE_GROUP_AVATAR",
        payload: {
            nameChat,
            urlAvatar,
        },
    }
}
export function updateGroupName(nameChat, nickName) {
    return {
        type: "UPDATE_GROUP_NAME",
        payload: {
            nameChat,
            nickName,
        },
    }
}
export function updatePeopleName(nameChat, nickName) {
    return {
        type: "UPDATE_PEOPLE_NAME",
        payload: {
            nameChat,
            nickName,
        },
    }
}
export function updateMyAvatar(name,urlAvatar) {
    return {
        type: "UPDATE_MY_AVATAR",
        payload: {
            name,
            urlAvatar,
        },
    }
}
export function savePeopleAvatar(peopleAvatars) {
    return {
        type: "SAVE_PEOPLE_AVATAR",
        payload: peopleAvatars,
    }
}
export function saveGroupAvatar(groupAvatars) {
    return {
        type: "SAVE_GROUP_AVATAR",
        payload: groupAvatars,
    }
}
export function addPeople(name) {
    return {
        type: "ADD_PEOPLE",
        payload: name,
    }
}
export function setInitChat() {
    return {
        type: "SET_INIT_CHAT",
        payload: null,
    }
}
export function clearCurrentChat() {
    return {
        type: "CLEAR_CURRENT_CHAT",
        payload: null,
    }
}
export function saveGroupName(listGroupName) {
    return {
        type: "SAVE_GROUP_NAME",
        payload: listGroupName,
    }
}
export function savePeopleNickName(listPeoplNickName) {
    return {
        type: "SAVE_PEOPLE_NICK_NAME",
        payload: listPeoplNickName,
    }
}
