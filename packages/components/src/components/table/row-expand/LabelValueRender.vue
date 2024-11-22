<script setup lang="ts">
import type { LabelValueRenderProps } from './types'
import { NEllipsis } from 'naive-ui'
import { isVNode } from 'vue'

defineProps<LabelValueRenderProps>()
</script>

<template>
  <div class="flex-col">
    <NEllipsis class="text-gray-4">
      {{ label }}
    </NEllipsis>
    <component :is="value" v-if="isVNode(value)" class="font-medium leading-4" />
    <div v-else class="font-medium leading-4">
      {{ value }}
    </div>
  </div>
</template>
