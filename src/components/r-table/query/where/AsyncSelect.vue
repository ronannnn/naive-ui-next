<script lang="ts" setup>
import type { SelectInst } from 'naive-ui'
import type { RDropdownButtonOption } from '~/components/buttons/dropdown-button'
import { RIconDelete } from '~/components/r-icons'

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
    icon: () => h(RIconDelete, { style: { color: 'red' } }),
    syncFn: () => props.onRemove?.(),
  },
])

function focus() {
  selectRef.value?.focus()
}
defineExpose({ focus })
</script>

<template>
  <n-input-group>
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
    <ButtonDragDropdown
      class="where-query-handle cursor-move"
      :class="isValuesEmpty ? 'text-placeholder' : 'text-gray-5'"
      :size="size"
      :dropdown-button-options="dropdownOptions"
    />
  </n-input-group>
</template>
