<script setup lang="ts">
import type { SelectRenderLabel } from 'naive-ui'
import { RIconSort } from '~/components/r-icons'
import type { OrderQueryOption } from '.'

const props = defineProps<{
  orderOptions: OrderQueryOption<any>[]
  unselectedFields: string[]
  size?: NaiveUiTypes.Size
}>()
const emit = defineEmits<{
  new: [string]
}>()

const unselectedOptions = computed(() => props.unselectedFields.map(field => ({
  label: props.orderOptions.find(option => option.field === field)?.label ?? field,
  value: field,
})))
const renderLabel: SelectRenderLabel = (option) => {
  return h('div', { class: 'flex items-center' }, [
    h(RIconSort),
    h('span', { class: 'ml-2' }, option.label as string),
  ])
}
</script>

<template>
  <PopselectButton
    class="flex-1"
    :popselect-options="unselectedOptions"
    :render-label="renderLabel"
    dashed
    size="small"
    @update-value="newField => emit('new', newField)"
  >
    <template #icon>
      <RIconNew />
    </template>
    新增排序
  </PopselectButton>
</template>
