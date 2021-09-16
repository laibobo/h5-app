import { login, getUserInfo } from '@/api'
import { getToken, saveToken, removeToken } from '@/pubilc/auth.js'

export default {
  state: {
    permissionIdents: [],
    permissionBtns: [],
    user: {}
  },
  mutations: {
    SET_UserInfo(state, payload){
      state.user = payload
    },
    SET_Permission(state, payload){
      state.permissionIdents = payload
    },
    SET_PermissionBtns: (state, btns) => {
      state.permissionBtns = btns
    }
  },
  actions: {
    userLogin({ commit }, username){
      return new Promise((resolve, reject) => {
        login({ username }).then(result => {
          const { code, data } = result
          if(code === 1){
            saveToken(data)
          }
          resolve(result)
        }).catch(error => {
          reject(error)
        })
      })
    },
    logout({ commit }){
      commit('SET_UserInfo', {})
      commit('SET_Permission', [])
      removeToken()
    },
    getUserInfo({ commit, state }){
      return new Promise((resolve, reject) => {
        getUserInfo({ token: getToken() }).then(response => {
          if(response.code !== 1){
            resolve('验证失败，请重新登录')
          }
          const { data } = response
          const { user, permissionIdents } = data

          commit('SET_Permission', permissionIdents)
          commit('SET_UserInfo', user)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
