import type {
  DataTableColumn,
  DataTableProps,
  DataTableRowKey,
  PaginationProps,
} from 'naive-ui'
import type { HTMLAttributes, Ref, VNode } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { defu } from 'defu'
import { computed, h, ref } from 'vue'
import { RDropdownButton, RPopconfirmButton, RTooltipButton } from '~/src/components/buttons'
import type { Column, HeaderOperationsProps, LocalTableProps, OrderQueryOption, WhereQueryOption, WhereQueryProps } from '~/src/components/table'
import type { QueryOrder, QueryWhere, StorageColumn, StorageTableSetting } from '~/src/types'
import { compareObjArrays } from './diff'
import { exportExcel } from './excel'
import { isString, useArraySet } from './type'

export function useLocalTable<T>(props: LocalTableProps<T>) {
  const {
    data,
    onUpdateData,
    name,
    rowKey,
    extraButtons,
    disableCreate,
    disablePagination,
    disableBatchDelete,
    extraWhereQueryOptions,
    extraWhereQueryInitValues,
    extraOrderQueryOptions,
    columns,
    commonColumnProps = {
      resizable: true,
      width: 150,
      ellipsis: {
        tooltip: true,
      },
    },
    disableRowSelection,
    rowExpand,
    rowActions,
    disableRowDelete,
    onCreate,
    excel,
  } = props

  // local storage
  const whereQueryOptions = computed<WhereQueryOption<T>[]>(() => {
    // options from columns
    const options: WhereQueryOption<T>[] = columns
      .filter(col => col.filterOption)
      .map(col => ({
        field: col.key as string,
        label: col.title as string,
        ...col.filterOption,
      }))
    // options from extraWhereQueryOptions
    extraWhereQueryOptions?.forEach((option) => {
      options.unshift(option)
    })
    return options
  })
  const initWhereQueryOptionKeys = computed(() => whereQueryOptions.value.filter(option => !option.initHide).map(option => option.field as string))
  const whereQueryInitValues = computed<QueryWhere<T>>(() => {
    const initValues: QueryWhere<T> = whereQueryOptions.value
      .filter(option => option.initValues)
      .map(option => ({ field: option.field, opr: option.opr ?? null, value: option.initValues ?? null }))
    extraWhereQueryInitValues?.forEach((initValue) => {
      initValues.push(initValue)
    })
    return initValues
  })
  const orderQueryOptions = computed<OrderQueryOption<T>[]>(() => {
    // options from columns
    const options: OrderQueryOption<T>[] = columns
      .filter(col => col.sortOption)
      .map(col => ({
        field: col.key as keyof T,
        label: col.title as string,
        initOrderType: col.sortOption === true ? null : col.sortOption?.initOrderType ?? null,
      }))
    // options from extraWhereQueryOptions
    extraOrderQueryOptions?.forEach((option) => {
      options.unshift(option)
    })
    return options
  })
  const orderQueryInitValues = computed<QueryOrder<T>>(() => {
    const initValues = orderQueryOptions.value
      .filter(option => option.initOrderType)
      .map(option => ({ field: option.field, order: option.initOrderType ?? 'desc' }))
    return initValues
  })
  const initStorageColumns = computed<StorageColumn[]>(() => columns.map(col => ({ key: col.key as string, fixed: 'unfixed', checked: !col.initHide })))
  const localStgSettings = useLocalStorage<StorageTableSetting<T>>(`${name}-tbl-settings`, {
    columns: initStorageColumns.value,
    pageSize: 10,
    whereQuery: whereQueryInitValues.value,
    whereQueryOptionKeys: whereQueryOptions.value.filter(option => !option.initHide).map(option => option.field as string),
    whereQuerySupData: {},
    orderQuery: orderQueryInitValues.value,
  })

  // pagination
  const pageSize = computed<number>({
    get: () => localStgSettings.value.pageSize ?? 10,
    set: pageSize => localStgSettings.value = { ...localStgSettings.value, pageSize },
  })
  const pagination = ref<PaginationProps>({
    page: 1,
    pageSize: pageSize.value,
    itemCount: 0,
    pageSizes: [10, 20, 50, 100],
    size: 'small',
    showQuickJumper: true,
    showSizePicker: true,
    onUpdatePage: async (page: number) => {
      pagination.value.page = page
    },
    onUpdatePageSize: async (newPageSize: number) => {
      pagination.value.pageSize = newPageSize
      pageSize.value = newPageSize
    },
    prefix: pageInfo => h('div', { class: 'flex-y-center truncate', style: { color: '#9ca3af' } }, [
      h('span', '共'),
      h('span', { class: 'px-1 font-semibold text-gray-5' }, pageInfo.itemCount),
      h('span', '条数据，'),
      h('span', '当前显示第'),
      h('span', { class: 'px-1 font-semibold text-gray-5' }, (pageInfo.page - 1) * pageInfo.pageSize + (data.value.length > 0 ? 1 : 0)),
      h('span', '条到第'),
      h('span', { class: 'px-1 font-semibold text-gray-5' }, (pageInfo.page - 1) * pageInfo.pageSize + data.value.length),
      h('span', '条'),
    ]),
  }) as Ref<PaginationProps>

  // where query
  const whereQueryOptionKeys = computed<string[]>({
    get: () => {
      if (!localStgSettings.value.whereQueryOptionKeys) {
        localStgSettings.value.whereQueryOptionKeys = []
      }
      return localStgSettings.value.whereQueryOptionKeys
    },
    set: newKeys => localStgSettings.value = { ...localStgSettings.value, whereQueryOptionKeys: newKeys },
  })
  const whereQuerySupData = computed<Record<string, any>>({
    get: () => {
      if (!localStgSettings.value.whereQuerySupData) {
        localStgSettings.value.whereQuerySupData = {}
      }
      return localStgSettings.value.whereQuerySupData
    },
    set: newData => localStgSettings.value = { ...localStgSettings.value, whereQuerySupData: newData },
  })
  const whereQuery = computed<QueryWhere<T>>({
    get: () => {
      if (!localStgSettings.value.whereQuery) {
        localStgSettings.value.whereQuery = []
      }
      return localStgSettings.value.whereQuery
    },
    set: query => localStgSettings.value = { ...localStgSettings.value, whereQuery: query },
  })
  const isWhereQueryEmpty = computed(() => compareObjArrays(
    whereQueryInitValues.value,
    whereQuery.value.filter(query => query.value !== null),
  ))
  const whereQueryOpen = ref<boolean>(false)
  const whereQueryPinned = computed(() => localStgSettings.value.whereQueryPinned ?? false)
  const toggleWhereQueryPinned = () => {
    if (localStgSettings.value.whereQueryPinned) {
      localStgSettings.value = { ...localStgSettings.value, whereQueryPinned: !localStgSettings.value.whereQueryPinned }
    }
    else {
      localStgSettings.value = { ...localStgSettings.value, whereQueryPinned: true }
    }
  }

  // order query
  const orderQuery = computed<QueryOrder<T>>({
    get: () => localStgSettings.value.orderQuery ?? [],
    set: query => localStgSettings.value = { ...localStgSettings.value, orderQuery: query },
  })
  const isOrderQueryEmpty = computed(() => compareObjArrays(orderQueryInitValues.value, orderQuery.value))

  // row actions
  const { array: checkedRowKeys, set: checkedRowKeysSet } = useArraySet<DataTableRowKey>()
  const { array: disabledRowKeys, set: _disabledRowKeysSet } = useArraySet<DataTableRowKey>()
  const { array: expandedRowKeys, set: expandedRowKeysSet } = useArraySet<DataTableRowKey>()
  function rowProps(row: T): HTMLAttributes {
    return {
      onClick: (e: MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (expandedRowKeysSet.value.has(rowKey(row))) {
          expandedRowKeysSet.value.delete(rowKey(row))
        }
        else {
          expandedRowKeysSet.value.add(rowKey(row))
        }
      },
    }
  }
  function createRow(row: T) {
    data.value.unshift(row)
    pagination.value.itemCount = pagination.value.itemCount ?? 0 + 1
  }
  function updateRow(newValue: T) {
    const index = data.value.findIndex((item: T) => rowKey(item) === rowKey(newValue))
    if (index !== -1)
      data.value.splice(index, 1, newValue)
  }
  function deleteRow(row: T) {
    const index = data.value.findIndex((item: T) => rowKey(item) === rowKey(row))
    if (index !== -1)
      data.value.splice(index, 1)
  }
  function createOrInsertNewRowAfterExistedRow(existedRow: T, newRow: T) {
    const existedIdx = data.value.findIndex((item: T) => rowKey(item) === rowKey(existedRow))
    if (existedIdx === -1)
      return

    const newIdx = data.value.findIndex((item: T) => rowKey(item) === rowKey(newRow))
    if (newIdx > -1) {
      // newRow already exists, remove it first
      data.value.splice(newIdx, 1)
    }
    // insert newRow after curRow
    data.value.splice(existedIdx + 1, 0, newRow)
  }

  // columns
  const columnsWithCommonProps = ref<Column<T>[]>(columns.map(col => defu(col, commonColumnProps))) as Ref<Column<T>[]>
  const sortedColumnsWithSelectionExpansionActionsRender = computed<DataTableColumn<T>[]>(() => {
    const result: DataTableColumn<T>[] = []
    // selection列
    if (!disableRowSelection) {
      result.push({
        type: 'selection',
        fixed: 'left',
        resizable: false,
        width: 60,
        cellProps: () => ({ onClick: (e: MouseEvent) => e.stopPropagation() }),
        disabled: (row) => {
          return disabledRowKeys.value.includes(rowKey(row))
        },
      })
    }
    // expansion列
    if (rowExpand) {
      result.push({
        type: 'expand',
        fixed: 'left',
        resizable: false,
        width: 30,
        cellProps: () => ({ onClick: (e: MouseEvent) => e.stopPropagation() }), // 不然和RowProps中的onClick冲突
        expandable: () => true,
        renderExpand: row => (rowExpand ? rowExpand(row) : null),
      })
    }
    // 业务列
    result.push(...columnsWithCommonProps.value.map((col) => {
      const newCol = { ...col }
      // 设置render
      if (!newCol.render && newCol.filterOption && newCol.filterOption.type === 'select') {
        const options = newCol.filterOption.options ?? []
        newCol.render = (rowData) => {
          const value = rowData[newCol.key as keyof T]
          const option = options.find(option => option.value === value)
          return (option?.label ?? value) as string
        }
      }
      // 设置排序
      if (newCol.sortOption) {
        newCol.sorter = true
      }
      return newCol
    }))
    // action列
    if ((rowActions && rowActions.length > 0) || !disableRowDelete) {
      const actionWidth = ((rowActions?.filter(action => !action.hide).length ?? 0) + (disableRowDelete ? 0 : 1)) * 36
      const actionColumn: DataTableColumn<T> = {
        key: 'utils',
        title: '操作',
        fixed: 'right',
        width: Math.max(actionWidth, 60),
        resizable: false,
        align: 'center',
        render: (rowData) => {
          const actions: VNode[] = []
          // 业务操作
          rowActions?.forEach((action) => {
            const hide = action.hide ? action.hide(rowData) : false
            if (hide) {
              return
            }

            if (action.type === 'tooltip') {
              let tooltipContent = ''
              if (isString(action.label)) {
                tooltipContent = action.label
              }
              else {
                tooltipContent = action.label(rowData)
              }
              actions.push(
                h(RTooltipButton, {
                  tooltipContent,
                  type: 'primary',
                  tertiary: true,
                  size: 'small',
                  circle: true,
                  onSyncClick: action.syncFn ? () => action.syncFn?.(rowData) : undefined,
                  onAsyncClick: action.asyncFn ? async () => await action.asyncFn?.(rowData) : undefined,
                }, { icon: () => h(action.icon) }),
              )
            }
            else if (action.type === 'dropdown') {
              actions.push(
                h(RDropdownButton, {
                  dropdownButtonOptions: action.dropdownButtonOptions(rowData),
                  size: 'small',
                  type: 'primary',
                  tertiary: true,
                  circle: true,
                }, { icon: () => h(action.icon) }),
              )
            }
            else if (action.type === 'popconfirm') {
              actions.push(
                h(RPopconfirmButton, {
                  type: 'primary',
                  tertiary: true,
                  size: 'small',
                  circle: true,
                  iconClass: 'i-tabler-trash',
                  onConfirm: action.syncConfirmFn ? () => action.syncConfirmFn?.(rowData) : undefined,
                  onAsyncConfirm: action.asyncConfirmFn ? async () => await action.asyncConfirmFn?.(rowData) : undefined,
                  disabled: action.disabled ? action.disabled(rowData) : false,
                  disabledMsg: action.disabledMsg ? action.disabledMsg(rowData) : undefined,
                }, { icon: () => h(action.icon) }),
              )
            }
          })
          // 删除操作
          if (!disableRowDelete) {
            actions.push(
              h(RPopconfirmButton, {
                type: 'error',
                circle: true,
                size: 'small',
                tertiary: true,
                iconClass: 'i-tabler-trash',
                onConfirm: async () => {
                  batchDelete([rowKey(rowData)])
                },
              }),
            )
          }
          return h('div', { class: 'flex-center gap-1' }, actions)
        },
      }
      result.push(actionColumn)
    }
    return result
  })
  // 根据列数量确定table的宽度
  const scrollX = computed(() => {
    return sortedColumnsWithSelectionExpansionActionsRender.value.reduce((acc, col) => acc + (Number(col.width ?? 150)), 0)
  })
  // delete
  async function batchDelete(keys: DataTableRowKey[]) {
    onUpdateData(data.value.filter(row => !keys.includes(rowKey(row))))
  }
  // excel
  async function handleExportExcel() {
    if (!excel) {
      return
    }
    await exportExcel<T>(data.value, columns, excel?.exportedFilename ?? `${name}.xlsx`)
  }

  // 组合props，便于传入组件
  const tblProps = computed<DataTableProps>(() => ({
    checkedRowKeys: checkedRowKeys.value,
    onUpdateCheckedRowKeys: keys => checkedRowKeysSet.value = new Set(keys),
    expandedRowKeys: expandedRowKeys.value,
    onUpdateExpandedRowKeys: keys => expandedRowKeysSet.value = new Set(keys),
    data: data.value as Record<string, any>[],
    rowKey,
    rowProps,
    scrollX: scrollX.value,
    columns: sortedColumnsWithSelectionExpansionActionsRender.value,
    stickyExpandedRows: true,
    flexHeight: true,
    remote: true,
    size: 'small',
    pagination: disablePagination ? undefined : pagination.value,
    class: 'flex-1',
  })) as Ref<DataTableProps>

  const tblHeaderOprProps = computed<HeaderOperationsProps<T>>(() => ({
    name,
    disableBatchDelete,
    extraButtons,
    disableCreate,
    checkedRowKeys: checkedRowKeys.value,
    initStorageColumns: initStorageColumns.value,
    columns: columnsWithCommonProps.value,
    onUpdateColumns: cols => columnsWithCommonProps.value = cols,

    // where query
    whereQueryOpen: whereQueryOpen.value,
    onUpdateWhereQueryOpen: open => whereQueryOpen.value = open,
    isWhereQueryEmpty: isWhereQueryEmpty.value,

    // order query
    isOrderQueryEmpty: isOrderQueryEmpty.value,
    defaultOrderQuery: orderQueryInitValues.value,
    orderOptions: orderQueryOptions.value,
    orderQuery: orderQuery.value,
    onUpdateOrderQuery: query => orderQuery.value = query,
    triggerQuery: async () => {},
    size: 'small',

    onCreate,
    onBatchDelete: async (keys) => {
      batchDelete(keys)
      checkedRowKeys.value = []
    },
    onExportExcel: handleExportExcel,
  }))

  const tblQueryProps = computed<WhereQueryProps<T>>(() => ({
    whereOptions: whereQueryOptions.value,

    whereQuerySupData: whereQuerySupData.value,
    onUpdateWhereQuerySupData: data => whereQuerySupData.value = data,

    defaultWhereQueryOptionKeys: initWhereQueryOptionKeys.value,
    whereQueryOptionKeys: whereQueryOptionKeys.value,
    onUpdateWhereQueryOptionKeys: keys => whereQueryOptionKeys.value = keys,

    defaultWhereQuery: whereQueryInitValues.value,
    whereQuery: whereQuery.value,
    onUpdateWhereQuery: query => whereQuery.value = query,

    triggerQuery: async () => {
      whereQueryOpen.value = false
    },
    size: 'small',
  }))

  return {
    // tbl
    scrollX,
    rowKey,
    // pagination
    pagination,
    // query
    whereQuery,
    whereQueryPinned,
    toggleWhereQueryPinned,
    orderQuery,
    whereQueryOpen,
    // row actions
    checkedRowKeys,
    disabledRowKeys,
    expandedRowKeys,
    rowProps,
    createRow,
    updateRow,
    deleteRow,
    createOrInsertNewRowAfterExistedRow,
    // columns
    bizColumns: columnsWithCommonProps,
    columns: sortedColumnsWithSelectionExpansionActionsRender,
    // delete
    batchDelete,
    // excel
    handleExportExcel,
    // props
    tblHeaderOprProps,
    tblProps,
    tblQueryProps,
  }
}
