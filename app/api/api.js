import { http } from 'Filters/http'
import { getUri } from './paths'
import { TOGGLE_POPUP, CHANGE_POPUP, LOGOUT } from 'Store/mutation-types'
import { UserException } from './error'

export const api = {
    successHandler: (response, urlKey) => {
        let data = response.data
        // console.log(data)
        if (data.error_code !== '0') {
            window.WebApp.$message.error(data.error_message)
            return Promise.reject(data)
        }
        else {
            return Promise.resolve(data.result)
        }
    },

    errorHandler: (error, urlKey) => {
        let errorObj = new UserException(String(error.status))
        if (error.status === 403 && !window.WebApp.$store.state.globalUse.showPopup) {
            if (window.WebApp.$store.state.globalUse.hasLogin) {
                window.WebApp.$store.commit(LOGOUT)
            }
            if (window.WebApp.$route.meta.needAuth) {
                window.WebApp.$router.push('/hot/')
            }
            window.WebApp.$store.commit(CHANGE_POPUP, 'login')
            window.WebApp.$store.commit(TOGGLE_POPUP)
            // window.WebApp.$log.error(errorObj, error)
            return Promise.reject(errorObj)
        }
        else {
            window.WebApp.$log.error(errorObj, error)
            return Promise.reject(errorObj)
        }
    },

    handleUrl: function (urlKey, { pathParams }) {
        let url = getUri(urlKey)
        if (pathParams) {
            Object.keys(pathParams).forEach((key) => {
                url = url.replace(key, pathParams[key])
            })
        }
        // console.log(`url:${url}`)
        return url
    },

    get: (urlKey, data = {}) => {
        let url = api.handleUrl(urlKey, data)
        if (!url) {
            console.error(`url:${url} not found`)
            return
        }
        return http.get(url, data).then((response) => {
            return api.successHandler(response, urlKey)
        }, (error) => {
            return api.errorHandler(error, urlKey)
        })
    },

    post: (urlKey, data = {}) => {
        let url = api.handleUrl(urlKey, data)
        if (!url) {
            console.error(`url:${url} not found`)
            return
        }
        return http.post(url, data).then((response) => {
            return api.successHandler(response, urlKey)
        }, (error) => {
            return api.errorHandler(error, urlKey)
        })
    },

    put: (urlKey, data = {}) => {
        let url = api.handleUrl(urlKey, data)
        if (!url) {
            console.error(`url:${url} not found`)
            return
        }
        return http.put(url, data).then((response) => {
            return api.successHandler(response, urlKey)
        }, (error) => {
            return api.errorHandler(error, urlKey)
        })
    },

    delete: (urlKey, data = {}) => {
        let url = api.handleUrl(urlKey, data)
        if (!url) {
            console.error(`url:${url} not found`)
            return
        }
        return http.delete(url, data).then((response) => {
            return api.successHandler(response, urlKey)
        }, (error) => {
            return api.errorHandler(error, urlKey)
        })
    },

    patch: (urlKey, data = {}) => {
        let url = api.handleUrl(urlKey, data)
        if (!url) {
            console.error(`url:${url} not found`)
            return
        }
        return http.patch(url, data).then((response) => {
            return api.successHandler(response, urlKey)
        }, (error) => {
            return api.errorHandler(error, urlKey)
        })
    }
}