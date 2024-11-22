import type { OrderQueryOption } from '../types'
import type { NaiveUiSize } from '~/src/types'

export interface TableOrderQueryNewerProps<T> {
  orderOptions: OrderQueryOption<T>[]
  unselectedFields: string[]
  size?: NaiveUiSize
}
