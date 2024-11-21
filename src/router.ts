import { createRouter, createWebHistory } from 'vue-router'
import { getUserAuth } from '@modules/authentication/composables'
import sharedRoutes from '@shared/router'
import authenticationRoutes from '@modules/authentication/routes'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [...sharedRoutes, ...authenticationRoutes]
})
router.beforeResolve(async (to, from, next) => {
    const user = await getUserAuth()
    if(to.meta.loggedIn && !user) {
        next({name: "login"})
    } else {
        next()
    }
})
export default router
