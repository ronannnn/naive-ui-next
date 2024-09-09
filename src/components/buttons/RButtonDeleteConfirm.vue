<script setup lang="ts">
import type { RPopconfirmButtonProps } from '~/types'

const props = defineProps<RPopconfirmButtonProps>()
</script>

<template>
  <PopconfirmButton v-bind="props" :popconfirm-content="$t('msg.confirmDelete')">
    <template #icon>
      <RIconDelete />
    </template>
    <template #default>
      <slot />
    </template>
  </PopconfirmButton>
</template>
