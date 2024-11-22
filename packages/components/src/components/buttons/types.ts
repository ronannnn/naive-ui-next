import type { ButtonProps } from 'naive-ui'

export interface CommonButtonProps {
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
}
