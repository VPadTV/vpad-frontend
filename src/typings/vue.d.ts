import "vue";
import { callAPI } from '../infrastructure/api/index.js'
declare module "vue" {
  import { callAPI } from '../infrastructure/api/index.js'

  export interface ComponentCustomProperties {
    $fetch: typeof callAPI
  }
}
declare module "*.vue" {
  global {
    const $fetch: typeof callAPI
  }
}


