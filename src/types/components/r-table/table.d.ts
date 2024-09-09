import type {
  DataTableColumn,
  DataTableCreateRowKey,
} from 'naive-ui'
import type { HeaderOperationsProps, OrderQueryOption, RowActionProps, WhereQueryOption } from '.'

// table props
export interface RTableProps<T> {
  // 1. table-level props
  // meta
  name: string
  title?: string
  rowKey?: DataTableCreateRowKey<T>
  refreshFlag?: boolean
  // header operations
  extraButtons?: HeaderOperationsProps<T>['extraButtons']
  disableCreate?: boolean
  createBtxTxt?: string
  disableRefresh?: boolean
  refreshBtnTxt?: string
  disableBatchDelete?: boolean
  disableColumnSetting?: boolean
  disableWhereQuery?: boolean
  disableOrderQuery?: boolean
  // pagination
  disablePagination?: boolean
  // where query
  showAllWhereOptionsWhenInit?: boolean
  extraWhereQueryOptions?: WhereQueryOption<T>[]
  extraWhereQueryInitValues?: Query.Where<T>
  // order query
  extraOrderQueryOptions?: OrderQueryOption<T>[] // order query不需要initValues，因为OrderOption中自带了initOrderType
  // summary
  disableSummary?: boolean

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
  onFetch?: (query: Query.Template<T>) => Promise<Api.RequestResult<Api.PageResult<T>>>
  // deletion
  onBatchDelete?: (cmd: Api.BatchDeleteCommand) => Promise<Api.RequestResult>
}
