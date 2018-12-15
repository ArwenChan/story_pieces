import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Iview from 'Components/iviewComponents'
import VueResource from 'vue-resource'
import store from './store'
import Raven from 'Filters/raven'

Vue.use(Iview)
Vue.use(VueResource)
Vue.use(Raven)

window.WebApp = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})

window.addEventListener('unhandledrejection', event => {
    // Prevent error output on the console:
    event.preventDefault()
    console.info('Reason: ' + event.reason)
})
