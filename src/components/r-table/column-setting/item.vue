<script setup lang="ts">
import type { RColumn } from '~/types'
import type { FixType } from './index.vue'

defineProps<{
  columns: RColumn<any>[]
  stgCol: Storage.Column
}>()
const emit = defineEmits<{
  'fix-col': [Storage.Column, FixType]
}>()
const checked = defineModel<boolean | undefined>('checked', { required: true })
const iconClass = 'cursor-pointer flex-center p-1 hover:bg-slate-200 rounded transition-all'
</script>

<template>
  <div v-if="stgCol.key" class="h-8 flex-y-center rounded px-2">
    <div class="col-settings-handle mr-2 flex-center cursor-move">
      <RIconDrag class="text-4 text-gray" />
    </div>
    <span mr-6>{{ columns.find(col => col.key === stgCol.key)?.title ?? '未知列名' }}</span>
    <div ml-auto flex-y-center>
      <n-tooltip v-if="stgCol.fixed !== 'left'" :keep-alive-on-hover="false" content-style="padding: 0;">
        <template #trigger>
          <div :class="iconClass" @click="() => emit('fix-col', stgCol, 'left')">
            <div class="i-tabler-arrow-bar-to-up text-4" />
          </div>
        </template>
        固定列到左侧
      </n-tooltip>
      <n-tooltip v-if="stgCol.fixed !== 'right'" :keep-alive-on-hover="false" content-style="padding: 0;">
        <template #trigger>
          <div :class="iconClass" @click="() => emit('fix-col', stgCol, 'right')">
            <div class="i-tabler-arrow-bar-to-down text-4" />
          </div>
        </template>
        固定列到右侧
      </n-tooltip>
      <n-tooltip v-if="stgCol.fixed !== 'unfixed'" :keep-alive-on-hover="false" content-style="padding: 0;">
        <template #trigger>
          <div :class="iconClass" @click="() => emit('fix-col', stgCol, 'unfixed')">
            <RIconCancel class="text-4" />
          </div>
        </template>
        取消固定
      </n-tooltip>
      <n-tooltip :keep-alive-on-hover="false" content-style="padding: 0;">
        <template #trigger>
          <div :class="iconClass">
            <div v-if="checked ?? true" class="i-tabler-eye cursor-pointer text-4" @click="checked = false" />
            <div v-else class="i-tabler-eye-off cursor-pointer text-4" @click="checked = true" />
          </div>
        </template>
        <span v-if="checked ?? true">
          隐藏该列
        </span>
        <span v-else>
          显示该列
        </span>
      </n-tooltip>
    </div>
  </div>
</template>
