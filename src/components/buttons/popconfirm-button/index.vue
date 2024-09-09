<script setup lang="ts">
import type { RPopconfirmButtonProps } from '~/types'

const props = defineProps<RPopconfirmButtonProps>()

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
  <n-popconfirm
    v-model:show="open"
    :disabled="btnLoading || props.disabled"
    :negative-button-props="{ size: 'tiny', round: true, loading: btnLoading }"
    :positive-button-props="{ size: 'tiny', round: true, disabled: btnLoading }"
    :positive-text="$t('button.confirm')"
    :negative-text="$t('button.cancel')"
    @positive-click="handlePositiveClick"
    @clickoutside="open = false"
    @negative-click="open = false"
  >
    <template #trigger>
      <n-button
        v-bind="props"
        :loading="btnLoading"
        :disabled="disabled"
        @click="onClick"
      >
        <template #icon>
          <slot name="icon" />
        </template>
        <template #default>
          <slot />
        </template>
      </n-button>
    </template>
    {{ props.popconfirmContent }}
  </n-popconfirm>
</template>
