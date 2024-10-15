<script setup lang="ts">
import type { RTooltipButtonProps } from '~/components/buttons'

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
