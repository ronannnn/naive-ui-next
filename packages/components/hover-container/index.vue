<script setup lang="ts">
import { NTooltip } from 'naive-ui'
import { computed } from 'vue'
import type { HoverContainerProps } from './types'

const props = withDefaults(defineProps<HoverContainerProps>(), {
  tooltipContent: '',
  placement: 'bottom',
  contentClass: '',
})

const showTooltip = computed(() => Boolean(props.tooltipContent))
</script>

<template>
  <!-- use div here so class can be passed in -->
  <div h-7>
    <NTooltip :placement="placement" trigger="hover" :disabled="!showTooltip">
      <template #trigger>
        <div class="h-full flex-center cursor-pointer rounded px-2 transition-all hover:(bg-#f6f6f6 dark:bg-#333)">
          <slot />
        </div>
      </template>
      {{ tooltipContent }}
    </NTooltip>
  </div>
</template>
