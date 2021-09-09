<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  setup(){
  }
})
</script>
<style lang="scss">
#app {
  font-size: 12px;
}

@font-face {
  font-family: "webfont";
  font-display: swap;
  src: url('assets/fonts/webfont.otf');
}

.web-font {
  font-family: webfont;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
