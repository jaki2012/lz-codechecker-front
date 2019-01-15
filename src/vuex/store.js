import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Store 应为大写
export default new Vuex.Store({
    state: {
        login: false
    },
    mutations: {
        login(state) {
            state.login = true;
        },
        logout(state) {
            state.login = false;
        }
    }
})