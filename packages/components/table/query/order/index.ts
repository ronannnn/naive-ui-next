import { withInstall } from '~/composables'
import TableOrderQuery from './index.vue'

export * from './item'
export * from './newer'
export * from './types'

export const RTableOrderQuery = withInstall(TableOrderQuery)
export default RTableOrderQuery
