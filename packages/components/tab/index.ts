import { withInstall } from '~/composables'
import Tab from './index.vue'
import TabItem from './TabItem.vue'
import TabItemContextMenu from './TabItemContextMenu.vue'
import TabList from './TabList.vue'
import TabSelector from './TabSelector.vue'

export * from './types'

export const RTab = withInstall(Tab)
export const RTabItem = withInstall(TabItem)
export const RTabItemContextMenu = withInstall(TabItemContextMenu)
export const RTabList = withInstall(TabList)
export const RTabSelector = withInstall(TabSelector)
export default RTab
