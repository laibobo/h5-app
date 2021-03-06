import { createStore } from 'vuex'

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  getters: {
    permissionIdents: state => state.user.permissionIdents,
    permissionBtns: state => state.user.permissionBtns
  },
  modules
})
