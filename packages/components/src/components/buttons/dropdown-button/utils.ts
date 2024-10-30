import type { RDropdownButtonOption } from './types'

export function findDropdownButtonOptionsKeyRecursively(options: RDropdownButtonOption[], key: string | number): RDropdownButtonOption | undefined {
  for (const option of options) {
    if (option.key === key) {
      return option
    }

    if (option.children) {
      const found = findDropdownButtonOptionsKeyRecursively(option.children, key)
      if (found) {
        return found
      }
    }
  }
}
