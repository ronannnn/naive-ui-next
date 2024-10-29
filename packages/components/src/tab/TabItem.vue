<script setup lang="ts">
import { NButton } from 'naive-ui'
import type { RTabItemProps } from './types'

defineProps<{
  active: boolean
  tab: RTabItemProps
}>()
const emit = defineEmits<{
  close: []
}>()
function handleClose(e: MouseEvent) {
  e.stopPropagation()
  emit('close')
}
</script>

<template>
  <div
    class="min-w-16 flex-center whitespace-nowrap b-1 rounded-t-md b-solid b-b-none px-3 transition-all hover:cursor-pointer"
    :class="active ? 'text-primary bg-primary/10 b-primary/0 dark:b-primary-8' : 'b-gray-1 dark:b-gray-8 hover:(bg-#f6f6f6 dark:bg-#333)'"
  >
    <div :class="tab.icon" mr-3 />
    <slot />
    <NButton
      v-if="tab.closable"
      :type="active ? 'primary' : undefined"
      size="tiny"
      circle
      quaternary
      class="ml-2"
    >
      <template #icon>
        <div class="i-tabler-x" @click="handleClose" />
      </template>
    </NButton>
  </div>
</template>
