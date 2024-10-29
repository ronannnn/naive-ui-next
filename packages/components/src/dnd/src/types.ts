import type { SortableEvent } from 'vue-draggable-plus'

export interface RDndProps {
  dndClass?: string
  handle?: string
  group?: string
  onAfterDrag?: (event: SortableEvent) => void
}
