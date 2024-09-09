<script setup lang="ts">
import type { RTooltipButtonProps } from '~/types'

const props = defineProps<RTooltipButtonProps>()
</script>

<template>
  <TooltipButton v-bind="props">
    <template #icon>
      <RIconRefresh />
    </template>
    <template #default>
      <slot>{{ $t('button.refresh') }}</slot>
    </template>
  </TooltipButton>
</template>
