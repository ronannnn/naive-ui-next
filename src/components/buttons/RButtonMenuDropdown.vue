<script setup lang="ts">
import type { RDropdownButtonProps } from '~/components/buttons'

const props = defineProps<RDropdownButtonProps>()
</script>

<template>
  <DropdownButton v-bind="props">
    <template #icon>
      <RIconMenu />
    </template>
    <template #default>
      <slot />
    </template>
  </DropdownButton>
</template>
