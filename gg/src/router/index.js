import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/index'
import Banners from "../components/Index/Banners.vue"
import MainClass from '../components/Index/MainClass.vue'
import Login from '@/login'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [
        {
          path: 'Index/Banners',
          name: 'banners',
          component: Banners
        },
        {
          path: 'Index/MainClass',
          name: 'mainClass',
          component: MainClass
        }
      ]
    }
  ]
})
