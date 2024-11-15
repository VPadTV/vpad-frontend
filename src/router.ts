import { createRouter, createWebHistory } from 'vue-router'
import sharedRoutes from '@shared/router'
import authenticationRoutes from '@modules/authentication/routes'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [...sharedRoutes, ...authenticationRoutes]
})

export default router
