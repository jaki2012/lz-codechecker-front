import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/Login'
import external from '@/components/External'

Vue.use(Router)

export default new Router({

    routes: [
        {
            path: '/',
            redirect: 'login'
        },
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/analyze/external',
            name: 'external',
            component: external
        }
    ]
})