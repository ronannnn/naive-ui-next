import type {
  DataTableBaseColumn,
  SelectOption,
} from 'naive-ui'

// where query
export type WhereQueryColumnOption = {
  opr?: Query.WhereOpr
  initValues?: any
  icon?: () => VNode
  initHide?: boolean // 初始化where query form的时候是否隐藏该字段，即不会添加到localStorage中
} & (
  | { type: 'input' }
  | { type: 'select', multiple?: boolean, options: SelectOption[] }
  | {
    type: 'asyncSelect'
    searchFn: (query: Query.Template<any>) => Promise<Api.RequestResult<Api.PageResult<any>>>
    searchFields: string[]
    labelField: string
    valueField: string
    renderOptionFromData?: (model: any) => VNode
    orderQuery?: Query.Order<any>
  }
  | { type: 'dateRange', format?: string }
  | { type: 'date', format?: string }
  | { type: 'unknown' }
)

// order query
export interface OrderQueryColumnOption {
  initOrderType: Query.OrderType
}

// columns
export type RColumn<T> = {
  filterOption?: WhereQueryColumnOption
  sortOption?: OrderQueryColumnOption | true
  initHide?: boolean // 初始化的时候是否隐藏该列，即不会添加到localStorage中
} & DataTableBaseColumn<T>
