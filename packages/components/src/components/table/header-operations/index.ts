import type { SFCWithInstall } from '~/src/composables'
import { withInstall } from '~/src/composables'
import TableHeaderOperations from './index.vue'

export const RTableHeaderOperations: SFCWithInstall<typeof TableHeaderOperations> = withInstall(TableHeaderOperations)
export default RTableHeaderOperations
