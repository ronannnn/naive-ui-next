import type { OrderQueryOption } from '../types'

export interface TableOrderQueryNewerProps<T> {
  orderOptions: OrderQueryOption<T>[]
  unselectedFields: string[]
  size?: NaiveUiTypes.Size
}
