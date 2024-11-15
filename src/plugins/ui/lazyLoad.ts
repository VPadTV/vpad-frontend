import type { App } from 'vue'
import VueLazyLoad from 'vue3-lazyload'

export function addLazyLoadDependencies(app: App) {
  app.use(VueLazyLoad, {})
}
