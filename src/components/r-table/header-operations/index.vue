<script setup lang="ts">
import { NBadge } from 'naive-ui'
import {
  RButtonDeleteConfirm,
  RButtonExportExcel,
  RButtonNew,
  RButtonQuery,
  RButtonRefresh,
} from '~/components/buttons'
import { RTableOrderQuery } from '~/components/r-table'
import { RTableColumnSetting } from '~/components/r-table/column-setting'
import type { HeaderOperationsProps } from '../table'

const props = withDefaults(defineProps<HeaderOperationsProps<any>>(), {
  displayOrder: () => ['create', 'whereQuery', 'orderQuery', 'refresh', 'exportExcel', 'columnSettings', 'batchDelete'],
})

const oprButtons = computed(() => {
  return h('div', { class: 'flex-y-center gap-3 flex-wrap' }, props.displayOrder.map((opr) => {
    switch (opr) {
      case 'create':
        if (props.disableCreate || !props.onCreate)
          return null
        return h(RButtonNew, {
          type: 'primary',
          size: 'small',
          ghost: true,
          onSyncClick: props.onCreate,
        })
      case 'whereQuery':
        if (props.disableWhereQuery)
          return null
        return h(NBadge, {
          dot: true,
          show: !props.isWhereQueryEmpty,
          offset: [-2, 2],
        }, {
          default: () => !props.disableWhereQuery && h(RButtonQuery, {
            type: props.whereQueryOpen ? 'primary' : undefined,
            size: 'small',
            ghost: true,
            onSyncClick: () => {
              props.onUpdateWhereQueryOpen?.(!props.whereQueryOpen)
            },
          }),
        })
      case 'orderQuery':
        if (props.disableOrderQuery)
          return null
        return h(NBadge, {
          dot: true,
          show: !props.isOrderQueryEmpty,
          offset: [-2, 2],
        }, {
          default: () => !props.disableOrderQuery && h(RTableOrderQuery, {
            defaultOrderQuery: props.defaultOrderQuery,
            orderOptions: props.orderOptions,
            orderQuery: props.orderQuery,
            onUpdateOrderQuery: props.onUpdateOrderQuery,
            loading: props.loading,
            triggerQuery: props.triggerQuery,
            size: props.size,
          }),
        })
      case 'refresh':
        if (props.disableRefresh)
          return null
        return h(RButtonRefresh, {
          size: 'small',
          loading: props.loading,
          onAsyncClick: props.onFetchData,
        })
      case 'exportExcel':
        if (props.disableExportExcel || !props.onExportExcel)
          return null
        return h(RButtonExportExcel, {
          type: 'primary',
          size: 'small',
          ghost: true,
          onAsyncClick: props.onExportExcel,
        })
      case 'columnSettings':
        if (props.disableColumnSettings)
          return null
        return props.columns && props.columns.length > 0 && props.onUpdateColumns && h(RTableColumnSetting, {
          initStorageColumns: props.initStorageColumns ?? [],
          columns: props.columns,
          tblName: props.name,
          onUpdateColumns: cols => props.onUpdateColumns?.(cols),
        })
      case 'batchDelete':
        if (props.disableBatchDelete || !props.onBatchDelete)
          return null
        return props.checkedRowKeys && props.checkedRowKeys.length !== 0 && h(RButtonDeleteConfirm, {
          type: 'error',
          size: 'small',
          ghost: true,
          disabled: props.checkedRowKeys.length === 0,
          onAsyncConfirm: async () => await props.onBatchDelete?.(props.checkedRowKeys as number[]),
        }, { default: () => '批量删除' })
      default:
        return null
    }
  }).concat(props.extraButtons))
})
</script>

<template>
  <div class="flex-y-center">
    <component :is="oprButtons" />
  </div>
</template>
