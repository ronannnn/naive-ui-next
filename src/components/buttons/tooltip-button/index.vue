<script setup lang="ts">
import type { RTooltipButtonProps } from '~/types'

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
  <n-tooltip
    :disabled="!props.tooltipContent"
    :placement="props.tooltipPlacement"
    :keep-alive-on-hover="props.keepAliveOnHover"
  >
    <template #trigger>
      <n-button v-bind="props" :loading="btnLoading" @click="handleClick">
        <template #icon>
          <slot name="icon" />
        </template>
        <template #default>
          <slot />
        </template>
      </n-button>
    </template>
    {{ props.tooltipContent }}
  </n-tooltip>
</template>
