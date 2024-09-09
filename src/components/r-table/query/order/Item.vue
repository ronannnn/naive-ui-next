<script setup lang="ts">
import type { OrderQueryOption, Size } from '~/types'

const props = defineProps<{
  field: string
  orderType: Query.OrderType
  orderOptions: OrderQueryOption<any>[]
  unselectedFields: string[]
  size?: Size
}>()
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
      <RIconDrag class="text-4 text-gray" />
    </div>
    <n-select
      v-model:value="selectedValue"
      :size="size"
      :options="unselectedOptions"
      :consistent-menu-width="false"
    />
    <n-button :size="size" @click="onToggleOrderType">
      <template #icon>
        <RIconSortAscend v-if="props.orderType === 'asc'" />
        <RIconSortDescend v-else />
      </template>
      {{ props.orderType === 'asc' ? '升序' : '降序' }}
    </n-button>
    <RButtonCancel
      class="ml-auto text-gray"
      text
      :size="size"
      tooltip-content="删除该排序规则"
      :keep-alive-on-hover="false"
      @sync-click="emit('remove')"
    />
  </div>
</template>
