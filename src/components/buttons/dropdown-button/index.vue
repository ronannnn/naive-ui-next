<script setup lang="ts">
import { findDropdownButtonOptionsKeyRecursively } from './utils'
import type { RDropdownButtonProps } from '.'

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
  <n-dropdown
    :trigger="trigger"
    :disabled="btnLoading || props.disabled"
    :placement="dropdownPlacement"
    :options="dropdownButtonOptions"
    @select="onSelect"
  >
    <n-button v-bind="props" :loading="btnLoading" :disabled="disabled" @click="e => e.stopPropagation()">
      <template #icon>
        <slot name="icon" />
      </template>
      <template #default>
        <slot />
      </template>
    </n-button>
  </n-dropdown>
</template>
