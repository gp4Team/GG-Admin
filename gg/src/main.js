// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/commen.scss'
import './styles/animate.css'
import './styles/style.scss'
import '@/assets/css/animate.css'
import './directives/v_focus'

Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
