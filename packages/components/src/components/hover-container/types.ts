import type { PopoverPlacement } from 'naive-ui'

export interface HoverContainerProps {
  /** tooltip显示文本 */
  tooltipContent?: string
  /** tooltip的位置 */
  placement?: PopoverPlacement
  /** class类 */
  contentClass?: string
}
