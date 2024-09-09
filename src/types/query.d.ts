declare namespace Query {
  interface Range {
    start?: any
    end?: any
  }

  interface Template<T> {
    pagination: Api.Pagination
    selectQuery?: SelectQuery<T>
    whereQuery?: Where<T>
    orQuery?: Where<T>
    orderQuery?: Order<T>
    skipCount?: boolean
  }

  type SelectQuery<T> = SelectQueryItem<T>[]
  interface SelectQueryItem<T> {
    field: keyof T
    distinct: boolean
  }

  type Where<T> = WhereItem<T>[]
  type WhereOpr = 'custom' | 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'like' | 'start_like' | 'end_like' | 'in' | 'not_in' | 'range' | 'is' | 'is_not' | null
  interface WhereItem<T> {
    field: keyof T | string
    opr: WhereOpr
    value: any
  }

  type Order<T> = OrderItem<T>[]
  type OrderType = 'asc' | 'desc' | null
  interface OrderItem<T> {
    field: keyof T
    order: OrderQueryType
  }
}
