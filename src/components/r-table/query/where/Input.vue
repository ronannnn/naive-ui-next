<script setup lang="ts">
import type { InputInst } from 'naive-ui'
import { RIconDelete } from '~/components/r-icons'
import type { RDropdownButtonOption, Size } from '~/types'

const props = withDefaults(defineProps<{
  label: string
  opr?: Query.WhereOpr
  onRemove?: () => void
  disabled?: boolean
  size?: Size
}>(), {
  size: 'medium',
})
const whereQueryItem = defineModel<Query.WhereItem<any>>('whereQueryItem', { required: true })
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

const inputRef = ref<InputInst | null>(null)
function focus() {
  inputRef.value?.focus()
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
  <div class="relative w-full sm:w-auto">
    <n-input-group>
      <n-input
        ref="inputRef"
        v-model:value="queryValue"
        :size="size"
        placeholder=""
        clearable
        :disabled="disabled"
        @focus="inputFocus = true"
        @blur="inputFocus = false"
      >
        <template #prefix>
          <RIconEdit :class="placeholderColor" />
        </template>
      </n-input>
      <RButtonDragDropdown
        class="where-query-handle cursor-move"
        :class="placeholderColor"
        :size="size"
        :dropdown-button-options="dropdownOptions"
      />
    </n-input-group>
    <span
      class="pointer-events-none absolute start-7.5 top-0.75 z-30 max-w-3/5 truncate px-0.5 backdrop-blur transition-all"
      :class="`${moveUp ? movedLabelClass : originalLabelClass} ${placeholderColor}`"
    >
      {{ label }}
    </span>
  </div>
</template>
