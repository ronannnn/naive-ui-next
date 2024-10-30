<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import { NSelect } from 'naive-ui'
import { computed, ref } from 'vue'
import type { SelectInst, SelectOption, SelectProps } from 'naive-ui'
import { isEmptyString, useSearching } from '~/src/composables'
import type { RSelectProps } from './types'

const props = withDefaults(defineProps<RSelectProps>(), {
  valueField: 'id',
  orderQuery: () => [{ field: 'createdAt', order: 'desc' }],
  size: 'small',
})
const value = defineModel<any>('value')

const selectRef = ref<SelectInst | null>(null)

const { searching, startSearching, endSearching } = useSearching()
const searchedData = ref<any[]>([])
const allData = computed(() => {
  const newSearchedData = [...searchedData.value]
  if (props.initModel) {
    if (Array.isArray(props.initModel)) {
      // initModel如果在newSearchedData中的存在则不添加，否则添加到最前面
      props.initModel.forEach((item) => {
        const initModelIndex = newSearchedData.findIndex(p => p[props.valueField] === item[props.valueField])
        if (initModelIndex === -1) {
          newSearchedData.unshift(item)
        }
      })
    }
    else {
      const initModelIndex = newSearchedData.findIndex(p => p[props.valueField] === props.initModel[props.valueField])
      if (initModelIndex !== -1) {
        newSearchedData.splice(initModelIndex, 1)
      }
      newSearchedData.unshift(props.initModel)
    }
  }
  return newSearchedData
})
const allOptions = computed(() => allData.value
  .map(p => ({ label: p[props.labelField], value: p[props.valueField] }))
  .filter(p => p.label && p.value),
)
const selected = ref(false)
const focused = ref(false)
async function handleSearch(searchStr: string) {
  if (!props.searchFn) {
    console.error('searchFn is required')
    return
  }
  // if blur, do not search
  if (!focused.value) {
    return
  }
  // if selected, do not search
  if (selected.value) {
    selected.value = false
    return
  }
  startSearching()
  try {
    const orQuery: Query.Where<any> = []
    if (!isEmptyString(searchStr)) {
      props.searchFields.forEach((field) => {
        orQuery.push({ field, opr: 'like', value: searchStr })
      })
    }
    const result = await props.searchFn({
      pagination: { pageNum: 1, pageSize: 10 },
      orderQuery: props.orderQuery,
      orQuery,
    })
    if (result.data) {
      searchedData.value = result.data.list
    }
  }
  finally {
    endSearching()
  }
}
const debouncedSearchFn = useDebounceFn(handleSearch, 512)
function onSelect(newVal: any) {
  selected.value = true
  value.value = newVal
  if (!props.triggerAfterSelected) {
    return
  }

  let triggerredData: any
  if (Array.isArray(newVal)) {
    triggerredData = []
    newVal.forEach((val) => {
      const foundItem = allData.value.find(p => p[props.valueField] === val)
      if (foundItem) {
        triggerredData.push(foundItem)
      }
    })
  }
  else {
    triggerredData = allData.value.find(p => p[props.valueField] === newVal)
    if (!triggerredData) {
      return
    }
  }
  props.triggerAfterSelected(triggerredData)
}
const renderLabel: SelectProps['renderLabel'] = (option: SelectOption) => {
  const foundModel = allData.value.find(p => p[props.valueField] === option.value)
  if (!foundModel) {
    return option.label as string
  }
  return props.renderOptionFromData ? props.renderOptionFromData(foundModel) : option.label as string
}

defineExpose({ focus: () => selectRef.value?.focus() })
</script>

<template>
  <NSelect
    ref="selectRef"
    :value="value"
    :placeholder="placeholder"
    :options="allOptions"
    :loading="searching || loading"
    :render-label="renderLabel"

    max-tag-count="responsive"
    clearable filterable remote show-on-focus
    :size="size"
    :multiple="multiple"
    :disabled="disabled"
    @update:value="onSelect"
    @search="debouncedSearchFn"
    @select="onSelect"
    @focus="async () => {
      focused = true
      await handleSearch('')
    }"
    @clear="() => {
      searchedData = []
      value = null
    }"
    @blur="focused = false"
  />
</template>
