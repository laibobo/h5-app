import { createApp } from 'vue'
import router from './router';

const vm = createApp()
vm.use(router).mount('#app')
