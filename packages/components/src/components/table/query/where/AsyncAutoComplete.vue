<script lang="ts" setup>
import type { AutoCompleteInst } from 'naive-ui'
import type { Size } from 'naive-ui/es/select/src/interface'
import { computed, h, ref, watch } from 'vue'
import type { DropdownButtonOption } from '~/src/components'
import type { PageResult, QueryTemplate, QueryWhere, QueryWhereItem, QueryWhereOpr, RequestResult } from '~/src/types'

const props = withDefaults(defineProps<{
  class?: string
  label: string
  opr?: QueryWhereOpr
  onRemove?: () => void
  disabled?: boolean
  size?: Size
  // RAutoComplete props
  searchFields: string[]
  labelField: string
  valueField?: string
  searchFn?: (query: QueryTemplate<any>) => Promise<RequestResult<PageResult<any>>>
  extraWhereQueryInitValue?: QueryWhere<any>
  distinct?: boolean
  empty?: string
  orOrAnd?: 'or' | 'and'
}>(), {
  valueField: 'id',
  empty: '未查询到数据，该项可自由填写',
  orOrAnd: 'or',
  size: 'small',
})

const whereQueryItem = defineModel<QueryWhereItem<any>>('whereQueryItem', { required: true })
watch(
  () => whereQueryItem.value,
  () => {
    if (!whereQueryItem.value.opr) {
      whereQueryItem.value = { ...whereQueryItem.value, opr: props.opr ?? 'like' }
    }
  },
  { immediate: true },
)

const queryValue = computed<string>({
  get() {
    return whereQueryItem.value.value
  },
  set(newValue) {
    whereQueryItem.value = { ...whereQueryItem.value, value: newValue }
  },
})
const inputFocus = ref(false)
const isValueEmpty = computed(() => (queryValue.value?.length ?? 0) === 0)
const moveUp = computed(() => inputFocus.value || !isValueEmpty.value)
const movedLabelClass = computed<string>(() => {
  switch (props.size) {
    case 'small':
      return 'text-[12px] -translate-y-[15px] -translate-x-3.5'
    case 'medium':
      return 'text-[14px] -translate-y-[16px]'
    case 'large':
      return 'text-[16px] -translate-y-[18px]'
    default:
      return 'text-[14px] -translate-y-[15px]'
  }
})
const originalLabelClass = computed<string>(() => {
  switch (props.size) {
    case 'small':
      return 'text-[14px] translate-y-0'
    case 'medium':
      return 'text-[16px] translate-y-0.2'
    case 'large':
      return 'text-[20px] translate-y-0'
    default:
      return 'text-[14px] translate-y-0'
  }
})

const placeholderColor = computed(() => isValueEmpty.value ? 'text-placeholder' : 'text-gray-5')

const dropdownOptions = computed<DropdownButtonOption[]>(() => [
  {
    label: () => h('span', { style: { color: 'red' } }, '删除该查询条件'),
    key: 'delete',
    icon: () => h('div', { class: 'i-tabler-trash', style: { color: 'red' } }),
    syncFn: () => props.onRemove?.(),
  },
])

const acRef = ref<AutoCompleteInst | null>(null)
function focus() {
  acRef.value?.focus()
}
defineExpose({ focus })
</script>

<template>
  <div class="relative w-full sm:w-auto">
    <n-input-group>
      <RAutoComplete
        ref="acRef"
        v-model:value="queryValue"
        :size="size"
        :search-fields="searchFields"
        :label-field="labelField"
        :value-field="valueField"
        :search-fn="searchFn"
        :extra-where-query-init-value="extraWhereQueryInitValue"
        :distinct="distinct"
        :empty="empty"
        :or-or-and="orOrAnd"
        placeholder=""
        @focus="inputFocus = true"
        @blur="inputFocus = false"
      >
        <template #prefix>
          <IconEdit :class="placeholderColor" />
        </template>
      </RAutoComplete>
      <ButtonDragDropdown
        class="where-query-handle cursor-move"
        :class="isValueEmpty ? 'text-placeholder' : 'text-gray-5'"
        :size="size"
        :dropdown-button-options="dropdownOptions"
      />
    </n-input-group>
    <span
      class="pointer-events-none absolute start-7.5 top-0.75 z-30 px-0.5 backdrop-blur transition-all max-w-3/5 truncate"
      :class="`${moveUp ? movedLabelClass : originalLabelClass} ${placeholderColor}`"
    >
      {{ label }}
    </span>
  </div>
</template>
