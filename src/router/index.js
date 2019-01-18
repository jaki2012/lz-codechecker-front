import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/Home'
import login from '@/components/Login'
import external from '@/components/External'
import managed from '@/components/Managed'
import analyze from '@/components/Analyze'
import task from '@/components/Task'
import taskInfo from '@/components/TaskInfo'
import sdpReport from '@/components/SDPReport'
import CheckProjectResult from '@/components/CheckProjectResult'
import OverviewList from '@/components/overview/OverviewList'
import IssuesMain from '@/components/issues/IssuesMain'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: home
        },
        // {
        //     path: '/',
        //     redirect: 'login'
        // },
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
        },
        {
            path: '/task',
            name: 'task',
            component: task
        },
        {
            path: '/task/:id',
            name: 'taskinfo',
            component: taskInfo,
        },
        {
            path: '/task/:id/sdpreport/',
            name: 'sdpreport',
            component: sdpReport
        },
        {
            path: '/task/:id/report',
            name: 'report',
            component: CheckProjectResult,
            children:[
                {
                    path:"overviewlist",
                    name:"overviewlist",
                    component:OverviewList

                },
                {
                    path:"issues",
                    name:"issues",
                    component:IssuesMain

                }
            ]
        }
    ]
})