// import * as Sentry from '@sentry/browser'

const Sentry = window.Sentry
class Log {
    getUserScope() {
        const user = window.WebApp.$store.getters.getUserInfo
        if (user.id) {
            return user
        }
        return null

    }
    info(message) {
        Sentry.captureMessage(message, 'info')
    }
    error(errorObject, extra = {}) {
        const user = this.getUserScope()
        if (user) {
            Sentry.withScope(scope => {
                scope.setUser({
                    id: user.id,
                    username: user.nickname
                })
                scope.setExtra('extra', extra)
                Sentry.captureException(errorObject)
            })
        }
        else {
            Sentry.withScope(scope => {
                scope.setExtra('extra', extra)
                Sentry.captureException(errorObject)
            })
        }
    }
}

export default {
    /**
     * 日志记录插件
     * @param {*} Vue
     * @param {Object} options
     */
    install(Vue, options = {}) {
        const environ = process.env.NODE_ENV === 'production' ? 'prod' : 'dev'
        Sentry.init({
            dsn: 'https://c565bc19b7354293825f402ce958ddc6@sentry.io/1327653',
            environment: environ,
            integrations: [
                new Sentry.Integrations.Vue({ Vue }),
                new Sentry.Integrations.GlobalHandlers({
                    onunhandledrejection: false
                })
            ],
        })
        Vue.prototype.$log = new Log()
    }
}