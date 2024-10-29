<script setup lang="ts">
import { RTabList } from '.'
import type { RTabProps } from './types'

const props = defineProps<RTabProps>()
</script>

<template>
  <div flex-y-center px-2 :style="{ height: `${tabHeight}px` }">
    <slot name="prefix" />
    <RTabList v-bind="props" />
    <slot name="suffix" />
  </div>
</template>
