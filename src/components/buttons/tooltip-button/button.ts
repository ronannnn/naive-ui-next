import type {
  ButtonProps,
  PopoverPlacement,
  PopoverProps,
} from 'naive-ui'
import type { VNodeChild } from 'vue'

// buttons
export interface RTooltipButtonProps {
  class?: string
  // button
  onSyncClick?: (e: MouseEvent) => void // 不能取名为onClick
  onAsyncClick?: (e: MouseEvent) => Promise<void>
  size?: ButtonProps['size']
  type?: ButtonProps['type']
  dashed?: ButtonProps['dashed']
  secondary?: ButtonProps['secondary']
  tertiary?: ButtonProps['tertiary']
  quaternary?: ButtonProps['quaternary']
  round?: ButtonProps['round']
  circle?: ButtonProps['circle']
  text?: ButtonProps['text']
  loading?: ButtonProps['loading']
  disabled?: ButtonProps['disabled']
  ghost?: ButtonProps['ghost']
  color?: ButtonProps['color']
  // tooltip
  tooltipContent?: string | (() => VNodeChild)
  tooltipPlacement?: PopoverPlacement
  keepAliveOnHover?: PopoverProps['keepAliveOnHover']
}
