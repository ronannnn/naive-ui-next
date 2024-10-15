<script setup lang="ts">
import type { SimpleLayoutProps } from '.'

const props = defineProps<SimpleLayoutProps>()
const emit = defineEmits<{
  'update:siderWidth': [number]
  'update:siderCollapsedWidth': [number]
  'update:siderCollapsed': [boolean]
}>()

const slots = defineSlots<Slots>()
type SlotFn = (props?: Record<string, unknown>) => any
interface Slots {
  /** Main */
  default?: SlotFn
  /** Header */
  header?: SlotFn
  /** Tab */
  tab?: SlotFn
  /** Sider */
  sider?: SlotFn
}
// config visible
const showHeader = computed(() => Boolean(slots.header) && props.headerVisible)
const showTab = computed(() => Boolean(slots.tab) && props.tabVisible)
const showSider = computed(() => !props.isMobile && Boolean(slots.sider) && props.siderVisible)
const showMobileSider = computed(() => props.isMobile && Boolean(slots.sider) && props.siderVisible)

const resizeTriggerSize = ref(4)
const siderHidden = computed(() => props.isMobile || props.isFullContent)
const siderWidth = computed({
  get() {
    if (siderHidden.value) {
      return '0px'
    }
    if (props.siderCollapsed) {
      return `${props.siderCollapsedWidth}px`
    }
    return `${props.siderWidth}px`
  },
  set(newValue) {
    if (siderHidden.value) {
      return
    }
    if (props.siderCollapsed) {
      emit('update:siderCollapsedWidth', Number(newValue.replace('px', '')))
      return
    }
    emit('update:siderWidth', Number(newValue.replace('px', '')))
  },
})

const dragging = ref(false)
</script>

<template>
  <n-split
    v-model:size="siderWidth"
    direction="horizontal"
    :pane1-class="`flex ${!dragging && 'transition-all duration-300'}`"
    :pane2-class="`flex ${!dragging && 'transition-all duration-300'}`"
    :max="siderCollapsed ? `${siderMaxCollapsedWidth}px` : `${siderMaxWidth}px`"
    :min="siderCollapsed ? `${siderMinCollapsedWidth}px` : `${siderMinWidth}px`"
    :resize-trigger-size="siderHidden ? 0 : resizeTriggerSize"
    @drag-start="dragging = true"
    @drag-end="dragging = false"
  >
    <!-- sider -->
    <template #1>
      <template v-if="showSider">
        <aside
          v-show="!isFullContent"
          class="w-full"
        >
          <slot name="sider" />
        </aside>
      </template>
      <template v-if="showMobileSider">
        <n-drawer
          v-show="!isFullContent"
          :width="siderWidth"
          placement="left"
          :show="!siderCollapsed"
          @update:show="show => emit('update:siderCollapsed', !show)"
        >
          <slot name="sider" />
        </n-drawer>
      </template>
    </template>

    <!-- header + tab + content -->
    <template #2>
      <div flex-vertical flex-1 overflow-x-hidden>
        <template v-if="showHeader">
          <header
            v-show="!isFullContent"
            b="0 b-1 solid primary-1 dark:primary-9"
            :style="{
              height: `${headerHeight}px`,
            }"
          >
            <slot name="header" />
          </header>
        </template>

        <template v-if="showTab">
          <div
            b="0 b-1 solid primary-1 dark:primary-9"
            :style="{
              height: `${tabHeight}px`,
            }"
          >
            <slot name="tab" />
          </div>
        </template>

        <!-- content -->
        <main class="flex-vertical flex-1 overflow-y-hidden bg-primary-50/30 dark:bg-black">
          <slot />
          <n-back-top />
        </main>
      </div>
    </template>

    <!-- n-split resize-trigger -->
    <template #resize-trigger>
      <div class="h-full flex justify-end rounded-md">
        <div class="h-full w-[1px] rounded-md bg-primary-1 dark:bg-primary-9" />
      </div>
    </template>
  </n-split>
</template>
