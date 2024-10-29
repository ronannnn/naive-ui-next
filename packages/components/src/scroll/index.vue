<script setup lang="ts">
import BScroll from '@better-scroll/core'
import { useElementSize } from '@vueuse/core'
import { computed, onMounted, ref, watch } from 'vue'
import type { ScrollProps } from './types'

// copy from soybean admin
const props = defineProps<ScrollProps>()

const bsWrapper = ref<HTMLElement>()
const bsContent = ref<HTMLElement>()
const { width: wrapWidth } = useElementSize(bsWrapper)
const { width, height } = useElementSize(bsContent)

const instance = ref<BScroll>()
const isScrollY = computed(() => Boolean(props.options.scrollY))

function initBetterScroll() {
  if (!bsWrapper.value)
    return
  instance.value = new BScroll(bsWrapper.value, props.options)
}

// refresh BS when scroll element size changed
watch([() => wrapWidth.value, () => width.value, () => height.value], () => {
  instance.value?.refresh()
})

onMounted(() => {
  initBetterScroll()
})

defineExpose({ instance })
</script>

<template>
  <div ref="bsWrapper" class="h-full text-left">
    <div ref="bsContent" class="inline-block" :class="{ 'h-full': !isScrollY }">
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
