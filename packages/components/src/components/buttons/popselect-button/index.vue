<script setup lang="ts">
import { NButton, NInput, NPopselect } from 'naive-ui'
import { computed, ref } from 'vue'
import type { SelectOption } from 'naive-ui'
import { isEmptyString } from '~/src/composables'
import type { RPopselectButtonProps } from './types'

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
  <NPopselect
    :trigger="trigger"
    :disabled="btnLoading || props.disabled"
    :placement="popselectPlacement"
    :options="filteredOptions"
    :render-label="renderLabel"
    :width="width"
    scrollable
    @update-value="onUpdateValue"
  >
    <NButton v-bind="props" :loading="btnLoading" :disabled="disabled">
      <template #icon>
        <slot name="icon">
          <div :class="iconClass" />
        </slot>
      </template>
      <template #default>
        <slot />
      </template>
    </NButton>
    <template v-if="props.enableSearch" #header>
      <NInput
        v-model:value="searchContent"
        clearable
        :placeholder="searchInputPlaceholder"
        size="small"
      />
    </template>
  </NPopselect>
</template>
