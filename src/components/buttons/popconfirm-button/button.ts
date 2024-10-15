import type {
  ButtonProps,
  PopoverPlacement,
} from 'naive-ui'
import type { VNodeChild } from 'vue'

export interface RPopconfirmButtonProps {
  class?: string
  // button
  onConfirm?: (e: MouseEvent) => void
  onAsyncConfirm?: (e: MouseEvent) => Promise<void>
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
  popconfirmContent?: string | (() => VNodeChild)
  popconfirmPlacement?: PopoverPlacement
}
