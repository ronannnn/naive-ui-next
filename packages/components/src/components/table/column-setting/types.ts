import type { Column } from '../types'

export interface ColumnSetting {
  initStorageColumns: Storage.Column[]
  columns: Column<any>[]
  tblName: string
}
