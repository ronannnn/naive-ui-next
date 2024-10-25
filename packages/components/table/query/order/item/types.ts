import type { OrderQueryOption } from '../types'

export interface RTableOrderQueryItemProps<T> {
  field: string
  orderType: Query.OrderType
  orderOptions: OrderQueryOption<T>[]
  unselectedFields: string[]
  size?: NaiveUiTypes.Size
}
