import type { SelectProps } from 'naive-ui'

export interface RSelectProps {
  initModel?: any
  searchFn: (query: Template<any>) => Promise<Api.RequestResult<Api.PageResult<any>>>
  searchFields: string[]
  labelField: string
  valueField?: string
  placeholder: SelectProps['placeholder']
  disabled?: SelectProps['disabled']
  renderOptionFromData?: (model: any) => VNode
  triggerAfterSelected?: (model: any) => void
  orderQuery?: Query.Order<any>
  size?: SelectProps['size']
  multiple?: SelectProps['multiple']
  loading?: SelectProps['loading']
}
