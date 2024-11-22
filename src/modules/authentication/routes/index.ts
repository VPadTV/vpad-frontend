import type { RouteRecordRaw } from 'vue-router'

const router: RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/LoginView.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/RegisterView.vue')
    },
    {
        path: '/logout',
        name: 'logout',
        component: () => import('../views/LogoutView.vue')
    }
] as const

export default router
