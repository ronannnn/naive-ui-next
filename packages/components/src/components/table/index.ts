import { withInstall } from '~/src/composables'
import Table from './index.vue'

export * from './column-setting'
export * from './header-operations'
export * from './query'
export * from './row-expand'
export * from './types'

export const RTable = withInstall(Table)
export default RTable
