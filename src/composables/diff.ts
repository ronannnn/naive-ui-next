// prev and cur should be the same type
// return object keys of fields that have changed
function getChangedFields(prev: any, cur: any): string[] {
  const fields = noDupPrimitiveArray([...Object.keys(prev), ...Object.keys(cur)])
  const changedFields = []
  for (const field of fields) {
    if ((prev[field] === null || prev[field] === undefined) && (cur[field] === null || cur[field] === undefined)) {
      continue
    }
    // skip compare if it is not primitive type
    if (Object(prev[field]) !== prev[field] && prev[field] !== cur[field]) {
      changedFields.push(field)
    }
  }
  return changedFields
}

// return true is there is no difference
export function compareObjArrays(arr1: any, arr2: any): boolean {
  if (!arr1 || !arr2)
    return arr1 === arr2
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    return false
  }

  if (arr1.length !== arr2.length) {
    return false
  }

  return arr1.every((item1, index) => {
    const item2 = arr2[index]
    const keys = Object.keys(item1)
    return keys.every((key) => {
      if (Array.isArray(item1[key]) && Array.isArray(item2[key])) {
        return compareObjArrays(item1[key], item2[key])
      }
      else if (isObject(item1[key]) && isObject(item2[key])) {
        return getChangedFields(item1[key], item2[key]).length === 0
      }

      if ((item1[key] === null || item1[key] === undefined) && (item2[key] === null || item2[key] === undefined)) {
        return true
      }

      return item1[key] === item2[key]
    })
  })
}

// return an object with init data and all changed fields
// return a flag to show if there is any change
export function getObjWithModifiedFields<T>(
  initData: T,
  oldData: T,
  newData: T,
  arrayTypeComparedKeys: (keyof T)[] = [],
): [T, boolean] {
  const changedFields = getChangedFields(oldData, newData) as (keyof T)[]
  const arrayComparedChangedList: boolean[] = arrayTypeComparedKeys.map((key) => {
    return !compareObjArrays(oldData[key], newData[key])
  })
  if (changedFields.length === 0 && !arrayComparedChangedList.some(changed => changed)) {
    return [initData, false]
  }

  for (const field of changedFields) {
    initData[field] = newData[field]
  }

  arrayTypeComparedKeys.forEach((key, index) => {
    if (arrayComparedChangedList[index])
      initData[key] = newData[key]
  })
  return [initData, true]
}
