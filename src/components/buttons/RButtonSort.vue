<script setup lang="ts">
import type { RTooltipButtonProps } from '~/types'

const props = defineProps<RTooltipButtonProps>()
</script>

<template>
  <TooltipButton v-bind="props">
    <template #icon>
      <RIconSort />
    </template>
    <template #default>
      <slot>{{ $t('button.sort') }}</slot>
    </template>
  </TooltipButton>
</template>
