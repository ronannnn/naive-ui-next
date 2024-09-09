import type { WhereQueryColumnOption } from '~/components/r-table'
import type { Size } from '~/types'

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

  defaultWhereQuery?: Query.Where<T>
  whereQuery: Query.Where<T>
  onUpdateWhereQuery: (query: Query.Where<T>) => void

  loading: boolean
  triggerQuery: () => Promise<void>
  size?: Size
}
