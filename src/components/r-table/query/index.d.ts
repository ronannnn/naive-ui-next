import type { OrderQueryType } from './order/index.d'

interface Range {
  start?: any
  end?: any
}

interface Template<T> {
  pagination: Api.Pagination
  selectQuery?: SelectQuery<T>
  whereQuery?: WhereQuery<T>
  orQuery?: WhereQuery<T>
  orderQuery?: OrderQuery<T>
  skipCount?: boolean
}

type SelectQuery<T> = SelectQueryItem<T>[]
interface SelectQueryItem<T> {
  field: keyof T
  distinct: boolean
}

type WhereQuery<T> = WhereQueryItem<T>[]
type WhereQueryOpr = 'custom' | 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'like' | 'start_like' | 'end_like' | 'in' | 'not_in' | 'range' | 'is' | 'is_not' | null
interface WhereQueryItem<T> {
  field: keyof T | string
  opr: WhereQueryOpr
  value: any
}

type OrderQuery<T> = OrderQueryItem<T>[]
interface OrderQueryItem<T> {
  field: keyof T
  order: OrderQueryType
}
