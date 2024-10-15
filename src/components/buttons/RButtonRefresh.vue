<script setup lang="ts">
import type { RTooltipButtonProps } from '~/components/buttons'

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
