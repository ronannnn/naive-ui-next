import type {
  DataTableBaseColumn,
  DataTableColumn,
  DataTableCreateRowKey,
  DataTableRowKey,
  SelectOption,
} from 'naive-ui'
import type { Ref, VNode } from 'vue'
import type { OrderQueryOption, OrderQueryProps, WhereQueryOption } from './query'
import type { DropdownButtonOption } from '~/src/components/buttons'
import type { BatchDeleteCommand, PageResult, QueryOrder, QueryOrderType, QueryTemplate, QueryWhere, QueryWhereOpr, RequestResult, StorageColumn } from '~/src/types'

export type OprType = 'create' | 'whereQuery' | 'orderQuery' | 'batchDelete' | 'refresh' | 'exportExcel' | 'columnSettings'
// table header props
export interface HeaderOperationsProps<T> extends OrderQueryProps<T> {
  name: string
  loading?: boolean
  checkedRowKeys?: DataTableRowKey[]
  initStorageColumns?: StorageColumn[]
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
}

// row actions
export interface RowActionCommonProps<T> {
  hide?: (data: T) => boolean
  permissions?: string | string[]
  key: string
  label: string | ((data: T) => string)
  icon: (data: T) => VNode
}
export interface RowTooltipActionProps<T> extends RowActionCommonProps<T> {
  type: 'tooltip'
  syncFn?: (data: T) => void
  asyncFn?: (data: T) => Promise<void>
  disabled?: (data: T) => boolean
  disabledMsg?: (data: T) => string
}
export interface RowPopconfirmActionProps<T> extends RowActionCommonProps<T> {
  type: 'popconfirm'
  syncConfirmFn?: (data: T) => void
  asyncConfirmFn?: (data: T) => Promise<void>
  disabled?: (data: T) => boolean
  disabledMsg?: (data: T) => string
}
export interface RowDropdownActionProps<T> extends RowActionCommonProps<T> {
  type: 'dropdown'
  dropdownButtonOptions: (row: T) => DropdownButtonOption[]
}
export type RowActionProps<T> = RowTooltipActionProps<T> | RowPopconfirmActionProps<T> | RowDropdownActionProps<T>

// columns
// where query
export type WhereQueryColumnOption = {
  opr?: QueryWhereOpr
  initValues?: any
  icon?: () => VNode
  initHide?: boolean // 初始化where query form的时候是否隐藏该字段，即不会添加到localStorage中
} & (
  | { type: 'input' }
  | { type: 'select', multiple?: boolean, options: SelectOption[] }
  | {
    type: 'asyncSelect'
    searchFn: (query: QueryTemplate<any>) => Promise<RequestResult<PageResult<any>>>
    searchFields: string[]
    labelField: string
    valueField: string
    renderOptionFromData?: (model: any) => VNode
    orderQuery?: QueryOrder<any>
  }
  | { type: 'dateRange', format?: string }
  | { type: 'date', format?: string }
  | { type: 'unknown' }
)

// order query
export interface OrderQueryColumnOption {
  initOrderType: QueryOrderType
}

// columns
export interface Column<T> extends DataTableBaseColumn<T> {
  filterOption?: WhereQueryColumnOption
  sortOption?: OrderQueryColumnOption | true
  initHide?: boolean // 初始化的时候是否隐藏该列，即不会添加到localStorage中
}

// table props
export interface TableProps<T> {
  // 1. table-level props
  // meta
  name: string
  primaryKey?: string
  title?: string
  rowKey?: DataTableCreateRowKey<T>
  extraButtons?: HeaderOperationsProps<T>['extraButtons']
  disableCreate?: boolean
  refreshFlag?: boolean
  disableFetchOnMounted?: boolean
  // pagination
  disablePagination?: boolean
  disableBatchDelete?: boolean
  // where query
  showAllWhereOptionsWhenInit?: boolean
  extraWhereQueryOptions?: WhereQueryOption<T>[]
  extraWhereQueryInitValues?: QueryWhere<T>
  // order query
  extraOrderQueryOptions?: OrderQueryOption<T>[] // order query不需要initValues，因为OrderOption中自带了initOrderType
  // 2. row-level props
  // selection
  disableRowSelection?: boolean
  // deletion
  disableRowDelete?: boolean
  // expand
  disableRowExpand?: boolean
  rowExpand?: (row: T) => VNode
  // actions
  rowActions?: RowActionProps<T>[]

  // 3. column-level props
  columns: Column<T>[]
  commonColumnProps?: Omit<DataTableColumn<T>, 'key'>

  // 4. fn
  onCreate?: () => void
  onFetch?: (query: QueryTemplate<T>) => Promise<RequestResult<PageResult<T>>>
  // deletion
  onBatchDelete?: (cmd: BatchDeleteCommand) => Promise<RequestResult>

  // excel
  excel?: {
    onExportExcel: () => void
    exportedFilename?: string
  }
}

export type LocalTableProps<T> = TableProps<T> & {
  data: Ref<T[]>
  onUpdateData: (data: T[]) => void
  rowKey: DataTableCreateRowKey<T>
}
