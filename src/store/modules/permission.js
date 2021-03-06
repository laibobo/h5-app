import { asyncRoutes, constRoutes } from '@/router'

/**
 * 确定当前用户是否具有权限
 * @param { Array } permissionIdents
 * @param { Object } route
 * @returns { boolean }
 */
function hasPermission(permissionIdents, route){
  if(route.name){
    return permissionIdents.some(item => item.routeName === route.name || item.routeName === 'NotFound')
  }
  return true
}

/**
 * 递归过滤异步路由表
 * @param { Array } routes asyncRoutes
 * @param { Array } permissionIdents
 * @returns { Array }
 */
export const filterAsyncRoutes = (routes, permissionIdents) => {
  const res = []
  routes.forEach(route => {
    const tmp = Array.isArray(route) ? route[0] : route
    if(hasPermission(permissionIdents, tmp)){
      if(tmp.children){
        tmp.children = filterAsyncRoutes(tmp.children, permissionIdents)
      }
      res.push(tmp)
    }
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_Routes: (state, routes) => {
    state.addRoutes = routes
    state.routes = routes.concat(constRoutes)
  }
}

const actions = {
  generateRoutes({ commit }, permissionIdents){
    return new Promise(resolve => {
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, permissionIdents)
      commit('SET_Routes', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  state,
  mutations,
  actions
}
