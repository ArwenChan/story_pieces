import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from 'Views/Home.vue'
import Hot from 'Views/Hot.vue'
import Mine from 'Views/Mine.vue'
import TopicDetail from 'Views/TopicDetail.vue'
import { TOGGLE_POPUP, CHANGE_POPUP } from 'Store/mutation-types'
import { check_login } from './api/user'

const Account = () => import(/* webpackChunkName: "account" */'Views/Account.vue')
const UserInfo = () => import(/* webpackChunkName: "account" */'Views/UserInfo.vue')
const ResetPassword = () => import(/* webpackChunkName: "account" */'Views/ResetPassword.vue')
const ModifyPassword = () => import(/* webpackChunkName: "account" */'Views/ModifyPassword.vue')
const ModifyPhone = () => import(/* webpackChunkName: "account" */'Views/ModifyPhone.vue')
const CreateGroup = () => import(/* webpackChunkName: "group" */'Views/CreateGroup.vue')
const GroupDetail = () => import(/* webpackChunkName: "group" */'Views/GroupDetail.vue')
const EditGroup = () => import(/* webpackChunkName: "group" */'Views/EditGroup.vue')
const GroupUsers = () => import(/* webpackChunkName: "group" */'Views/GroupUsers.vue')
const Write = () => import(/* webpackChunkName: "group" */'Views/Write.vue')
const GroupHome = () => import(/* webpackChunkName: "group" */'Views/GroupHome.vue')

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: { needAuth: false },
        beforeEnter: (to, from, next) => {
            if (to.path === '/') {
                next('/hot/')
            }
            else {
                next()
            }
        },
        children: [
            {
                path: 'hot/',
                component: Hot,
                name: 'hot',
                meta: { needAuth: false }
            },
            {
                path: 'mine/',
                component: Mine,
                name: 'mine',
                meta: { needAuth: true }
            },
            {
                path: 'create-group/',
                name: 'createGroup',
                component: CreateGroup,
                meta: { needAuth: true }
            },
            {
                path: 'group/home/',
                name: 'groupHome',
                component: GroupHome,
                meta: { needAuth: true }
            },
            {
                path: 'group/:id/',
                name: 'groupDetail',
                component: GroupDetail,
                meta: { needAuth: false }
            },
            {
                path: 'group/:id/update/',
                name: 'groupUpdate',
                component: EditGroup,
                meta: { needAuth: true }
            },
            {
                path: 'group/:id/members/',
                name: 'groupUsers',
                component: GroupUsers,
                meta: { needAuth: false }
            },
            {
                path: 'topic/:id/',
                name: 'topicDetail',
                component: TopicDetail,
                meta: { needAuth: false }
            }
        ],
    },
    {
        path: '/user/',
        name: 'user',
        component: Account,
        children: [
            {
                path: 'user-info/',
                component: UserInfo,
                name: 'userInfo',
                meta: { needAuth: true }
            },
            {
                path: 'reset-password/',
                component: ResetPassword,
                name: 'resetPassword',
                meta: { needAuth: false }
            },
            {
                path: 'modify-password/',
                component: ModifyPassword,
                name: 'modifyPassword',
                meta: { needAuth: true }
            },
            {
                path: 'modify-phone/',
                component: ModifyPhone,
                name: 'modifyPhone',
                meta: { needAuth: true }
            }
        ],
    },
    {
        path: '/group/:id/write/',
        name: 'write',
        component: Write,
        meta: { needAuth: true }
    }
]
const router = new VueRouter({
    routes,
})

router.onError()

router.beforeEach((to, from, next) => {
    if (to.meta.needAuth) {
        if (window.WebApp && !window.WebApp.$store.state.globalUse.hasLogin) {
            window.WebApp.$store.commit(CHANGE_POPUP, 'login')
            window.WebApp.$store.commit(TOGGLE_POPUP)
        }
        else if (!window.WebApp) {
            if (!check_login()) {
                next('/hot/')
            }
            else {
                next()
            }
        }
        else {
            next()
        }
    }
    else {
        next()
    }
})

export default router