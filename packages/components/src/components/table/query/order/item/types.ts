import type { OrderQueryOption } from '../types'
import type { NaiveUiSize, QueryOrderType } from '~/src/types'

export interface TableOrderQueryItemProps<T> {
  field: string
  orderType: QueryOrderType
  orderOptions: OrderQueryOption<T>[]
  unselectedFields: string[]
  size?: NaiveUiSize
}
