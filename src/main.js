import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'vant/lib/index.css'
import SvgIcon from '@/components/SvgIcon/index.vue'
import { sayhi } from '@/pubilc/utils'
import { Button, Icon, AddressList } from 'vant'

sayhi()
const app = createApp(App)

app.use(Button).use(Icon).use(AddressList)
app.component('SvgIcon', SvgIcon)
/**
 * https://github.com/vuejs/rfcs/blob/master/active-rfcs/0009-global-api-change.md#provide%E2%80%93inject
*/
app.use(router).mount('#app')
