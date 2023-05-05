
export function loginSuccess(username, keyReLogin) {
    return {
        type: 'LOGIN_SUCCESS',
        payload: {
            username,
            keyReLogin,
        },
    };
}