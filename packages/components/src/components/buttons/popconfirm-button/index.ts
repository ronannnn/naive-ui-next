import type { SFCWithInstall } from '~/src/composables'
import { withInstall } from '~/src/composables'
import PopconfirmButton from './index.vue'

export * from './types'

export const RPopconfirmButton: SFCWithInstall<typeof PopconfirmButton> = withInstall(PopconfirmButton)
export default RPopconfirmButton
