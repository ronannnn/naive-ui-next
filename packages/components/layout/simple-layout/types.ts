/** Header config */
export interface SimpleLayoutHeaderConfig {
  /**
   * Whether header is visible
   *
   * @default true
   */
  headerVisible?: boolean
  /**
   * Header class
   *
   * @default ''
   */
  headerClass?: string
  /**
   * Header height
   *
   * @default 48px
   */
  headerHeight?: number
}

/** Tab config */
export interface SimpleLayoutTabConfig {
  /**
   * Whether tab is visible
   *
   * @default true
   */
  tabVisible?: boolean
  /**
   * Tab class
   *
   * @default ''
   */
  tabClass?: string
  /**
   * Tab height
   *
   * @default 42px
   */
  tabHeight?: number
  /**
   * Tab item height
   *
   * @default 32px
   */
  tabItemHeight?: number
}

/** Sider config */
interface SimpleLayoutSiderConfig {
  /**
   * Whether sider is visible
   *
   * @default true
   */
  siderVisible?: boolean
  /**
   * Sider class
   *
   * @default ''
   */
  siderClass?: string
  /**
   * Mobile sider class
   *
   * @default ''
   */
  siderMobileClass?: string
  /**
   * Sider collapse status
   *
   * @default false
   */
  siderCollapsed?: boolean
  /**
   * Sider width when collapse is false
   *
   * @default '220px'
   */
  siderWidth?: number
  /**
   * Maximum sider width when collapse is false
   *
   * @default '320px'
   */
  siderMaxWidth?: number
  /**
   * Minimum sider width when collapse is false
   *
   * @default '180px'
   */
  siderMinWidth?: number
  /**
   * Sider width when collapse is true
   *
   * @default '64px'
   */
  siderCollapsedWidth?: number
  /**
   * Maximum sider width when collapse is true
   *
   * @default '100px'
   */
  siderMaxCollapsedWidth?: number
  /**
   * Minimum sider width when collapse is true
   *
   * @default '50px'
   */
  siderMinCollapsedWidth?: number
}

/** Content config */
export interface SimpleLayoutContentConfig {
  /**
   * Content class
   *
   * @default ''
   */
  contentClass?: string
}

/** Simple layout props */
export interface SimpleLayoutProps
  extends SimpleLayoutSiderConfig,
  SimpleLayoutHeaderConfig,
  SimpleLayoutTabConfig,
  SimpleLayoutContentConfig {
  /** Is mobile layout */
  isMobile?: boolean
  /** Is browser full content */
  isFullContent?: boolean
}
