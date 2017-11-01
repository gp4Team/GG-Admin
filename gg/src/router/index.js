import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/index'
import Banners from "../views/Index/Banners.vue"
import MainClass from '../views/Index/MainClass.vue'
import AdminRole from "../views/role/adminRole.vue"
import OrginRole from '../views/role/orginRole.vue'
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
        },
        {
          path: 'Role/adminRole',
          name: 'adminRole',
          component: AdminRole
        },
        {
          path: 'Role/orginRole',
          name: 'orginRole',
          component: OrginRole
        }
      ]
    }
  ]
})
