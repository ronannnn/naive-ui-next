<script setup lang="ts">
import type { SelectOption } from 'naive-ui'
import type { RPopselectButtonProps } from '~/types'

const props = withDefaults(defineProps<RPopselectButtonProps>(), {
  trigger: 'click',
})
const fnLoading = ref(false)
const btnLoading = computed(() => fnLoading.value || props.loading)
const searchContent = ref('')
const filteredOptions = computed<SelectOption[]>(() => props.popselectOptions.filter((option) => {
  if (!props.enableSearch || isEmptyString(searchContent.value)) {
    return true
  }
  return String(option.label).includes(searchContent.value)
}))
</script>

<template>
  <n-popselect
    :trigger="trigger"
    :disabled="btnLoading || props.disabled"
    :placement="popselectPlacement"
    :options="filteredOptions"
    :render-label="renderLabel"
    :width="width"
    scrollable
    @update-value="onUpdateValue"
  >
    <n-button v-bind="props" :loading="btnLoading" :disabled="disabled">
      <template #icon>
        <slot name="icon" />
      </template>
      <template #default>
        <slot />
      </template>
    </n-button>
    <template v-if="props.enableSearch" #header>
      <n-input
        v-model:value="searchContent"
        clearable
        :placeholder="searchInputPlaceholder"
        size="small"
      />
    </template>
  </n-popselect>
</template>
