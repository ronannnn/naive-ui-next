export interface TabItemProps {
  id: string // i.e. route.fullPath, including search and hash
  label: string
  i18nKey?: string
  icon?: string
  closable?: boolean
}

export interface TabListProps {
  activeTabId: string
  tabItemHeight: number
  tabItems: TabItemProps[]
}

export interface TabSelectorProps {
  activeTabId: string
  tabItems: TabItemProps[]
}

export interface TabProps extends TabListProps {
  tabHeight: number
}
