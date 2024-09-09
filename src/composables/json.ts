export function cloneJson<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}
