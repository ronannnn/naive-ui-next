<script setup lang="ts">
import type { SelectRenderLabel } from 'naive-ui'
import type { TableOrderQueryNewerProps } from './types'
import { computed, h } from 'vue'
import { RPopselectButton } from '~/src'

const props = defineProps<TableOrderQueryNewerProps<any>>()
const emit = defineEmits<{
  new: [string]
}>()

const unselectedOptions = computed(() => props.unselectedFields.map(field => ({
  label: props.orderOptions.find(option => option.field === field)?.label ?? field,
  value: field,
})))
const renderLabel: SelectRenderLabel = (option) => {
  return h('div', { class: 'flex items-center' }, [
    h('div', { class: 'i-tabler-arrows-down-up' }),
    h('span', { class: 'ml-2' }, option.label as string),
  ])
}
</script>

<template>
  <RPopselectButton
    class="flex-1"
    :options="unselectedOptions"
    :render-label="renderLabel"
    dashed
    size="small"
    @update-value="newField => emit('new', newField)"
  >
    <template #icon>
      <div class="i-tabler-plus" />
    </template>
    新增排序
  </RPopselectButton>
</template>
