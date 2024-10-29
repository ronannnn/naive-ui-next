import type { SFCWithInstall } from '~/src/composables'
import { withInstall } from '~/src/composables'
import TableWhereQueryAsyncSelect from './AsyncSelect.vue'
import TableWhereQueryDatePicker from './DatePicker.vue'
import TableWhereQueryDateRangePicker from './DateRangePicker.vue'
import TableWhereQuery from './index.vue'
import TableWhereQueryInput from './Input.vue'
import TableWhereQueryItem from './Item.vue'
import TableWhereQuerySelect from './Select.vue'

export * from './types'

export const RTableWhereQueryAsyncSelect: SFCWithInstall<typeof TableWhereQueryAsyncSelect> = withInstall(TableWhereQueryAsyncSelect)
export const RTableWhereQueryDatePicker: SFCWithInstall<typeof TableWhereQueryDatePicker> = withInstall(TableWhereQueryDatePicker)
export const RTableWhereQueryDateRangePicker: SFCWithInstall<typeof TableWhereQueryDateRangePicker> = withInstall(TableWhereQueryDateRangePicker)
export const RTableWhereQuery: SFCWithInstall<typeof TableWhereQuery> = withInstall(TableWhereQuery)
export const RTableWhereQueryInput: SFCWithInstall<typeof TableWhereQueryInput> = withInstall(TableWhereQueryInput)
export const RTableWhereQueryItem: SFCWithInstall<typeof TableWhereQueryItem> = withInstall(TableWhereQueryItem)
export const RTableWhereQuerySelect: SFCWithInstall<typeof TableWhereQuerySelect> = withInstall(TableWhereQuerySelect)
export default RTableWhereQuery
