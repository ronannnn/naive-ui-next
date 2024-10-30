import type { SFCWithInstall } from '~/src/composables'
import { withInstall } from '~/src/composables'
import TableOrderQueryNewer from './index.vue'

export * from './types'

export const RTableOrderQueryNewer: SFCWithInstall<typeof TableOrderQueryNewer> = withInstall(TableOrderQueryNewer)
export default RTableOrderQueryNewer
