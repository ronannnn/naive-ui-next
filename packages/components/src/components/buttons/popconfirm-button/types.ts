import type {
  PopoverPlacement,
} from 'naive-ui'
import type { VNodeChild } from 'vue'
import type { CommonButtonProps } from '../types'

export type PopconfirmButtonProps = {
  class?: string
  // button
  onConfirm?: (e: MouseEvent) => void
  onAsyncConfirm?: (e: MouseEvent) => Promise<void>
  // tooltip
  popconfirmContent?: string | (() => VNodeChild)
  popconfirmPlacement?: PopoverPlacement
} & CommonButtonProps
