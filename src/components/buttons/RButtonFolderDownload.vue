<script setup lang="ts">
import type { RTooltipButtonProps } from '~/components/buttons'

const props = defineProps<RTooltipButtonProps>()
</script>

<template>
  <TooltipButton v-bind="props">
    <template #icon>
      <RIconFolderDownload />
    </template>
    <template #default>
      <slot />
    </template>
  </TooltipButton>
</template>
