<script setup lang="ts">
import type { FullContentButtonProps } from '~/types'

defineProps<FullContentButtonProps>()
const emit = defineEmits<{
  toggleFullContent: []
}>()
</script>

<template>
  <hover-container tooltip-content="窗口全屏" @click="emit('toggleFullContent')">
    <RIconMinimize v-if="isFullContent" text-4 />
    <RIconMaximize v-else text-4 />
  </hover-container>
</template>
