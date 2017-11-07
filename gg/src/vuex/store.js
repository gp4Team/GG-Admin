import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        userInfo: {
            username: '',
            userId:''
        }
    },
    mutations: {
        saveUserInfo(state,payload) { //payload 形参
            state.userInfo.username = payload.username
            state.userInfo.userId = payload.userId
        }
    }
})
export default store