<script setup lang="ts">
import { NCollapseTransition, NDataTable } from 'naive-ui'
import { useTable } from '~/src/composables'
import { RTableHeaderOperations, RTableWhereQuery } from '.'
import type { RTableProps } from './types'

const props = defineProps<RTableProps<any>>()

const {
  stats,
  // query
  whereQueryOpen,
  whereQueryPinned,
  toggleWhereQueryPinned,
  // fn
  createRow,
  updateRow,
  deleteRow,
  createOrInsertNewRowAfterExistedRow,
  // props
  tblHeaderOprProps,
  tblProps,
  tblQueryProps,
} = useTable(props)

// expose
defineExpose({ createRow, updateRow, deleteRow, createOrInsertNewRowAfterExistedRow, stats })
</script>

<template>
  <div class="h-full flex-vertical">
    <div class="mb-3 flex-y-center justify-between">
      <slot name="header">
        <div class="text-5 font-bold">
          {{ title ?? '列表' }}
        </div>
      </slot>
      <RTableHeaderOperations ml-auto v-bind="tblHeaderOprProps" />
    </div>
    <NCollapseTransition :show="whereQueryOpen || whereQueryPinned">
      <RTableWhereQuery mb-3 v-bind="tblQueryProps">
        <template #action-right>
          <div
            class="float-right flex-center cursor-pointer text-4"
            @click="() => {
              // 有时候会出现 whereQueryPinned 为 true 但 whereQueryOpen 为 false 的情况
              // 点击后两个都为false，导致where form会收起来
              // 所以这里强制打开
              whereQueryOpen = true
              toggleWhereQueryPinned()
            }"
          >
            <HoverContainer v-if="whereQueryPinned" tooltip-content="取消固定查询面板" placement="top">
              <RIconPinned />
            </HoverContainer>
            <HoverContainer v-else tooltip-content="固定查询面板" placement="top">
              <RIconPin />
            </HoverContainer>
          </div>
        </template>
      </RTableWhereQuery>
    </NCollapseTransition>
    <!-- 2. Table -->
    <NDataTable v-bind="tblProps" />
  </div>
</template>
