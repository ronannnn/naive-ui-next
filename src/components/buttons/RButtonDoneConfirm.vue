<script setup lang="ts">
import type { RPopconfirmButtonProps } from '~/types'

const props = defineProps<RPopconfirmButtonProps>()
</script>

<template>
  <PopconfirmButton v-bind="props">
    <template #icon>
      <RIconDone />
    </template>
    <template #default>
      <slot />
    </template>
  </PopconfirmButton>
</template>
