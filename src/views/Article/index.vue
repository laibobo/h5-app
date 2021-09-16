<template>
    <!-- 文章 -->
    <div>文章
      <van-button type="success" v-permission="'add'">新增</van-button>
      <van-button type="warning" v-permission="'edit'">编辑</van-button>
      <van-button type="primary" v-permission="'lock'">查看</van-button>
    </div>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  setup(){
    return {}
  }
})
</script>
