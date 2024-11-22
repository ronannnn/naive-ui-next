export type Noop = (...args: any) => any

export interface DataType {
  number: number
  string: string
  boolean: boolean
  null: null
  undefined: undefined
  symbol: symbol
  bigInt: bigint
  object: Record<string, any>
  array: Array<any>
  date: Date
  regExp: RegExp
  promise: Promise<any>
  set: Set<any>
  map: Map<any, any>
  file: File
}

export type DataTypeStringKey = keyof DataType

export type DataTypeString<T extends DataTypeStringKey = DataTypeStringKey> = `[object ${Capitalize<T>}]`
