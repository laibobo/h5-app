<template>
  <div>
    home
  <van-grid square>
    <van-grid-item v-for="(item, index) in navList" :key="index" :icon="item.icon" :text="item.name" :to="item.url" />
  </van-grid>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup(){
    const navList = ref([{
      name: '介绍',
      url: '/introduce',
      icon: 'envelop-o'
    }, {
      name: '文章',
      url: '/article',
      icon: 'records'
    }])
    return {
      navList
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
