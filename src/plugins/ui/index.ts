import { addToastDependencies } from './toast'
import { addLazyLoadDependencies } from './lazyLoad'
import Antd from "ant-design-vue";
import type { App } from 'vue'

export function addUIDependencies(app: App) {
  addLazyLoadDependencies(app)
  addToastDependencies(app)
  app.use(Antd)
}
