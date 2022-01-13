import Vue from 'vue'
import App from './App.vue'

export const EventBus = new Vue();


import VueRouter from 'vue-router'
import routers from './routes'

import "@frontend/css/font-awesome.min.css"
import "@frontend/css/bootstrap.min.css"
import "@frontend/css/custom.css"
import "@frontend/css/admin.css"
import VueClipboard from 'vue-clipboard2'

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

Vue.use(VueClipboard)
Vue.use(Toast, {});
Vue.use(require('vue-moment'));
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
