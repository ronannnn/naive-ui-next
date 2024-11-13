import { computed, defineComponent, ref } from 'vue' // 导入h避免jsx渲染报错
import { NButton, NTooltip } from 'naive-ui'
import { tooltipButton } from './types'
import type { RTooltipButtonProps } from './types'

export default defineComponent({
  name: 'RTooltipButton',
  props: tooltipButton,
  setup(props: RTooltipButtonProps, { slots }) {
    const fnLoading = ref(false)
    const btnLoading = computed(() => fnLoading.value || props.loading)
    async function handleClick(e: MouseEvent) {
      e.stopPropagation()

      if (props.disabled) {
        return
      }
      if (props.onAsyncClick) {
        try {
          fnLoading.value = true
          await props.onAsyncClick(e)
        }
        finally {
          fnLoading.value = false
        }
      }
      else if (props.onSyncClick) {
        props.onSyncClick(e)
      }
    }
    return () => (
      <NTooltip
        disabled={!props.tooltipContent}
        placement={props.tooltipPlacement}
        keepAliveOnHover={props.keepAliveOnHover}
      >
        {{
          trigger: () => (
            <NButton {...props} loading={btnLoading.value} onClick={handleClick}>
              {{
                icon: () => (
                  slots.icon ? slots.icon() : (props.iconClass ? <div class={props.iconClass} /> : null)
                ),
                default: () => slots.default?.(),
              }}
            </NButton>
          ),
          default: () => props.tooltipContent,
        }}
      </NTooltip>
    )
  },
})
