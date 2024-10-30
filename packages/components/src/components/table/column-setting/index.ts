import type { SFCWithInstall } from '~/src/composables'
import { withInstall } from '~/src/composables'
import TableColumnSetting from './index.vue'
import TableColumnSettingItem from './item.vue'

export * from './types'

export const RTableColumnSetting: SFCWithInstall<typeof TableColumnSetting> = withInstall(TableColumnSetting)
export const RTableColumnSettingItem: SFCWithInstall<typeof TableColumnSettingItem> = withInstall(TableColumnSettingItem)
export default RTableColumnSetting
