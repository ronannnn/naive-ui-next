<script setup lang="ts">
import { NInput, NInputGroup } from 'naive-ui'
import { computed, h, ref, watch } from 'vue'
import type { InputInst } from 'naive-ui'
import { type RDropdownButtonOption, RTooltipButton } from '~/src/buttons'

const props = withDefaults(defineProps<{
  label: string
  opr?: Query.WhereOpr
  onRemove?: () => void
  disabled?: boolean
  size?: NaiveUiTypes.Size
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
    icon: () => h('div', { class: 'i-tabler-trash', style: { color: 'red' } }),
    syncFn: () => props.onRemove?.(),
  },
])
</script>

<template>
  <div class="relative w-full sm:w-auto">
    <NInputGroup>
      <NInput
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
          <div class="i-tabler-edit" :class="placeholderColor" />
        </template>
      </NInput>
      <RTooltipButton
        class="where-query-handle cursor-move"
        :class="placeholderColor"
        :size="size"
        :dropdown-button-options="dropdownOptions"
        icon-class="i-tabler-drag-drop"
      />
    </NInputGroup>
    <span
      class="pointer-events-none absolute start-7.5 top-0.75 z-30 max-w-3/5 truncate px-0.5 backdrop-blur transition-all"
      :class="`${moveUp ? movedLabelClass : originalLabelClass} ${placeholderColor}`"
    >
      {{ label }}
    </span>
  </div>
</template>
