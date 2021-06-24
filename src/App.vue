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
body{
    font-size: 56px;
}
#app{
    background: chartreuse;
    display: flex;
}
</style>