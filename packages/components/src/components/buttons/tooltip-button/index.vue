<script setup lang="ts">
import type { RTooltipButtonProps } from './types'
import { NButton, NTooltip } from 'naive-ui'
import { computed, ref } from 'vue'

const props = defineProps<RTooltipButtonProps>()

const fnLoading = ref(false)
const btnLoading = computed(() => fnLoading.value || props.loading)
async function handleClick(e: MouseEvent) {
  e.stopPropagation()

  if (props.disabled) {
    return
  }
  if (props.onAsyncClick) {
    try {
      fnLoading.value = true
      await props.onAsyncClick(e)
    }
    finally {
      fnLoading.value = false
    }
  }
  else if (props.onSyncClick) {
    props.onSyncClick(e)
  }
}
</script>

<template>
  <NTooltip
    :disabled="!props.tooltipContent"
    :placement="props.tooltipPlacement"
    :keep-alive-on-hover="props.keepAliveOnHover"
  >
    <template #trigger>
      <NButton v-bind="props" :loading="btnLoading" @click="handleClick">
        <template #icon>
          <slot name="icon">
            <div :class="iconClass" />
          </slot>
        </template>
        <template #default>
          <slot />
        </template>
      </NButton>
    </template>
    {{ props.tooltipContent }}
  </NTooltip>
</template>
