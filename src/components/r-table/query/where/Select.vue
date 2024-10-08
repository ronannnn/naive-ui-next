<script lang="ts" setup>
import type { SelectInst, SelectOption } from 'naive-ui'
import { RIconDelete } from '~/components/r-icons'
import type { RDropdownButtonOption, Size } from '~/types'

const props = withDefaults(defineProps<{
  class?: string
  label: string
  options: SelectOption[]
  opr?: Query.WhereOpr
  onRemove?: () => void
  atLeastOneSelected?: boolean
  disabled?: boolean
  showFooter?: boolean
  size?: Size
}>(), {
  atLeastOneSelected: false,
  showFooter: false,
  size: 'medium',
})

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

const show = ref(false)

const queryValue = computed<(string | number)[]>({
  get() {
    return whereQueryItem.value.value ?? []
  },
  set(newValue) {
    whereQueryItem.value = { ...whereQueryItem.value, value: newValue }
  },
})
const isValuesEmpty = computed(() => queryValue.value?.length === 0)

// set fn
function selectAll() {
  queryValue.value = props.options.map(option => option.value ?? '')
}
function selectNone() {
  queryValue.value = []
}
function selectReverse() {
  const reverseSet = new Set(props.options.map(option => option.value ?? ''))
  queryValue.value.forEach(val => reverseSet.delete(val))
  queryValue.value = Array.from(reverseSet)
}

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
    <n-select
      ref="selectRef"
      v-model:value="queryValue"
      v-model:show="show"
      :size="size"
      :placeholder="label"
      :options="options"
      :disabled="disabled"
      max-tag-count="responsive"
      filterable
      multiple
      show-on-focus
      clearable
    >
      <template v-if="showFooter" #action>
        <div flex-center gap-1 p-1>
          <n-button size="small" @click="selectAll">
            全选
          </n-button>
          <n-button size="small" @click="selectNone">
            {{ $t('button.reset') }}
          </n-button>
          <n-button size="small" @click="selectReverse">
            反选
          </n-button>
          <n-button size="small" @click="show = false">
            {{ $t('button.confirm') }}
          </n-button>
        </div>
      </template>
    </n-select>
    <RButtonDragDropdown
      class="where-query-handle cursor-move"
      :class="isValuesEmpty ? 'text-placeholder' : 'text-gray-5'"
      :size="size"
      :dropdown-button-options="dropdownOptions"
    />
  </n-input-group>
</template>
