import type { WhereQueryColumnOption } from '~/src/components/table'
import type { NaiveUiSize, QueryWhere } from '~/src/types'

export type WhereQueryOption<T> = {
  field: keyof T | string
  label: string
} & Partial<WhereQueryColumnOption>

export interface WhereQueryProps<T> {
  whereOptions: WhereQueryOption<T>[]

  whereQuerySupData: Record<string, any>
  onUpdateWhereQuerySupData: (data: Record<string, any>) => void

  defaultWhereQueryOptionKeys?: string[]
  whereQueryOptionKeys?: string[]
  onUpdateWhereQueryOptionKeys: (keys: string[]) => void

  defaultWhereQuery?: QueryWhere<T>
  whereQuery: QueryWhere<T>
  onUpdateWhereQuery: (query: QueryWhere<T>) => void

  loading?: boolean
  triggerQuery: () => Promise<void>
  size?: NaiveUiSize
}
