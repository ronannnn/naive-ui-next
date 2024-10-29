import type { App } from 'vue'
import type { SFCWithInstall } from '~/src/composables'
import * as components from './src/index'

export * from './src/composables'
export * from './src/index'

export default {
  install: (app: App) => {
    for (const c in components) {
      app.use((components as SFCWithInstall<any>)[c])
    }
  },
}
