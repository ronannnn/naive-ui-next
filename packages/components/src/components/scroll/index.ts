import type { SFCWithInstall } from '~/src/composables'
import { withInstall } from '~/src/composables'
import Scroll from './index.vue'

export * from './types'

export const RScroll: SFCWithInstall<typeof Scroll> = withInstall(Scroll)
export default RScroll
