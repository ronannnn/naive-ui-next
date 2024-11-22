import type { Pagination } from './api'

export interface QueryRange {
  start?: any
  end?: any
}

export interface QueryTemplate<T> {
  pagination: Pagination
  selectQuery?: QuerySelectQuery<T>
  whereQuery?: QueryWhere<T>
  orQuery?: QueryWhere<T>
  orderQuery?: QueryOrder<T>
  skipCount?: boolean
}

export type QuerySelectQuery<T> = QuerySelectQueryItem<T>[]
export interface QuerySelectQueryItem<T> {
  field: keyof T
  distinct: boolean
}

export type QueryWhere<T> = QueryWhereItem<T>[]
export type QueryWhereOpr = 'custom' | 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'like' | 'start_like' | 'end_like' | 'in' | 'not_in' | 'range' | 'is' | 'is_not' | null
export interface QueryWhereItem<T> {
  field: keyof T | string
  opr: QueryWhereOpr
  value: any
}

export type QueryOrder<T> = QueryOrderItem<T>[]
export type QueryOrderType = 'asc' | 'desc' | null
interface QueryOrderItem<T> {
  field: keyof T
  order: QueryOrderType
}
