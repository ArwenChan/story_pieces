import Vue from 'vue'
import { getCookie } from 'Utils/storage'
export const http = {
    exec: (method, url, params, data) => {
        let headers = {}
        if (!http.csrfSafeMethod(method)) {
            let token = getCookie('machao')
            if (token) {
                headers['zhouyu'] = token
            }
        }
        const options = {
            method,
            url,
            timeout: 38000,
            credentials: true,
            headers: headers,
        }
        options.params = params ? params : {}
        options.body = data ? data : {}
        return Vue.http(options)
    },

    get: (url, { query }) => {
        return query ? http.exec('get', url, query) : http.exec('get', url)
    },

    post: (url, { data, query }) => {
        return http.exec('post', url, query, data)
    },

    put: (url, { data, query }) => {
        return http.exec('put', url, query, data)
    },

    delete: (url, { data, query }) => {
        return http.exec('delete', url, query, data)
    },

    patch: (url, { data, query }) => {
        return http.exec('patch', url, query, data)
    },
    csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/i.test(method))
    }
}
