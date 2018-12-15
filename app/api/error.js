const exceptions = {
    403: '请求需要登陆',
    404: '请求找不到',
    429: '请求过于频繁',
}

export class UserException extends Error {
    constructor(name) {
        let message = ''
        if (exceptions[name]) {
            message = exceptions[name]
        }
        else {
            message = '未知错误'
        }
        super(message)
        this.name = name
    }
}