import type {
  ButtonProps,
  DropdownOption,
  PopoverPlacement,
  PopoverTrigger,
} from 'naive-ui'

export type RDropdownButtonOption = {
  syncFn?: () => void
  asyncFn?: () => Promise<void>
} & DropdownOption

export interface RDropdownButtonProps {
  class?: string
  // button
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
  iconClass?: string
  // dropdown
  dropdownButtonOptions: RDropdownButtonOption[]
  dropdownPlacement?: PopoverPlacement
  trigger?: PopoverTrigger
}
