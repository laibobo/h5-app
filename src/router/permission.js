import router, { constRoutes } from '@/router'
import { getToken } from '@/pubilc/auth.js'
// import store from '../store'

router.beforeEach((to, from, next) => {
  /**
   * 1, 没有登录
   *    a: 没有登录。访问 constRoutes（免登录） 的路由
   *    b: 没有登录并且不是 constRoutes 的路由，则跳转到登录页
   * 2，已登录
   *   a：如果当前访问的是login, 则跳转到首页
   *   b: 获取权限信息
   *     token 失效 => 更新token
   *     token 有效 => 验证是否有访问该页面的权限
  */
  const hasToken = getToken()
  if(hasToken){
    if(to.name === 'Login'){
      next('/')
    } else {
      next()
    }
  } else if(constRoutes.filter(f => f.name === to.name).length > 0 || to.name === 'NotFound'){
    next()
  } else {
    next(`/login?redirect=${to.path}`)
  }
})
