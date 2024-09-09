export function useType() {
  const removeDuplicates = <T>(arr: (keyof T)[]): (keyof T)[] => {
    return [...new Set(arr)]
  }
  return {
    removeDuplicates,
  }
}

export function noDupPrimitiveArray(arr: any[]): any[] {
  return [...new Set(arr)]
}

export function useArraySet<T>() {
  const set = ref<Set<T>>(new Set()) as Ref<Set<T>>
  const array = computed<T[]>({
    get() {
      return Array.from(new Set(set.value.keys()))
    },
    set(value) {
      set.value = new Set(value)
    },
  })

  return {
    set,
    array,
  }
}

export const onlyAllowNumberAndDot = (value: string) => !value || /^\d+(?:\.\d+)?\.?$/.test(value)

export const dataTypeLabels: { [K in TypeUtil.DataTypeStringKey]: TypeUtil.DataTypeString<K> } = {
  string: '[object String]',
  number: '[object Number]',
  boolean: '[object Boolean]',
  null: '[object Null]',
  undefined: '[object Undefined]',
  symbol: '[object Symbol]',
  bigInt: '[object BigInt]',
  object: '[object Object]',
  array: '[object Array]',
  date: '[object Date]',
  regExp: '[object RegExp]',
  promise: '[object Promise]',
  set: '[object Set]',
  map: '[object Map]',
  file: '[object File]',
}

function getDataTypeString<K extends TypeUtil.DataTypeStringKey>(value: unknown) {
  return Object.prototype.toString.call(value) as TypeUtil.DataTypeString<K>
}

export function isNumber<T extends number>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.number
}

export function isString<T extends string>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.string
}

export function isBoolean<T extends boolean>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.boolean
}

export function isNull<T extends null>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.null
}

export function isUndefined<T extends undefined>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.undefined
}

export function isSymbol<T extends symbol>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.symbol
}

export function isBigInt<T extends bigint>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.bigInt
}

export function isObject<T extends Record<string, any>>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.object
}

export function isArray<T extends any[]>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.array
}

export function isDate<T extends Date>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.date
}

export function isRegExp<T extends RegExp>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.regExp
}

export function isPromise<T extends Promise<any>>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.promise
}

export function isSet<T extends Set<any>>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.set
}

export function isMap<T extends Map<any, any>>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.map
}

export function isFile<T extends File>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.file
}
