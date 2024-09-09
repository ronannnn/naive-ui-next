<script setup lang="ts">
import type { RTooltipButtonProps } from '~/types'

const props = defineProps<RTooltipButtonProps>()
</script>

<template>
  <TooltipButton v-bind="props">
    <template #icon>
      <RIconBack />
    </template>
    <template #default>
      <slot />
    </template>
  </TooltipButton>
</template>
