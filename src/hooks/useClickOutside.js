import { onMounted, onUnmounted, ref } from 'vue'

const useClickOutside = (elementRef) => {
  const isClickOutside = ref(false)

  function handler(event){
    isClickOutside.value = elementRef.value != null && !elementRef.value.contains(event.target)
  }

  onMounted(() => {
    document.addEventListener('click', handler)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })

  return isClickOutside
}

export default useClickOutside
