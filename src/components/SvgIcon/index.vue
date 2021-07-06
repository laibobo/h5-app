<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="iconHref" />
  </svg>
</template>
<script>
import '@/components/SvgIcon/index.js'
import { defineComponent, computed } from 'vue'
export default defineComponent({
  props: {
    iconName: {
      type: String,
      required: true
    }
  },
  setup(props){
    const iconHref = computed(() => `#icon-${props.iconName}`)
    return {
      iconHref
    }
  }
})
</script>
<style lang="css" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
}
</style>
