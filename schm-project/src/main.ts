import './assets/main.css'
import * as bootstrap from 'bootstrap/dist/js/bootstrap.bundle'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.provide('bootstrap', bootstrap)

app.use(createPinia())
app.use(router)

app.mount('#app')
