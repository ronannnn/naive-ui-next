import type { SFCWithInstall } from '~/src/composables'
import { withInstall } from '~/src/composables'
import Dnd from './index.vue'

export * from './types'

export const RDnd: SFCWithInstall<typeof Dnd> = withInstall(Dnd)
export default RDnd
