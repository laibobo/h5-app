export default (app) => {
  app.directive('permission', {
    beforeMount(el, binding){
      if(binding.value){
        const hasPermission = [].includes(binding.value)
        if(!hasPermission){
          el.parentNode && el.parentNode.removeChild(el)
        }
      }
    }
  })
}
