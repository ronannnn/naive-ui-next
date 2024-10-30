import type { SFCWithInstall } from '~/src/composables'
import { withInstall } from '~/src/composables'
import TooltipButton from './index.vue'

export * from './types'

export const RTooltipButton: SFCWithInstall<typeof TooltipButton> = withInstall(TooltipButton)
export default RTooltipButton
