import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        userInfo: {
            username: ''
        }
    },
    mutations: {
        saveUserInfo(state,payload) { //payload 形参
            state.userInfo.username = payload
        }
    }
})
export default store