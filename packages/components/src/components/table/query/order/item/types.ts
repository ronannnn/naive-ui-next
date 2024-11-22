import type { OrderQueryOption } from '../types'

export interface TableOrderQueryItemProps<T> {
  field: string
  orderType: Query.OrderType
  orderOptions: OrderQueryOption<T>[]
  unselectedFields: string[]
  size?: NaiveUiTypes.Size
}
