import { createApp } from 'vue'
import App from './App.vue'

import '@fortawesome/fontawesome-free/css/all.css'
import my_router from '@/router/index'
import { keyStore, store } from './store'

createApp(App)
    .use(my_router)
    .use(store, keyStore)
    .mount('#app')
