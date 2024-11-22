// 后端接口返回的数据类型

export interface Pagination {
  pageNum: number
  pageSize: number
}

/** 自定义的请求成功结果 */
export interface SuccessResult<T = any> {
  /** 请求错误 */
  error: null
  /** 请求数据 */
  data: T
}
export interface RequestError {
  /** 错误码 */
  code: string | number
  /** 错误信息 */
  msg: string
}
/** 自定义的请求失败结果 */
export interface FailedResult {
  /** 请求错误 */
  error: RequestError
  /** 请求数据 */
  data: null
}
/** 自定义的请求结果 */
export type RequestResult<T = any> = SuccessResult<T> | FailedResult

// -- biz result ---
export interface StatsItem {
  field: string
  result: any
  rmk?: string
}
export interface PageResult<T = any> {
  list: T[]
  total: number
  pageNum: number
  pageSize: number
  stats?: StatsItem[][]
}

// -- biz request ---
export interface BatchDeleteCommand {
  ids: number[]
}
