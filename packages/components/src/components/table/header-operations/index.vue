<script setup lang="ts">
import { NBadge } from 'naive-ui'
import { computed, h } from 'vue'
import { RPopconfirmButton, RTableColumnSetting, RTableOrderQuery, RTooltipButton } from '~/src/components'
import type { HeaderOperationsProps } from '../types'

const props = withDefaults(defineProps<HeaderOperationsProps<any>>(), {
  displayOrder: () => ['create', 'whereQuery', 'orderQuery', 'refresh', 'exportExcel', 'columnSettings', 'batchDelete'],
})

const oprButtons = computed(() => {
  return h('div', { class: 'flex-y-center gap-3 flex-wrap' }, props.displayOrder.map((opr) => {
    switch (opr) {
      case 'create':
        if (props.disableCreate || !props.onCreate)
          return null
        return h(RTooltipButton, {
          type: 'primary',
          size: 'small',
          ghost: true,
          iconClass: 'i-tabler-plus',
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
          default: () => !props.disableWhereQuery && h(RTooltipButton, {
            type: props.whereQueryOpen ? 'primary' : undefined,
            size: 'small',
            ghost: true,
            iconClass: 'i-tabler-search',
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
        return h(RTooltipButton, {
          size: 'small',
          loading: props.loading,
          iconClass: 'i-tabler-reload',
          onAsyncClick: props.onFetchData,
        })
      case 'exportExcel':
        if (props.disableExportExcel || !props.onExportExcel)
          return null
        return h(RTooltipButton, {
          type: 'primary',
          size: 'small',
          ghost: true,
          iconClass: 'i-mdi-microsoft-excel',
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
        return props.checkedRowKeys && props.checkedRowKeys.length !== 0 && h(RPopconfirmButton, {
          type: 'error',
          size: 'small',
          ghost: true,
          iconClass: 'i-tabler-trash',
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
