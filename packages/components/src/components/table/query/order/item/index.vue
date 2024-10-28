<script setup lang="ts">
import { NButton, NSelect } from 'naive-ui'
import { computed } from 'vue'
import { RTooltipButton } from '~/src/components'
import type { RTableOrderQueryItemProps } from './types'

const props = defineProps<RTableOrderQueryItemProps<any>>()
const emit = defineEmits<{
  change: [string, Query.OrderType]
  remove: []
}>()

const selectedValue = computed({
  get() {
    return props.field
  },
  set(newField) {
    emit('change', newField, props.orderType)
  },
})
const unselectedOptions = computed(() => [props.field].concat(props.unselectedFields).map(field => ({
  label: props.orderOptions.find(option => option.field === field)?.label ?? field,
  value: field,
})))

function onToggleOrderType() {
  emit('change', props.field, props.orderType === 'asc' ? 'desc' : 'asc')
}
</script>

<template>
  <div class="flex-y-center gap-3">
    <div class="order-query-handle cursor-move">
      <div class="i-tabler-drag-drop text-4 text-gray" />
    </div>
    <NSelect
      v-model:value="selectedValue"
      :size="size"
      :options="unselectedOptions"
      :consistent-menu-width="false"
    />
    <NButton :size="size" @click="onToggleOrderType">
      <template #icon>
        <div v-if="props.orderType === 'asc'" class="i-tabler-sort-ascending" />
        <div v-else class="i-tabler-sort-descending" />
      </template>
      {{ props.orderType === 'asc' ? '升序' : '降序' }}
    </NButton>
    <RTooltipButton
      class="ml-auto text-gray"
      text
      :size="size"
      tooltip-content="删除该排序规则"
      icon-class="i-tabler-x"
      :keep-alive-on-hover="false"
      @sync-click="emit('remove')"
    />
  </div>
</template>
