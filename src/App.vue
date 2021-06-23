<template>
    <div id="app">
        <div>HI app</div>
        <router-link />
    </div>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
    setup(){
        console.log('Hi app')
    }
})
</script>
<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>