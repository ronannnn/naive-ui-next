<script setup lang="ts">
import type { RTooltipButtonProps } from '~/types'

const props = defineProps<RTooltipButtonProps>()
</script>

<template>
  <TooltipButton v-bind="props">
    <template #icon>
      <RIconQuery />
    </template>
    <template #default>
      <slot>{{ $t('button.query') }}</slot>
    </template>
  </TooltipButton>
</template>
