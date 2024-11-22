import type { OrderQueryColumnOption } from '~/src/components/table'
import type { NaiveUiSize, QueryOrder } from '~/src/types'

export interface OrderQueryOption<T> extends OrderQueryColumnOption {
  field: keyof T
  label: string
}

export interface OrderQueryProps<T> {
  defaultOrderQuery?: QueryOrder<T>
  orderOptions: OrderQueryOption<T>[]
  orderQuery: QueryOrder<T>
  onUpdateOrderQuery: (query: QueryOrder<T>) => void
  loading?: boolean
  triggerQuery: () => Promise<void>
  size?: NaiveUiSize
}
