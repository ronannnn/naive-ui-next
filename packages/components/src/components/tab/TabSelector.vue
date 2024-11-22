<script setup lang="ts">
import type { DropdownOption } from 'naive-ui'
import type { TabSelectorProps } from './types'
import { NDropdown } from 'naive-ui'
import { computed, h } from 'vue'
import { RHoverContainer } from '~/src'

const props = defineProps<TabSelectorProps>()
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
  <NDropdown :value="activeTabId" :options="options" @select="key => emit('switchTab', key)">
    <RHoverContainer>
      <div class="i-tabler-menu-2 text-4" />
    </RHoverContainer>
  </NDropdown>
</template>
