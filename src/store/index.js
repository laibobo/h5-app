import { createStore } from 'vuex'

export default createStore({
  state: {
    pageBtns: [],
    token: localStorage.getItem('token') || ''
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
  getters: {
  }
})
