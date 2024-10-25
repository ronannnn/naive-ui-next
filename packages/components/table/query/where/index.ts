import { withInstall } from '~/composables'
import TableWhereQueryAsyncSelect from './AsyncSelect.vue'
import TableWhereQueryDatePicker from './DatePicker.vue'
import TableWhereQueryDateRangePicker from './DateRangePicker.vue'
import TableWhereQuery from './index.vue'
import TableWhereQueryInput from './Input.vue'
import TableWhereQueryItem from './Item.vue'
import TableWhereQuerySelect from './Select.vue'

export * from './types'

export const RTableWhereQueryAsyncSelect = withInstall(TableWhereQueryAsyncSelect)
export const RTableWhereQueryDatePicker = withInstall(TableWhereQueryDatePicker)
export const RTableWhereQueryDateRangePicker = withInstall(TableWhereQueryDateRangePicker)
export const RTableWhereQuery = withInstall(TableWhereQuery)
export const RTableWhereQueryInput = withInstall(TableWhereQueryInput)
export const RTableWhereQueryItem = withInstall(TableWhereQueryItem)
export const RTableWhereQuerySelect = withInstall(TableWhereQuerySelect)
export default RTableWhereQuery
