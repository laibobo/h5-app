import { createRouter, createWebHistory } from 'vue-router'

/**
 * { path: '/:pathMatch(.*)', component: NotFoundComponent }
*/
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/index.vue')
    }
  ]
})

export default router
