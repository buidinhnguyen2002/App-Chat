export function setUserExist(isExist) {
    return {
        type: "SET_USER_EXIST",
        payload: isExist,
    }
}
export function setUserCheck(name) {
    return {
        type: "SET_USER_CHECK",
        payload: name,
    }
}
export function setError(error) {
    return {
        type: "SET_ERROR",
        payload: error,
    }
}