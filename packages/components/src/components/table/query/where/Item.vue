<script setup lang="ts">
import { computed, ref } from 'vue'
import { cloneJson } from '~/src/composables'
import {
  RTableWhereQueryAsyncSelect,
  RTableWhereQueryDatePicker,
  RTableWhereQueryDateRangePicker,
  RTableWhereQueryInput,
  RTableWhereQuerySelect,
} from '.'
import type { WhereQueryOption } from './types'

const props = withDefaults(defineProps<{
  options: WhereQueryOption<any>[]
  field: string
  triggerQuery: () => void
  onRemove?: (field: string) => void
  loading?: boolean
  size?: NaiveUiTypes.Size
}>(), {
  size: 'medium',
})
const query = defineModel<Query.Where<any>>('query', { required: true })
const supData = defineModel<Record<string, any>>('supData', { required: true })

const option = computed(() => props.options.find(option => option.field === props.field))
const whereQueryItem = computed<Query.WhereItem<any>>({
  get() {
    const foundOption = props.options.find(option => option.field === props.field)
    let opr: Query.WhereOpr = null
    if (foundOption) {
      opr = foundOption.opr ?? null
    }
    return query.value.find(query => query.field === props.field) ?? { field: props.field, opr, value: null }
  },
  set(newValue) {
    const index = query.value.findIndex(query => query.field === props.field)
    if (index !== -1) {
      const newQuery = [...query.value]
      newQuery[index] = newValue
      query.value = newQuery
    }
    else {
      query.value = [...query.value, newValue]
    }
  },
})
const whereQueryItemSupData = computed({
  get() {
    return supData.value[props.field] ?? null
  },
  set(newValue) {
    const newSupData = cloneJson(supData.value)
    newSupData[props.field] = newValue
    supData.value = newSupData
  },
})
function handleRemove() {
  if (props.onRemove) {
    props.onRemove(props.field as string)
  }
}

const itemRef = ref<HTMLElement | null>(null)
function focus() {
  itemRef.value?.focus()
}
defineExpose({ focus })
</script>

<template>
  <div v-if="!option">
    Unknown Field
  </div>
  <RTableWhereQueryInput
    v-else-if="option.type === 'input'"
    ref="itemRef"
    v-model:where-query-item="whereQueryItem"
    :label="option.label"
    :opr="option.opr"
    :disabled="loading"
    :size="size"
    @remove="handleRemove"
    @keyup.enter="triggerQuery"
  />
  <RTableWhereQuerySelect
    v-else-if="option.type === 'select'"
    ref="itemRef"
    v-model:where-query-item="whereQueryItem"
    :label="option.label"
    :opr="option.opr"
    :at-least-one-selected="false"
    :options="option.options ?? []"
    :disabled="loading"
    :size="size"
    @remove="handleRemove"
  />
  <RTableWhereQueryAsyncSelect
    v-else-if="option.type === 'asyncSelect'"
    ref="itemRef"
    v-model:where-query-item="whereQueryItem"
    v-model:where-query-item-sup-data="whereQueryItemSupData"
    :label="option.label"
    :opr="option.opr"
    :disabled="loading"
    :size="size"
    :search-fn="option.searchFn"
    :search-fields="option.searchFields ?? []"
    :label-field="option.labelField ?? 'QueryUnknownLabelField'"
    :value-field="option.valueField ?? 'QueryUnknownValueField'"
    :render-option-from-data="option.renderOptionFromData"
    :order-query="option.orderQuery"
    @remove="handleRemove"
  />
  <RTableWhereQueryDateRangePicker
    v-else-if="option.type === 'dateRange'"
    ref="itemRef"
    v-model:where-query-item="whereQueryItem"
    :label="option.label"
    :opr="option.opr"
    :disabled="loading"
    :size="size"
    :format="option.format"
    class="col-span-1 sm:col-span-2"
    @remove="handleRemove"
  />
  <RTableWhereQueryDatePicker
    v-else-if="option.type === 'date'"
    ref="itemRef"
    v-model:where-query-item="whereQueryItem"
    :label="option.label"
    :opr="option.opr"
    :disabled="loading"
    :size="size"
    :format="option.format"
    @remove="handleRemove"
  />
</template>
