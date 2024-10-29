import type { ExtractPropTypes, PropType } from 'vue'
import type { SortableEvent } from 'vue-draggable-plus'

export const dndProps = {
  dndClass: {
    type: String,
    default: '',
  },
  handle: {
    type: String,
    default: '',
  },
  group: {
    type: String,
    default: '',
  },
  onAfterDrag: {
    type: Function as PropType<(event: SortableEvent) => void>,
    default: () => {},
  },
}

export type RDndProps = ExtractPropTypes<typeof dndProps>
