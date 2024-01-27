import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import PostView from '@/views/PostView.vue'
import UserView from '@/views/UserView.vue'
import WIPView from '@/views/WIPView.vue'
import ReloadOnRouteChange from '@/components/ReloadOnRouteChange.vue'
import PageNotFound from '@/views/PageNotFound.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/',
            component: ReloadOnRouteChange,
            children: [
                {
                    path: '/post/:postId',
                    name: 'postId',
                    component: PostView
                },
                {
                    path: '/user/:userId',
                    name: 'userId',
                    component: UserView
                },
            ]
        },
        {
            path: '/create',
            name: 'create',
            component: WIPView
        },
        {
            path: '/notifications',
            name: 'notifications',
            component: WIPView
        },
        {
            path: '/profile',
            name: 'profile',
            component: WIPView
        },
        { path: "/:catchAll(.*)", component: PageNotFound },
        // {
        //     path: '/about',
        //     name: 'about',
        //     // route level code-splitting
        //     // this generates a separate chunk (About.[hash].js) for this route
        //     // which is lazy-loaded when the route is visited.
        //     component: () => import('../views/AboutView.vue')
        // }
    ]
})

export default router
