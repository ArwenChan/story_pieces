import Vue from 'vue'
import Vuex from 'vuex'
import globalUse from './modules/global'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        globalUse,     // 共用
    }
})
