<script lang="ts" setup>
import dayjs, { type OpUnitType } from 'dayjs'
import type { DatePickerInst } from 'naive-ui'
import type { Shortcuts } from 'naive-ui/es/date-picker/src/interface'
import { RIconDelete } from '~/components/r-icons'
import type { RDropdownButtonOption, Size } from '~/types'

const props = withDefaults(defineProps<{
  label: string
  opr?: Query.WhereOpr
  onRemove?: () => void
  ofUnit?: OpUnitType
  shortcuts?: Shortcuts
  disabled?: boolean
  size?: Size
  format?: string
}>(), {
  ofUnit: 'day',
  size: 'medium',
})
const whereQueryItem = defineModel<Query.WhereItem<any>>('whereQueryItem', { required: true })
watch(
  () => whereQueryItem.value,
  () => {
    if (!whereQueryItem.value.opr) {
      whereQueryItem.value = { ...whereQueryItem.value, opr: props.opr ?? 'eq' }
    }
  },
  { immediate: true },
)
const queryValue = computed<string | null>({
  get() {
    return whereQueryItem.value.value
  },
  set(newValue) {
    whereQueryItem.value = { ...whereQueryItem.value, value: newValue }
  },
})
const formattedValue = computed<number | null>({
  get() {
    if (queryValue.value) {
      return dayjs(queryValue.value).startOf(props.ofUnit).valueOf()
    }
    return null
  },
  set(newValue) {
    if (newValue) {
      queryValue.value = dayjs(newValue).startOf(props.ofUnit).format(props.format)
    }
    else {
      queryValue.value = null
    }
  },
})
const isValueEmpty = computed(() => !queryValue.value)

const datePickerFocus = ref(false)
const moveUp = computed(() => datePickerFocus.value || queryValue.value)

const movedLabelClass = computed<string>(() => {
  switch (props.size) {
    case 'small':
      return 'text-[12px] -translate-y-[15px]'
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
      return 'text-[14px] -translate-y-0'
    case 'medium':
      return 'text-[16px] -translate-y-0'
    case 'large':
      return 'text-[20px] -translate-y-0'
    default:
      return 'text-[14px] -translate-y-0'
  }
})

const placeholderColor = computed(() => isValueEmpty.value ? 'text-placeholder' : 'text-gray-5')

const datePickerRef = ref<DatePickerInst | null>(null)
function focus() {
  datePickerRef.value?.focus()
}
defineExpose({ focus })

const dropdownOptions = computed<RDropdownButtonOption[]>(() => [
  {
    label: () => h('span', { style: { color: 'red' } }, '删除该查询条件'),
    key: 'delete',
    icon: () => h(RIconDelete, { style: { color: 'red' } }),
    syncFn: () => props.onRemove?.(),
  },
])
</script>

<template>
  <div class="relative">
    <n-input-group>
      <n-date-picker
        ref="datePickerRef"
        v-model:value="formattedValue"
        class="flex-1"
        :first-day-of-week="0"
        clearable
        :size="size"
        close-on-select
        placeholder=""
        :shortcuts="shortcuts"
        :disabled="disabled"
        @focus="datePickerFocus = true"
        @blur="datePickerFocus = false"
      />
      <RButtonDragDropdown
        class="where-query-handle cursor-move"
        :class="placeholderColor"
        :size="size"
        :dropdown-button-options="dropdownOptions"
      />
    </n-input-group>
    <span
      class="pointer-events-none absolute start-2 top-1 z-30 px-0.5 text-placeholder backdrop-blur transition-all"
      :class="`${moveUp ? movedLabelClass : originalLabelClass} ${placeholderColor}`"
    >
      {{ label }}
    </span>
  </div>
</template>
