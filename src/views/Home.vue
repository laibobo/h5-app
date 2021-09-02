<template>
  <div>
    <img :src="require('@/assets/images/weather.png')" />
    <div class="ln"></div>
    <van-button type="primary" size="large">大号按钮1</van-button>
    <van-icon name="chat-o" />
    <van-icon name="chat-o" />
    <nav class="nav-list">
      <a class="nav-item" href="">
        <svg-icon iconName="love" />我的
      </a>
      <a class="nav-item primary" href="">
        <svg-icon iconName="crown" />首页
      </a>
    </nav>
  </div>
  <div class="element-position" ref="elementPositionRef">
    <div>x: {{ elementPosition.value.x }}</div>
    <div>y: {{ elementPosition.value.y }}</div>
    <div>offsetX: {{ elementPosition.value.offsetX }}</div>
    <div>offsetY: {{ elementPosition.value.offsetY }}</div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue'
import _ from 'lodash'
import useElementPosition from '../hooks/useElementPosition.js'
export default defineComponent({
  setup(){
    const data = _.head([1, 2, 3])
    console.log('data', data)
    const elementPositionRef = ref(null)
    const elementPosition = reactive({})

    elementPosition.value = useElementPosition(elementPositionRef, 'click')
    return {
      elementPositionRef,
      elementPosition
    }
  }
})
</script>
<style lang="scss" scoped>
.element-position {
  position: fixed;
  bottom: 100px;
  left: 50px;
  width: 200px;
  height: 200px;
  color: red;
  border: 1px solid red;
}

.ln {
  width: 500px;
  height: 400px;
  background: url("@/assets/images/ln.webp");
}

.nav-list {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  width: 750px;
  height: 80px;

  .nav-item {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 14px;
    color: #565656;
    background-color: #fff;
    border: 1px solid #ccc;
    border-right: none;
    border-left: none;

    .svg-icon {
      margin-right: 10px;
      font-size: 32px;
    }

    &.primary {
      color: #fff;
      background-color: #1989fa;
      border-color: #1989fa;
    }
  }
}
</style>
