<script setup lang="ts">
import type { DropdownOption } from 'naive-ui'
import type { RTabSelectorProps } from '~/types'

const props = defineProps<RTabSelectorProps>()
const emit = defineEmits<{
  switchTab: [string]
}>()

const options = computed<DropdownOption[]>(() => {
  const result: DropdownOption[] = [
    {
      type: 'group',
      label: '已打开页面',
      key: 'toggle-locale',
      children: props.tabItems.map(tabItem => ({
        label: tabItem.label,
        key: tabItem.id,
        icon: () => h('div', { class: tabItem.icon }),
      })),
    },
  ]
  return result
})
</script>

<template>
  <n-dropdown :value="activeTabId" :options="options" @select="key => emit('switchTab', key)">
    <hover-container>
      <div class="i-tabler-menu-2 text-4" />
    </hover-container>
  </n-dropdown>
</template>
