import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import SvgIcon from '@/components/SvgIcon/index.vue'
import installVant from '@/plugins/vant.js'
import '../mock/index'

const app = createApp(App)
installVant(app)
app.component('SvgIcon', SvgIcon)

/**
 * https://github.com/vuejs/rfcs/blob/master/active-rfcs/0009-global-api-change.md#provide%E2%80%93inject
*/
app.use(router).mount('#app')
