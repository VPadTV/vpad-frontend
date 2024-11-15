import type { RouteRecordRaw } from 'vue-router'

const router: RouteRecordRaw[] = [
    {
        path: '/user/:userId',
        name: 'userId',
        component: () => import('../views/UserView.vue')
    }
] as const

export default router
