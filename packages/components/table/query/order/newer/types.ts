import type { OrderQueryOption } from '../types'

export interface RTableOrderQueryNewerProps<T> {
  orderOptions: OrderQueryOption<T>[]
  unselectedFields: string[]
  size?: NaiveUiTypes.Size
}
