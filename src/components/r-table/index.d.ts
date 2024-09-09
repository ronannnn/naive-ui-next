import type {
  DataTableRowKey,
} from 'naive-ui'

export type OprType = 'create' | 'whereQuery' | 'orderQuery' | 'batchDelete' | 'refresh' | 'exportExcel' | 'columnSettings'
// table header props
export type HeaderOperationsProps<T> = {
  name: string
  loading: boolean
  checkedRowKeys?: DataTableRowKey[]
  initStorageColumns?: Storage.Column[]
  columns?: Column<T>[]
  onUpdateColumns?: (cols: Column<T>[]) => void

  displayOrder?: OprType[]

  // create
  disableCreate?: boolean
  onCreate?: () => void

  // where query
  disableWhereQuery?: boolean
  whereQueryOpen?: boolean
  onUpdateWhereQueryOpen?: (open: boolean) => void
  isWhereQueryEmpty?: boolean

  // order query
  disableOrderQuery?: boolean
  isOrderQueryEmpty?: boolean

  // delete
  disableBatchDelete?: boolean
  onBatchDelete?: (ids: number[]) => Promise<void>
  // refresh
  disableRefresh?: boolean
  onFetchData?: () => Promise<void>

  // excel export
  disableExportExcel?: boolean
  onExportExcel?: () => Promise<void>

  // column settings
  disableColumnSettings?: boolean

  // other customized buttons
  extraButtons?: VNode[]
} & OrderQueryProps<T>
