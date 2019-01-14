import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/Login'
import external from '@/components/External'
import managed from '@/components/Managed'
import analyze from '@/components/Analyze'

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
            path: '/analyze',
            name: 'analyze',
            component: analyze,
            children: [{
                path: 'external',
                name: 'external',
                component: external
            },
            {
                path: 'managed',
                name: 'managed',
                component: managed
            }]
        }
    ]
})