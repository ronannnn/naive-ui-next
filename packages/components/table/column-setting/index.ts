import { withInstall } from '~/composables'
import TableColumnSetting from './index.vue'
import TableColumnSettingItem from './item.vue'

export * from './types'

export const RTableColumnSetting = withInstall(TableColumnSetting)
export const RTableColumnSettingItem = withInstall(TableColumnSettingItem)
export default RTableColumnSetting
