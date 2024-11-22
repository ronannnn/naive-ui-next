<script setup lang="ts">
import type { TabProps } from './types'
import { RTabList } from '.'

const props = defineProps<TabProps>()
</script>

<template>
  <div flex-y-center px-2 :style="{ height: `${tabHeight}px` }">
    <slot name="prefix" />
    <RTabList v-bind="props" />
    <slot name="suffix" />
  </div>
</template>
