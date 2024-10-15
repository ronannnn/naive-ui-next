<script setup lang="ts">
import type { SelectOption, SelectRenderLabel } from 'naive-ui'
import { RIconCalendar, RIconEdit, RIconSelector } from '~/components/r-icons'
import { RTableWhereQueryItem } from '.'
import type { WhereQueryProps } from '..'

const props = defineProps<WhereQueryProps<any>>()

// 新增查询条件相关
const unselectedWhereOptions = computed<SelectOption[]>(() => {
  return props.whereOptions.filter(option => !props.whereQueryOptionKeys?.includes(option.field as string)).map(option => ({
    label: option.label,
    value: option.field,
  } as SelectOption))
})
const renderLabel: SelectRenderLabel = (option) => {
  const foundOption = props.whereOptions.find(o => o.field === option.value)
  if (foundOption) {
    let iconVNode = foundOption.icon
    if (!foundOption.icon) {
      switch (foundOption.type) {
        case 'select':
          iconVNode = () => h(RIconSelector)
          break
        case 'input':
          iconVNode = () => h(RIconEdit)
          break
        case 'date':
        case 'dateRange':
          iconVNode = () => h(RIconCalendar)
          break
      }
    }
    return h('div', { class: 'flex items-center' }, [
      iconVNode && iconVNode(),
      h('span', { class: 'ml-2' }, foundOption.label),
    ])
  }
  return option.label as string
}
const itemRefMap = ref<Map<string, InstanceType<typeof RTableWhereQueryItem>>>(new Map())
function onSelectFilter(field: string) {
  props.onUpdateWhereQueryOptionKeys([...(props.whereQueryOptionKeys ?? []), field])
  props.onUpdateWhereQuery([...props.whereQuery, { field, opr: null, value: null }])
  nextTick(() => {
    itemRefMap.value.get(field)?.focus()
  })
}
function onRemoveFilter(field: string) {
  const newWhereQuerySupData = cloneJson<Record<string, any>>(props.whereQuerySupData)
  delete newWhereQuerySupData[field]
  props.onUpdateWhereQuerySupData(newWhereQuerySupData)
  props.onUpdateWhereQueryOptionKeys(props.whereQueryOptionKeys?.filter(key => key !== field) ?? [])
  props.onUpdateWhereQuery(props.whereQuery.filter(query => query.field !== field))
}

// reset query
function resetQuery() {
  props.onUpdateWhereQuerySupData({})
  props.onUpdateWhereQuery(props.defaultWhereQuery ?? [])
  // 重置查询options，但是保留当前的顺序
  const newOptionKeys = [...(props.whereQueryOptionKeys ?? [])]
  useArrayDifference(props.defaultWhereQueryOptionKeys ?? [], (props.whereQueryOptionKeys ?? [])).value.forEach((field) => {
    newOptionKeys.push(field)
  })
  // 删除可能不存在的options
  const filteredNewOptionsKeys = newOptionKeys.filter(key => props.whereOptions.some(whereOption => whereOption.field === key))
  props.onUpdateWhereQueryOptionKeys(filteredNewOptionsKeys)
}

// drag related
const dragWhereQueryOptionKeys = computed<string[]>({
  get() {
    return props.whereQueryOptionKeys ?? []
  },
  set(newKeys) {
    props.onUpdateWhereQueryOptionKeys(newKeys)
  },
})
</script>

<template>
  <n-card size="small">
    <RDnd
      v-model="dragWhereQueryOptionKeys"
      handle=".where-query-handle"
      dnd-class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3"
    >
      <RTableWhereQueryItem
        v-for="optionKey in dragWhereQueryOptionKeys"
        :key="optionKey"
        :ref="(el) => itemRefMap.set(optionKey, el as any)"
        :query="whereQuery"
        :sup-data="whereQuerySupData"
        :options="whereOptions"
        :field="optionKey"
        :loading="loading"
        :trigger-query="triggerQuery"
        :size="size"
        @remove="onRemoveFilter"
        @update:query="onUpdateWhereQuery"
        @update:sup-data="onUpdateWhereQuerySupData"
      />
    </RDnd>
    <n-divider dashed class="py-3 !m-0" />
    <div class="flex-center">
      <div flex-1>
        <slot name="action-left" />
      </div>
      <div flex-center flex-1 gap-3>
        <PopselectButton
          :popselect-options="unselectedWhereOptions"
          :render-label="renderLabel"
          dashed
          size="small"
          enable-search
          search-input-placeholder="搜索查询条件"
          class="flex-1 sm:flex-none"
          @update-value="onSelectFilter"
        >
          <template #icon>
            <RIconNew />
          </template>
          新增查询条件
        </PopselectButton>
        <n-button :size="size" type="primary" :loading="loading" @click="triggerQuery">
          {{ $t('button.query') }}
        </n-button>
        <n-button :size="size" :disabled="loading" @click="resetQuery">
          {{ $t('button.reset') }}
        </n-button>
      </div>
      <div flex-1>
        <slot name="action-right" />
      </div>
    </div>
  </n-card>
</template>
