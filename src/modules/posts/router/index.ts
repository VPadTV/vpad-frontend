import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/post',
    name: 'post',
    children: [
      {
        path: '/post/:postId',
        name: 'postId',
        component: () => import('../views/PostView.vue')
      },
      {
        path: '/post/create',
        name: 'createPost',
        component: () => import('../views/CreatePostView.vue')
      }
    ]
  }
] as const

export default routes
