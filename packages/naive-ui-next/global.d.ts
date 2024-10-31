declare module 'vue' {
  export interface GlobalComponents {
    RDnd: typeof import('naive-ui-next-pro')['RDnd']
    RDropdownButton: typeof import('naive-ui-next-pro')['RDropdownButton']
  }
}

export { }
