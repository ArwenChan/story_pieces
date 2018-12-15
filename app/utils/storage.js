export function getCookie(name) {
    let arr = document.cookie.match(
        new RegExp('(^| )' + name + '=([^;]*)(;|$)'))
    if (arr != null) {
        return unescape(arr[2])
    }
    return
}

/**
 *
 *
 * @param {string} name
 * @param {string} value
 * @param {int} expires:单位秒
 * @param {string} path
 * @param {string} domain
 */
export function setCookie(name, value, expires) {
    let exp = new Date()
    exp.setTime(exp.getTime() + expires * 1000)
    let domain = document.domain
    let path = '/'
    document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString() +
    ';path=' + path + ';domain=' + domain + ';'
}

// 删除cookie
export function delCookie(name) {
    let exp = new Date()
    exp.setTime(exp.getTime() - 1)
    let value = getCookie(name)
    if (value != null) {
        document.cookie = name + '=' + escape(value) + ';expires=' +
        exp.toGMTString() + ';'
    }
}

export class Storage {
    constructor(method) {
        this.method = method
    }
    set(key, value) {
        window[this.method].setItem(key, JSON.stringify(value))
    }
    get(key) {
        return JSON.parse(window[this.method].getItem(key))
    }
    remove(key) {
        window[this.method].removeItem(key)
    }
    clear() {
        window[this.method].clear()
    }
}