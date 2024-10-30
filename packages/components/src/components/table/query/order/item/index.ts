import type { SFCWithInstall } from '~/src/composables'
import { withInstall } from '~/src/composables'
import TableOrderQueryItem from './index.vue'

export * from './types'

export const RTableOrderQueryItem: SFCWithInstall<typeof TableOrderQueryItem> = withInstall(TableOrderQueryItem)
export default RTableOrderQueryItem
