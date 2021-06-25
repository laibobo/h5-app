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
        console.log('process.env.VUE_APP_NAME:', process.env.VUE_APP_NAME)
    }
})
</script>
<style lang="scss">
body{
    font-size: 12px;
}
#app{
    background: blue;
    display: flex;
}
</style>