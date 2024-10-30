import type { SFCWithInstall } from '~/src/composables'
import { withInstall } from '~/src/composables'
import HoverContainer from './index.vue'

export * from './types'

export const RHoverContainer: SFCWithInstall<typeof HoverContainer> = withInstall(HoverContainer)
export default RHoverContainer
