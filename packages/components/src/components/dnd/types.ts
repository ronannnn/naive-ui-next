import type { SortableEvent } from 'vue-draggable-plus'

export interface DndProps {
  dndClass?: string
  handle?: string
  group?: string
  onAfterDrag?: (event: SortableEvent) => void
}
