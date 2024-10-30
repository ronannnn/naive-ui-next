import type { SFCWithInstall } from '~/src/composables'
import { withInstall } from '~/src/composables'
import TableLabelValueRender from './LabelValueRender.vue'

export * from './types'

export const RTableLabelValueRender: SFCWithInstall<typeof TableLabelValueRender> = withInstall(TableLabelValueRender)
export default RTableLabelValueRender
