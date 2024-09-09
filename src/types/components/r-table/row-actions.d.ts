import type { RDropdownButtonOption } from '~/types'

// row actions
export interface RowActionCommonProps<T> {
  hide?: (data: T) => boolean
  permissions?: string | string[]
  key: string
  label: string
  icon: () => VNode
}
export type RowTooltipActionProps<T> = {
  type: 'tooltip'
  syncFn?: (data: T) => void
  asyncFn?: (data: T) => Promise<void>
  disabled?: (data: T) => boolean
  disabledMsg?: (data: T) => string
} & RowActionCommonProps<T>
export type RowPopconfirmActionProps<T> = {
  type: 'popconfirm'
  syncConfirmFn?: (data: T) => void
  asyncConfirmFn?: (data: T) => Promise<void>
  disabled?: (data: T) => boolean
  disabledMsg?: (data: T) => string
} & RowActionCommonProps<T>
export type RowDropdownActionProps<T> = {
  type: 'dropdown'
  dropdownButtonOptions: (row: T) => RDropdownButtonOption[]
} & RowActionCommonProps<T>
export type RowActionProps<T> = RowTooltipActionProps<T> | RowPopconfirmActionProps<T> | RowDropdownActionProps<T>
