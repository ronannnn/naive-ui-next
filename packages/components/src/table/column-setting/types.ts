import type { RColumn } from '../types'

export interface RColumnSetting {
  initStorageColumns: Storage.Column[]
  columns: RColumn<any>[]
  tblName: string
}
