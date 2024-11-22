import { addToastDependencies } from './toast'
import { addLazyLoadDependencies } from './lazyLoad'
import Antd from "ant-design-vue";
import * as AntIcons from "@ant-design/icons-vue";
import MasonryWall from "@yeger/vue-masonry-wall";
import type { App } from 'vue'

export function addUIDependencies(app: App) {
  addLazyLoadDependencies(app)
  addToastDependencies(app)
  for(let [k, T] of Object.entries(AntIcons))
    app.component(k, T)
  app.use(Antd)
  app.use(MasonryWall)
}
