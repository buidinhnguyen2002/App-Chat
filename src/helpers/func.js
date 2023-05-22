function validatePassword(password1 = '', password2 = password1) {
    if(password1.trim().length<=0){
        return 'Password is not empty'
    }

    if (password1 !== password2) {
        return 'Password is not match'
    }
    return null
}
function validateUser(username) {
    const regex = /^[0-9\-\+]{8,10}$/
    if (!regex.test(username)) {
        return "Plase type your student id"
    }
    return null
}

export { validatePassword, validateUser }
