import './assets/style/main.scss'
import "vue-toastification/dist/index.css";

import Toast, { POSITION, type PluginOptions } from "vue-toastification";

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

const toastOptions: PluginOptions = {
    maxToasts: 5,
    position: POSITION.TOP_CENTER
}
const app = createApp(App)

app.use(router)
app.use(Toast, toastOptions)
app.mount('#app')