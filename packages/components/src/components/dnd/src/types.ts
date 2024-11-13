import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { SortableEvent } from 'vue-draggable-plus'

export const dndProps = {
  dndClass: {
    type: String,
  },
  handle: {
    type: String,
  },
  group: {
    type: String,
  },
  onAfterDrag: {
    type: Function as PropType<(event: SortableEvent) => void>,
  },
}

export type RDndProps = ExtractPublicPropTypes<typeof dndProps>
