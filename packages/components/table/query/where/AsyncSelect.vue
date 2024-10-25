<script lang="ts" setup>
import { NInputGroup } from 'naive-ui'
import { computed, h, ref, watch } from 'vue'
import type { SelectInst } from 'naive-ui'
import type { VNode } from 'vue'
import { RSelect, RTooltipButton } from '~/components'
import type { RDropdownButtonOption } from '~/components/buttons/dropdown-button'

const props = withDefaults(defineProps<{
  class?: string
  label: string
  opr?: Query.WhereOpr
  onRemove?: () => void
  atLeastOneSelected?: boolean
  disabled?: boolean
  size?: NaiveUiTypes.Size
  // RSelect props
  searchFn?: (query: Query.Template<any>) => Promise<Api.RequestResult<Api.PageResult<any>>>
  searchFields: string[]
  labelField: string
  valueField: string
  renderOptionFromData?: (model: any) => VNode
  orderQuery?: Query.Order<any>
}>(), {
  atLeastOneSelected: false,
  showFooter: false,
  size: 'small',
})

const whereQueryItemSupData = defineModel<any>('whereQueryItemSupData', { required: true })
const whereQueryItem = defineModel<Query.WhereItem<any>>('whereQueryItem', { required: true })
watch(
  () => whereQueryItem.value,
  () => {
    if (!whereQueryItem.value.opr) {
      whereQueryItem.value = { ...whereQueryItem.value, opr: props.opr ?? 'in' }
    }
  },
  { immediate: true },
)

const selectRef = ref<SelectInst | null>(null)

const queryValue = computed<(string | number)[]>({
  get() {
    return whereQueryItem.value.value ?? []
  },
  set(newValue) {
    whereQueryItem.value = { ...whereQueryItem.value, value: newValue }
  },
})
const isValuesEmpty = computed(() => queryValue.value?.length === 0)

const dropdownOptions = computed<RDropdownButtonOption[]>(() => [
  {
    label: () => h('span', { style: { color: 'red' } }, '删除该查询条件'),
    key: 'delete',
    icon: () => h('div', { class: 'i-tabler-trash', style: { color: 'red' } }),
    syncFn: () => props.onRemove?.(),
  },
])

function focus() {
  selectRef.value?.focus()
}
defineExpose({ focus })
</script>

<template>
  <NInputGroup>
    <RSelect
      ref="selectRef"
      v-model:value="queryValue"
      :init-model="whereQueryItemSupData"
      :size="size"
      :placeholder="label"
      :disabled="disabled"
      multiple
      :search-fn="searchFn"
      :search-fields="searchFields"
      :label-field="labelField"
      :value-field="valueField"
      :render-option-from-data="renderOptionFromData"
      :trigger-after-selected="models => whereQueryItemSupData = models"
      :order-query="orderQuery"
    />
    <RTooltipButton
      class="where-query-handle cursor-move"
      :class="isValuesEmpty ? 'text-placeholder' : 'text-gray-5'"
      :size="size"
      icon-class="i-tabler-drag-drop"
      :dropdown-button-options="dropdownOptions"
    />
  </NInputGroup>
</template>
