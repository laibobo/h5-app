import { reactive, onMounted, onUnmounted } from 'vue'
/**
 * 获取元素的相对（绝对）位置
 * @param { HTMLElement } elementRef 元素
 * @param { String } eventType 事件类型
 * @param { Boolean } isGetAbsolute 是否获取绝对定位
 * @returns { Object }
*/
const useElementPosition = (elementRef, eventType, isGetAbsolute = false) => {
  const elementPosition = reactive({
    x: 0,
    y: 0,
    offsetX: 0,
    offsetY: 0
  })

  function handler(event){
    if(isGetAbsolute){
      const scrollX = document.documentElement.scrollLeft || document.body.scrollLeft
      const scrollY = document.documentElement.scrollTop || document.body.scrollTop
      elementPosition.x = (event.clientX || event.pageX) + scrollX
      elementPosition.y = (event.clientY || event.pageY) + scrollY
    } else {
      elementPosition.x = event.clientX || event.pageX
      elementPosition.y = event.clientY || event.pageY
    }
    elementPosition.offsetX = event.offsetX
    elementPosition.offsetY = event.offsetY
  }
  onMounted(() => {
    elementRef.value.addEventListener(eventType, handler)
  })
  onUnmounted(() => {
    elementRef.value.removeEventListener(eventType, handler)
  })

  return elementPosition
}
export default useElementPosition
