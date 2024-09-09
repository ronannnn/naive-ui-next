<script setup lang="ts">
import type { RTooltipButtonProps } from '~/types'

const props = defineProps<RTooltipButtonProps>()
</script>

<template>
  <TooltipButton v-bind="props">
    <template #icon>
      <RIconRollback />
    </template>
    <template #default>
      <slot />
    </template>
  </TooltipButton>
</template>
