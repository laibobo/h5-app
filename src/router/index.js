import VueRouter from "vue-router"

import Home from '../pages/Home.vue'

const router  = new VueRouter({
    routes: [{
        path: '/',
        name: 'Home',
        component: Home
    }]
})

export default router