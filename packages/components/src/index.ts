import type { App } from 'vue'
import { RDropdownButton } from './components/buttons'
import { RDnd } from './components/dnd'
import 'uno.css'

export * from './components'
export * from './composables'

export const components = [
  RDnd,
  RDropdownButton,
]

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

declare module 'vue' {
  export interface GlobalComponents {
    RDnd: typeof RDnd
    RDropdownButton: typeof RDropdownButton
  }
}
