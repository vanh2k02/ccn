import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
import routers from './routes'

import "@frontend/css/custom.css"
import "@frontend/css/admin.css"

Vue.use(VueRouter);

Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  routes: routers,
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
