import type { App } from 'vue'
import { components } from './src/index'

export * from './src/composables'
export * from './src/index'

export default {
  install: (app: App) => {
    components.forEach((item) => {
      if (item.install!) {
        app.use(item)
      }
      else if (item.name) {
        app.component(item.name, item)
      }
    })
  },
}
