import { api } from 'Api/api'
import { Storage, setCookie, getCookie, delCookie } from 'Utils/storage'
import { LOGOUT, LOGIN, REFRESH_USER } from 'Store/mutation-types'

const USER_STORE_KEY = 'ue'
const USER_LOGIN_COOKIE = 'gogo'
export const DEFAULT_AVATAR = 'http://pj5hr98xx.bkt.clouddn.com/user.png'

function setLoginCookie() {
    setCookie(USER_LOGIN_COOKIE, '1', 3600)
}

export function setUserStorage(user_info, commit = true) {
    let storage = new Storage('localStorage')
    storage.set(USER_STORE_KEY, user_info)
    if (commit) {
        window.WebApp.$store.commit(REFRESH_USER, user_info)
    }
}

export function getUserStorage() {
    let storage = new Storage('localStorage')
    return storage.get(USER_STORE_KEY)
}

export function check_login() {
    if (getCookie(USER_LOGIN_COOKIE)) {
        return true
    }
    return false
}

export function login(username, password) {
    let postData = {
        data: {
            'username': username,
            'password': password
        }
    }
    return api.post('login', postData).then(res => {
        setLoginCookie()
        setUserStorage(res)
        window.WebApp.$store.commit(LOGIN)
    })
}

export function register(username, password, nickname, verify_code, register_type = 'mobile') {
    let postData = {
        data: {
            username: username,
            password: password,
            nickname: nickname,
            register_type: register_type,
            verify_code: verify_code,
        }
    }
    return api.post('register', postData).then(res => {
        setLoginCookie()
        setUserStorage(res)
        window.WebApp.$store.commit(LOGIN)
    })
}

export function refresh_user_info() {
    return api.get('user_info').then(res => {
        setUserStorage(res)
        return res
    })
}

export function get_verify_code(phone, type) {
    let data = {
        query: { type: type },
        pathParams: { '{phone}': phone }
    }
    return api.post('get_verify_code', data)
}

export function logout() {
    if (check_login()) {
        api.post('user_logout').then(res => {
            delCookie(USER_LOGIN_COOKIE)
            window.WebApp.$store.commit(LOGOUT)
        })
    }
    window.WebApp.$store.commit(LOGOUT)
}

export function resetPassword(mobile, code, password) {
    let postData = {
        data: {
            mobile: mobile,
            verify_code: code,
            new_password: password,
        }
    }
    return api.post('reset_password', postData)
}

export function modifyPassword(oldPassword, newPassword) {
    let postData = {
        data: {
            old_password: oldPassword,
            new_password: newPassword
        }
    }
    return api.post('modify_password', postData).then(res => {
        delCookie(USER_LOGIN_COOKIE)
        window.WebApp.$store.commit(LOGOUT)
    })
}

export function checkPassword(password) {
    let postData = {
        data: {
            password: password
        }
    }
    return api.post('check_password', postData)
}

export function changeMobile(phone, code) {
    let postData = {
        data: {
            mobile: phone,
            verify_code: code
        }
    }
    return api.post('change_mobile', postData).then(res => {
        setUserStorage(res)
        return res
    })
}

export function changeUserInfo(newUserInfo) {
    let putData = {
        data: newUserInfo
    }
    return api.put('change_user_info', putData).then(res => {
        setUserStorage(res)
        return res
    })
}