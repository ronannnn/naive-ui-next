import type { SFCWithInstall } from '~/src/composables'
import { withInstall } from '~/src/composables'
import TableOrderQuery from './index.vue'

export * from './item'
export * from './newer'
export * from './types'

export const RTableOrderQuery: SFCWithInstall<typeof TableOrderQuery> = withInstall(TableOrderQuery)
export default RTableOrderQuery
