import Vue from 'vue'
import VueRouter from 'vue-router'
import Master from "../layouts/Master";
import Dashboard from "../views/Dashboard/Dashboard";

Vue.use(VueRouter)

const routes = [
    {
        path: '',
        component: Master,
        children: [
            {
                path: 'dashboard',
                component: Dashboard
            }
        ]
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
