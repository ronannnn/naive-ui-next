import type { SFCWithInstall } from '~/src/composables'
import { withInstall } from '~/src/composables'
import Select from './index.vue'

export * from './types'

export const RSelect: SFCWithInstall<typeof Select> = withInstall(Select)
export default RSelect
