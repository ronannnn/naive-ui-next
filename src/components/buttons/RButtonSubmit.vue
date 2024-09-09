<script setup lang="ts">
import type { RTooltipButtonProps } from '~/types'

const props = defineProps<RTooltipButtonProps>()
</script>

<template>
  <TooltipButton v-bind="props">
    <template #icon>
      <RIconUpload />
    </template>
    <template #default>
      <slot>
        {{ $t('button.submit') }}
      </slot>
    </template>
  </TooltipButton>
</template>
