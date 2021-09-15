import { login } from '@/api'
import { getToken, saveToken, removeToken } from '@/pubilc/auth.js'

export default {
  state: {
    token: getToken(),
    permission: [],
    user: {}
  },
  mutations: {
    SET_UserInfo(state, payload){
      state.user = payload
    },
    SET_Permission(state, payload){
      state.permission = payload
    }
  },
  actions: {
    login({ commit }, username){
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
    }

  }
}
