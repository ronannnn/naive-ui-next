import type { SFCWithInstall } from '~/src/composables'
import { withInstall } from '~/src/composables'
import Tab from './index.vue'
import TabItem from './TabItem.vue'
import TabItemContextMenu from './TabItemContextMenu.vue'
import TabList from './TabList.vue'
import TabSelector from './TabSelector.vue'

export * from './types'

export const RTab: SFCWithInstall<typeof Tab> = withInstall(Tab)
export const RTabItem: SFCWithInstall<typeof TabItem> = withInstall(TabItem)
export const RTabItemContextMenu: SFCWithInstall<typeof TabItemContextMenu> = withInstall(TabItemContextMenu)
export const RTabList: SFCWithInstall<typeof TabList> = withInstall(TabList)
export const RTabSelector: SFCWithInstall<typeof TabSelector> = withInstall(TabSelector)
export default RTab
