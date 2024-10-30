import type { SFCWithInstall } from '~/src/composables'
import { withInstall } from '~/src/composables'
import DropdownButton from './index.vue'

export * from './types'

export const RDropdownButton: SFCWithInstall<typeof DropdownButton> = withInstall(DropdownButton)
export default RDropdownButton
