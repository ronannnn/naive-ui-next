export function isEmptyString(str: any): boolean {
  if (str === null || str === undefined) {
    return true
  }

  if (typeof str !== 'string') {
    return false
  }

  return str === ''
}
