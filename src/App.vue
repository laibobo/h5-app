<template>
  <div>
    <div>HI app</div>
    <router-view />
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
<style lang="scss">
body {
  font-size: 56px;
}

#app {
  position: absolute;
  display: flex;
  width: 200px;
  color: #fff;
  background: chartreuse;
}

@font-face {
  font-family: "webfont";
  font-display: swap;
  src: url('assets/fonts/webfont.otf'); /* IE9 */
}

.web-font {
  font-family: webfont;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
