import type { OrderQueryColumnOption } from '~/src/components/table'

export interface OrderQueryOption<T> extends OrderQueryColumnOption {
  field: keyof T
  label: string
}

export interface OrderQueryProps<T> {
  defaultOrderQuery?: Query.Order<T>
  orderOptions: OrderQueryOption<T>[]
  orderQuery: Query.Order<T>
  onUpdateOrderQuery: (query: Query.Order<T>) => void
  loading?: boolean
  triggerQuery: () => Promise<void>
  size?: NaiveUiTypes.Size
}
