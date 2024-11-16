import '@assets/style/main.scss'
import "ant-design-vue/dist/reset.css";

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import { addUIDependencies } from './plugins/ui'

const app = createApp(App)

addUIDependencies(app)

app.use(router)
app.mount('#app')
