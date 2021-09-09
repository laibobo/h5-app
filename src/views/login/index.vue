<template>
  <div class="login-container">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="username"
          placeholder="用户名"
          :maxlength="18"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { login } from '@/api/index.js'
import { Toast } from 'vant'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup(){
    const username = ref('')
    const onSubmit = () => {
      login({ username: username.value }).then(({ code, msg }) => {
        if(code === 0){
          Toast(msg)
        } else {
          useRouter().router.push('/')
        }
      })
    }

    return {
      username,
      onSubmit
    }
  }
})
</script>
<style lang="scss" scoped>
.login-container {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>
