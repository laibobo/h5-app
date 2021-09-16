import router, { constRoutes } from '@/router'
import { getToken } from '@/pubilc/auth.js'
import store from '../store'

const hasWhiteList = (to) => constRoutes.filter(f => f.name === to.name).length > 0

router.beforeEach(async(to, from, next) => {
  /**
   * 1, 没有登录
   *    a: 没有登录。访问的路由是否存在于白名单中
   *    b: 没有登录并且不是在白名单中，则跳转到登录页
   * 2，已登录
   *   a：如果当前访问的是login, 则跳转到首页
   *   b: 访问的路由是否存在于白名单中
   *   c: 获取权限信息、动态添加路由
  */
  const hasToken = getToken()
  if(hasToken){
    if(to.name === 'Login'){
      next('/')
    } else if(hasWhiteList(to)){
      next()
    } else {
      const hasPermissionIdents = store.getters.permissionIdents && store.getters.permissionIdents.length > 0
      // eslint-disable-next-line no-constant-condition
      if(!hasPermissionIdents){
        try {
          const { permissionIdents } = await store.dispatch('getUserInfo')
          const accessRoutes = await store.dispatch('generateRoutes', permissionIdents)
          for(const route of accessRoutes){
            router.addRoute(route)
          }
          next({ ...to, replace: true })
        } catch (error){
          await store.dispatch('logout')
          next(`/login?redirect=${to.path}`)
        }
      } else {
        const route = store.getters.permissionIdents.find(f => f.routeName === to.name)
        let btns = []
        if(route && route.btns){
          btns = route.btns
        }
        store.commit('SET_PermissionBtns', btns)
        next()
      }
    }
  } else if(hasWhiteList(to)){
    next()
  } else {
    next(`/login?redirect=${to.path}`)
  }
})
