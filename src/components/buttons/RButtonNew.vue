<script setup lang="ts">
import type { RTooltipButtonProps } from '~/types'

const props = defineProps<RTooltipButtonProps>()
</script>

<template>
  <TooltipButton v-bind="props">
    <template #icon>
      <RIconNew />
    </template>
    <template #default>
      <slot>{{ $t('button.new') }}</slot>
    </template>
  </TooltipButton>
</template>
