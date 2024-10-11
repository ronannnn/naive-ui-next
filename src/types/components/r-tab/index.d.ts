export interface RTabItemProps {
  id: string // i.e. route.fullPath, including search and hash
  label: string
  i18nKey?: string
  icon?: string
  closable?: boolean
}

export interface RTabListProps {
  activeTabId: string
  tabItemHeight: number
  tabItems: RTabItemProps[]
}

export interface RTabSelectorProps {
  activeTabId: string
  tabItems: RTabItemProps[]
}

export interface RTabProps extends RTabListProps {
  tabHeight: number
}
