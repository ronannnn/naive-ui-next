<script setup lang="ts">
import type { PopconfirmButtonProps } from './types'
import { NButton, NPopconfirm } from 'naive-ui'
import { computed, ref } from 'vue'

const props = defineProps<PopconfirmButtonProps>()

const open = ref(false)
const fnLoading = ref(false)
const btnLoading = computed(() => fnLoading.value || props.loading)

async function onClick(e: MouseEvent) {
  e.stopPropagation()
  if (props.disabled) {
    return
  }
  open.value = true
}

async function handlePositiveClick(e: MouseEvent) {
  e.stopPropagation()

  if (props.disabled) {
    return
  }
  if (props.onAsyncConfirm) {
    try {
      fnLoading.value = true
      await props.onAsyncConfirm(e)
    }
    finally {
      fnLoading.value = false
    }
  }
  else if (props.onConfirm) {
    props.onConfirm(e)
  }
}
</script>

<template>
  <NPopconfirm
    v-model:show="open"
    :disabled="btnLoading || props.disabled"
    :negative-button-props="{ size: 'tiny', round: true, loading: btnLoading }"
    :positive-button-props="{ size: 'tiny', round: true, disabled: btnLoading }"
    positive-text="确认"
    negative-text="取消"
    @positive-click="handlePositiveClick"
    @clickoutside="open = false"
    @negative-click="open = false"
  >
    <template #trigger>
      <NButton
        v-bind="props"
        :loading="btnLoading"
        :disabled="disabled"
        @click="onClick"
      >
        <template #icon>
          <slot name="icon">
            <div v-if="iconClass" :class="iconClass" />
          </slot>
        </template>
        <template #default>
          <slot />
        </template>
      </NButton>
    </template>
    {{ props.popconfirmContent }}
  </NPopconfirm>
</template>
