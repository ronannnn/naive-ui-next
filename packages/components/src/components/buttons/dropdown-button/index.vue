<script setup lang="ts">
import type { RDropdownButtonProps } from './types'
import { NButton, NDropdown } from 'naive-ui'
import { computed, ref } from 'vue'
import { findDropdownButtonOptionsKeyRecursively } from './utils'

const props = withDefaults(defineProps<RDropdownButtonProps>(), {
  trigger: 'click',
})
const fnLoading = ref(false)
const btnLoading = computed(() => fnLoading.value || props.loading)

async function onSelect(key: string | number) {
  const foundDropdownButtonOption = findDropdownButtonOptionsKeyRecursively(props.dropdownButtonOptions, key)
  if (!foundDropdownButtonOption) {
    console.warn('Popselect option not found, key is:', key)
    return
  }
  if (foundDropdownButtonOption.syncFn) {
    foundDropdownButtonOption.syncFn()
  }
  else if (foundDropdownButtonOption.asyncFn) {
    fnLoading.value = true
    try {
      await foundDropdownButtonOption.asyncFn()
    }
    catch (error) {
      console.error('Popselect option asyncFn error:', error)
    }
    fnLoading.value = false
  }
  else {
    console.warn('Popselect option has no syncFn or asyncFn, key is:', key)
  }
}
</script>

<template>
  <NDropdown
    :trigger="trigger"
    :disabled="btnLoading || props.disabled"
    :placement="dropdownPlacement"
    :options="dropdownButtonOptions"
    @select="onSelect"
  >
    <NButton v-bind="props" :loading="btnLoading" :disabled="disabled" @click="e => e.stopPropagation()">
      <template #icon>
        <slot name="icon">
          <div v-if="iconClass" :class="iconClass" />
        </slot>
      </template>
      <template #default>
        <slot />
      </template>
    </NButton>
  </NDropdown>
</template>
