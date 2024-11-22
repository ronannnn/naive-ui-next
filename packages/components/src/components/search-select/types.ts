import type { SelectProps } from 'naive-ui'
import type { VNode } from 'vue'
import type { PageResult, QueryOrder, QueryTemplate, RequestResult } from '~/src/types'

export interface SearchSelectProps {
  initModel?: any
  searchFn?: (query: QueryTemplate<any>) => Promise<RequestResult<PageResult<any>>>
  searchFields: string[]
  labelField: string
  valueField?: string
  placeholder: SelectProps['placeholder']
  disabled?: SelectProps['disabled']
  renderOptionFromData?: (model: any) => VNode
  triggerAfterSelected?: (model: any) => void
  orderQuery?: QueryOrder<any>
  size?: SelectProps['size']
  multiple?: SelectProps['multiple']
  loading?: SelectProps['loading']
}
