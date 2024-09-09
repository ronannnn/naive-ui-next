<script setup lang="ts">
import type { RTooltipButtonProps } from '~/types'

const props = defineProps<RTooltipButtonProps>()
</script>

<template>
  <TooltipButton v-bind="props">
    <template #icon>
      <RIconExcel />
    </template>
    <template #default>
      <slot>导出Excel</slot>
    </template>
  </TooltipButton>
</template>
