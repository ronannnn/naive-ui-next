import type { Column } from '../types'
import type { StorageColumn } from '~/src/types'

export interface ColumnSetting {
  initStorageColumns: StorageColumn[]
  columns: Column<any>[]
  tblName: string
}
