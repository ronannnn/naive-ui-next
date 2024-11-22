import type {
  PopoverPlacement,
  PopoverProps,
} from 'naive-ui'
import type { VNodeChild } from 'vue'
import type { CommonButtonProps } from '../types'

// buttons
export type TooltipButtonProps = {
  class?: string
  // button
  onSyncClick?: (e: MouseEvent) => void // 不能取名为onClick
  onAsyncClick?: (e: MouseEvent) => Promise<void>
  // tooltip
  tooltipContent?: string | (() => VNodeChild)
  tooltipPlacement?: PopoverPlacement
  keepAliveOnHover?: PopoverProps['keepAliveOnHover']
} & CommonButtonProps
