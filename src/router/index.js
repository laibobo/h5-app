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
    }
  ]
})

export default router
