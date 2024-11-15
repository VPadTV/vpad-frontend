import { addToastDependencies } from './toast'
import { addLazyLoadDependencies } from './lazyLoad'
import type { App } from 'vue'

export function addUIDependencies(app: App) {
  addLazyLoadDependencies(app)
  addToastDependencies(app)
}
