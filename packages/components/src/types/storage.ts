import type { QueryOrder, QueryWhere } from './query'

export interface StorageColumn {
  key: string
  checked?: boolean
  width?: string | number
  fixed: 'left' | 'right' | 'unfixed'
}

export interface StorageTableSetting<T> {
  columns?: StorageColumn[]
  pageSize?: number
  // where query
  whereQuery?: QueryWhere<T>
  whereQueryOptionKeys?: string[] // 用来控制是否显示option以及option的顺序
  whereQueryPinned?: boolean
  whereQuerySupData?: Record<string, any> // 用来存储额外的数据，例如下拉框的选项
  // order query
  orderQuery?: QueryOrder<T>
}
