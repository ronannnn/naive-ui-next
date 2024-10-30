import type { SFCWithInstall } from '~/src/composables'
import { withInstall } from '~/src/composables'
import SimpleLayout from './index.vue'

export * from './types'

export const RSimpleLayout: SFCWithInstall<typeof SimpleLayout> = withInstall(SimpleLayout)
export default RSimpleLayout
