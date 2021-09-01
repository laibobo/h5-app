import { reactive, onMounted, onUnmounted } from 'vue'

const useElementPosition = (elementRef, eventType) => {
  const elementPosition = reactive({
    x: 0,
    y: 0,
    offsetX: 0,
    offsetY: 0
  })

  function handler(event){
    elementPosition.x = event.clientX || event.pageX
    elementPosition.y = event.clientY || event.pageY
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
