import { TOGGLE_POPUP, CHANGE_POPUP, LOGIN, LOGOUT, REFRESH_USER } from '../mutation-types'
import { check_login, getUserStorage } from 'Api/user'


const state = {
    showPopup: false,
    popupType: 'login',
    hasLogin: check_login(),
    userInfo: getUserStorage(),
}

const mutations = {
    [TOGGLE_POPUP](state) {
        if (state.showPopup) {
            state.showPopup = false
        }
        else {
            state.showPopup = true
        }
    },
    [CHANGE_POPUP](state, type) {
        state.popupType = type
    },
    [LOGIN](state) {
        state.hasLogin = true
    },
    [LOGOUT](state) {
        state.hasLogin = false
    },
    [REFRESH_USER](state, new_user) {
        state.userInfo = new_user
    }
}

const getters = {
    getUserInfo(state) {
        if (!state.hasLogin) {
            return {}
        }
        else {
            return state.userInfo ? state.userInfo : {}
        }
    }
}

const actions = {}

export default {
    state,
    mutations,
    getters,
    actions
}