import type { SFCWithInstall } from '~/src/composables'
import { withInstall } from '~/src/composables'
import PopselectButton from './index.vue'

export * from './types'

export const RPopselectButton: SFCWithInstall<typeof PopselectButton> = withInstall(PopselectButton)
export default RPopselectButton
