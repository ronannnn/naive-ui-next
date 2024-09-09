import type {
  ButtonProps,
  PopoverPlacement,
  PopoverTrigger,
  PopselectProps,
  SelectOption,
} from 'naive-ui'

export interface RPopselectButtonProps {
  class?: string
  enableSearch?: boolean
  // buttons
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
  // popselect
  popselectOptions: SelectOption[]
  onUpdateValue: PopselectProps['onUpdateValue']
  renderLabel?: PopselectProps['renderLabel']
  width?: PopselectProps['width']
  popselectPlacement?: PopoverPlacement
  trigger?: PopoverTrigger
  // others
  searchInputPlaceholder?: string
}
