<script setup lang="ts">
import { isVNode } from 'vue'
import type { RLabelValueRenderProps } from './types'

defineProps<RLabelValueRenderProps>()
</script>

<template>
  <div class="flex-col">
    <n-ellipsis class="text-gray-4">
      {{ label }}
    </n-ellipsis>
    <component :is="value" v-if="isVNode(value)" class="font-medium leading-4" />
    <div v-else class="font-medium leading-4">
      {{ value }}
    </div>
  </div>
</template>
