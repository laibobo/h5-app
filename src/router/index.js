import { createRouter, createWebHistory } from 'vue-router'

export const constRoutes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/index.vue'),
    meta: {
      title: '登录'
    }
  }
]

export const asyncRoutes = [
  {
    path: '/article',
    name: 'Article',
    component: () => import('@/views/Article/index.vue'),
    meta: {
      title: '文章'
    }
  },
  {
    path: '/introduce',
    name: 'Introduce',
    component: () => import('@/views/Introduce/index.vue'),
    meta: {
      title: '介绍'
    }
  },
  {
    path: '/:pathMatch(.*)',
    name: 'NotFound',
    component: () => import('@/views/NotFound/index.vue'),
    meta: {
      title: '404'
    }
  }
]

export const resetRouter = () => {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: (to, from, savedPosition) => {
    let result = {}
    if(savedPosition){
      result = savedPosition
    } else {
      result = { x: 0, y: 0 }
    }
    return result
  },
  routes: constRoutes
})

export default router
