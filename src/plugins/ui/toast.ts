import 'vue-toastification/dist/index.css'
import Toast, { POSITION, type PluginOptions } from 'vue-toastification'
import type { App } from 'vue'

const toastOptions: PluginOptions = {
  maxToasts: 5,
  position: POSITION.TOP_CENTER
}

export function addToastDependencies(app: App) {
  app.use(Toast, toastOptions)
}
