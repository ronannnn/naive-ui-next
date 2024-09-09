import type { OrderQueryColumnOption } from '~/components/r-table'
import type { Size } from '~/types'

export type OrderQueryOption<T> = {
  field: keyof T
  label: string
} & OrderQueryColumnOption

export interface OrderQueryProps<T> {
  defaultOrderQuery?: Query.Order<T>
  orderOptions: OrderQueryOption<T>[]
  orderQuery: Query.Order<T>
  onUpdateOrderQuery: (query: Query.Order<T>) => void
  loading: boolean
  triggerQuery: () => Promise<void>
  size?: Size
}
