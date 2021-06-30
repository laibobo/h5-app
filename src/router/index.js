import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'

/**
 * { path: '/:pathMatch(.*)', component: NotFoundComponent }
*/
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
})

export default router
