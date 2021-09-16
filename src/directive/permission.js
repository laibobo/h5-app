
import store from '../store'
export default (app) => {
  app.directive('permission', {
    mounted(el, binding){
      if(binding.value){
        const hasPermission = store.getters.permissionBtns.includes(binding.value)
        if(!hasPermission){
          el.parentNode && el.parentNode.removeChild(el)
        }
      }
    }
  })
}
