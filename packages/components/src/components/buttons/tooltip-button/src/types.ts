import type {
  ButtonProps,
  PopoverPlacement,
  PopoverProps,
} from 'naive-ui'
import type { ExtractPublicPropTypes, PropType, VNodeChild } from 'vue'

export const tooltipButton = {
  class: String,
  iconClass: String,
  // button
  onSyncClick: Function as PropType<(e: MouseEvent) => void>,
  onAsyncClick: Function as PropType<(e: MouseEvent) => Promise<void>>,
  size: String as PropType<ButtonProps['size']>,
  type: String as PropType<ButtonProps['type']>,
  dashed: Boolean as PropType<ButtonProps['dashed']>,
  secondary: Boolean as PropType<ButtonProps['secondary']>,
  tertiary: Boolean as PropType<ButtonProps['tertiary']>,
  quaternary: Boolean as PropType<ButtonProps['quaternary']>,
  round: Boolean as PropType<ButtonProps['round']>,
  circle: Boolean as PropType<ButtonProps['circle']>,
  text: Boolean as PropType<ButtonProps['text']>,
  loading: Boolean as PropType<ButtonProps['loading']>,
  disabled: Boolean as PropType<ButtonProps['disabled']>,
  ghost: Boolean as PropType<ButtonProps['ghost']>,
  color: String as PropType<ButtonProps['color']>,
  // tooltip
  tooltipContent: [String, Function] as PropType<string | (() => VNodeChild)>,
  tooltipPlacement: String as PropType<PopoverPlacement>,
  keepAliveOnHover: Boolean as PropType<PopoverProps['keepAliveOnHover']>,
}

// buttons
export type RTooltipButtonProps = ExtractPublicPropTypes<typeof tooltipButton>
