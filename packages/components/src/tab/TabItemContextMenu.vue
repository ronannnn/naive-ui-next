<script setup lang="ts">
import { NDropdown } from 'naive-ui'
import { computed, h } from 'vue'
import type { DropdownOption } from 'naive-ui'

const props = defineProps<{
  /** ClientX */
  x: number
  /** ClientY */
  y: number
  tabId: string
}>()

const emit = defineEmits<{
  closeTab: [string]
  closeTabs: [string[]]
  closeLeftTabs: [string]
  closeRightTabs: [string]
}>()

const visible = defineModel<boolean>('visible')

const options = computed<DropdownOption[]>(() => {
  const opts: DropdownOption[] = [
    {
      key: 'closeAll',
      label: '关闭全部',
      icon: () => h('div', { class: 'i-tabler-x' }),
    },
    {
      key: 'closeOther',
      label: '关闭其他',
      icon: () => h('div', { class: 'i-tabler-arrow-bar-both' }),
    },
    {
      key: 'closeLeft',
      label: '关闭左侧',
      icon: () => h('div', { class: 'i-tabler-arrow-bar-left' }),
    },
    {
      key: 'closeRight',
      label: '关闭右侧',
      icon: () => h('div', { class: 'i-tabler-arrow-bar-right' }),
    },
    {
      key: 'closeCurrent',
      label: '关闭当前',
      icon: () => h('div', { class: 'i-tabler-circle-x' }),
    },
  ]
  return opts
})

function hideDropdown() {
  visible.value = false
}

const dropdownAction: Record<string, () => void> = {
  closeCurrent() {
    emit('closeTab', props.tabId)
  },
  closeOther() {
    emit('closeTabs', [props.tabId])
  },
  closeLeft() {
    emit('closeLeftTabs', props.tabId)
  },
  closeRight() {
    emit('closeRightTabs', props.tabId)
  },
  closeAll() {
    emit('closeTabs', [])
  },
}

function handleDropdown(optionKey: string) {
  dropdownAction[optionKey]?.()
  hideDropdown()
}
</script>

<template>
  <NDropdown
    :show="visible"
    placement="bottom-start"
    trigger="manual"
    :x="x"
    :y="y"
    :options="options"
    @clickoutside="hideDropdown"
    @select="handleDropdown"
  />
</template>
