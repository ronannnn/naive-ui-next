import type { DropdownButtonOption } from './types'

export function findDropdownButtonOptionsKeyRecursively(options: DropdownButtonOption[], key: string | number): DropdownButtonOption | undefined {
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
