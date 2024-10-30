<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus'
import { dndProps } from './types'

defineOptions({
  name: 'RDnd',
})
defineProps(dndProps)
const model = defineModel<any>()
</script>

<template>
  <div>
    <slot name="header" />
    <VueDraggable
      v-model="model"
      :class="dndClass"
      :animation="200"
      :handle="handle"
      :group="group"
      ghost-class="drag-ghost"
      @add="onAfterDrag"
    >
      <slot />
    </VueDraggable>
  </div>
</template>

<style>
.drag-ghost {
  opacity: 0;
}
</style>
