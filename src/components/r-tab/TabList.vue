<script setup lang="ts">
import BetterScroll from '~/components/BetterScroll.vue'
import type { RTabListProps } from '~/types'

const props = defineProps<RTabListProps>()
const emit = defineEmits<{
  closeTab: [string]
  switchTab: [string]
}>()
// partially copy from soybean admin
const tabRef = ref<HTMLElement>()
const bsWrapper = ref<HTMLElement>()
const bsScroll = ref<InstanceType<typeof BetterScroll>>()
const { width: bsWrapperWidth, left: bsWrapperLeft } = useElementBounding(bsWrapper)

interface DropdownConfig {
  visible: boolean
  x: number
  y: number
  tabId: string
}

const dropdown: DropdownConfig = reactive({
  visible: false,
  x: 0,
  y: 0,
  tabId: '',
})

function setDropdown(config: Partial<DropdownConfig>) {
  Object.assign(dropdown, config)
}

let isClickContextMenu = false

function handleDropdownVisible(visible: boolean) {
  if (!isClickContextMenu)
    setDropdown({ visible })
}

async function handleContextMenu(e: MouseEvent, tabId: string) {
  e.preventDefault()
  const { clientX, clientY } = e
  isClickContextMenu = true
  const DURATION = dropdown.visible ? 150 : 0
  setDropdown({ visible: false })
  setTimeout(() => {
    setDropdown({
      visible: true,
      x: clientX,
      y: clientY,
      tabId,
    })
    isClickContextMenu = false
  }, DURATION)
}

const TAB_DATA_ID = 'data-tab-id'

type TabNamedNodeMap = NamedNodeMap & {
  [TAB_DATA_ID]: Attr
}

async function scrollToActiveTab(activeTabId: string) {
  await nextTick()
  if (!tabRef.value)
    return

  const { children } = tabRef.value

  for (let i = 0; i < children.length; i += 1) {
    const child = children[i]

    const { value: tabId } = (child.attributes as TabNamedNodeMap)[TAB_DATA_ID]

    if (tabId === activeTabId) {
      const { left, width } = child.getBoundingClientRect()
      const clientX = left + width / 2

      setTimeout(() => {
        scrollByClientX(clientX)
      }, 50)

      break
    }
  }
}

function scrollByClientX(clientX: number) {
  const currentX = clientX - bsWrapperLeft.value
  const deltaX = currentX - bsWrapperWidth.value / 2

  if (bsScroll.value?.instance) {
    const { maxScrollX, x: leftX, scrollBy } = bsScroll.value.instance

    const rightX = maxScrollX - leftX
    const update = deltaX > 0 ? Math.max(-deltaX, rightX) : Math.min(-deltaX, -leftX)

    scrollBy(update, 0, 640)
  }
}

watch(
  () => props.activeTabId,
  () => {
    scrollToActiveTab(props.activeTabId)
  },
)
</script>

<template>
  <div ref="bsWrapper" class="h-full flex-vertical justify-end overflow-hidden">
    <BetterScroll
      ref="bsScroll"
      :options="{
        scrollX: true,
        scrollY: false,
        swipeBounceTime: 100,
        mouseWheel: {
          easeTime: 100,
        },
      }"
      :style="{ height: `${tabItemHeight}px` }"
    >
      <div ref="tabRef" class="h-full flex gap-1">
        <TabItem
          v-for="tabItem in tabItems"
          :key="tabItem.id"
          :[TAB_DATA_ID]="tabItem.id"
          :active="activeTabId === tabItem.id"
          :tab="tabItem"
          @click="emit('switchTab', tabItem.id)"
          @close="emit('closeTab', tabItem.id)"
          @contextmenu="handleContextMenu($event, tabItem.id)"
        >
          {{ tabItem.label }}
        </TabItem>
      </div>
    </BetterScroll>
    <TabItemContextMenu
      :visible="dropdown.visible"
      :tab-id="dropdown.tabId"
      :x="dropdown.x"
      :y="dropdown.y"
      @update:visible="handleDropdownVisible"
    />
  </div>
</template>
