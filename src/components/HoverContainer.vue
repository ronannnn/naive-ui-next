<script setup lang="ts">
import type { PopoverPlacement } from 'naive-ui'

interface Props {
  /** tooltip显示文本 */
  tooltipContent?: string
  /** tooltip的位置 */
  placement?: PopoverPlacement
  /** class类 */
  contentClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  tooltipContent: '',
  placement: 'bottom',
  contentClass: '',
})

const showTooltip = computed(() => Boolean(props.tooltipContent))
</script>

<template>
  <!-- use div here so class can be passed in -->
  <div h-7>
    <n-tooltip :placement="placement" trigger="hover" :disabled="!showTooltip">
      <template #trigger>
        <div class="h-full flex-center cursor-pointer rounded px-2 transition-all hover:(bg-#f6f6f6 dark:bg-#333)">
          <slot />
        </div>
      </template>
      {{ tooltipContent }}
    </n-tooltip>
  </div>
</template>
