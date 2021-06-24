import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

//https://github.com/vuejs/rfcs/blob/master/active-rfcs/0009-global-api-change.md#provide%E2%80%93inject
app.use(router).mount('#app')
