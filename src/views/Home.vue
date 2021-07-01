<template>
  <div class="div web-font">vue3 你好呀 哈哈哈</div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  setup(){
    const l = 123
    console.log(l)
  }
})
</script>
<style lang="scss" scoped>
.div {
  position: relative;
  font-size: 12px;
  color: #000;
}
</style>
