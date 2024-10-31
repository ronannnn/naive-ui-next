import type { App } from 'vue'
import * as components from './components'
import 'uno.css'

export * from './components'
export * from './composables'

export const componentArr = [
  components.RDropdownButton,
  components.RPopselectButton,
  components.RPopconfirmButton,
  components.RDnd,
  components.RHoverContainer,
  components.RSimpleLayout,
  components.RScroll,
  components.RSelect,
  components.RTab,
  components.RTabItem,
  components.RTabList,
  components.RTabSelector,
  components.RTabItemContextMenu,
  components.RTableColumnSetting,
  components.RTableColumnSettingItem,
  components.RTableHeaderOperations,
  components.RTableOrderQuery,
  components.RTableOrderQueryItem,
  components.RTableOrderQueryNewer,
  components.RTableWhereQuery,
  components.RTableWhereQueryAsyncSelect,
  components.RTableWhereQueryDatePicker,
  components.RTableWhereQueryDateRangePicker,
  components.RTableWhereQueryInput,
  components.RTableWhereQueryItem,
  components.RTableWhereQuerySelect,
  components.RTableLabelValueRender,
  components.RTable,
]

export default {
  install: (app: App) => {
    componentArr.forEach((item) => {
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
    RDropdownButton: typeof components.RDropdownButton
    RPopselectButton: typeof components.RPopselectButton
    RPopconfirmButton: typeof components.RPopconfirmButton
    RDnd: typeof components.RDnd
    RHoverContainer: typeof components.RHoverContainer
    RSimpleLayout: typeof components.RSimpleLayout
    RScroll: typeof components.RScroll
    RSelect: typeof components.RSelect
    RTab: typeof components.RTab
    RTabItem: typeof components.RTabItem
    RTabList: typeof components.RTabList
    RTabSelector: typeof components.RTabSelector
    RTabItemContextMenu: typeof components.RTabItemContextMenu
    RTableColumnSetting: typeof components.RTableColumnSetting
    RTableColumnSettingItem: typeof components.RTableColumnSettingItem
    RTableHeaderOperations: typeof components.RTableHeaderOperations
    RTableOrderQuery: typeof components.RTableOrderQuery
    RTableOrderQueryItem: typeof components.RTableOrderQueryItem
    RTableOrderQueryNewer: typeof components.RTableOrderQueryNewer
    RTableWhereQuery: typeof components.RTableWhereQuery
    RTableWhereQueryAsyncSelect: typeof components.RTableWhereQueryAsyncSelect
    RTableWhereQueryDatePicker: typeof components.RTableWhereQueryDatePicker
    RTableWhereQueryDateRangePicker: typeof components.RTableWhereQueryDateRangePicker
    RTableWhereQueryInput: typeof components.RTableWhereQueryInput
    RTableWhereQueryItem: typeof components.RTableWhereQueryItem
    RTableWhereQuerySelect: typeof components.RTableWhereQuerySelect
    RTableLabelValueRender: typeof components.RTableLabelValueRender
    RTable: typeof components.RTable
  }
}
