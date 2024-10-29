import * as components from "./index";
declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    RDropdownButton: typeof components.RDropdownButton;
    RPopselectButton: typeof components.RPopselectButton;
    RPopconfirmButton: typeof components.RPopconfirmButton;
    RDnd: typeof components.RDnd;
    RHoverContainer: typeof components.RHoverContainer;
    RSimpleLayout: typeof components.RSimpleLayout;
    RScroll: typeof components.RScroll;
    RSelect: typeof components.RSelect;
    RTab: typeof components.RTab;
    RTabItem: typeof components.RTabItem;
    RTabList: typeof components.RTabList;
    RTabSelector: typeof components.RTabSelector;
    RTabItemContextMenu: typeof components.RTabItemContextMenu;
    RTableColumnSetting: typeof components.RTableColumnSetting;
    RTableColumnSettingItem: typeof components.RTableColumnSettingItem;
    RTableHeaderOperations: typeof components.RTableHeaderOperations;
    RTableOrderQuery: typeof components.RTableOrderQuery;
    RTableOrderQueryItem: typeof components.RTableOrderQueryItem;
    RTableOrderQueryNewer: typeof components.RTableOrderQueryNewer;
    RTableWhereQuery: typeof components.RTableWhereQuery;
    RTableWhereQueryAsyncSelect: typeof components.RTableWhereQueryAsyncSelect;
    RTableWhereQueryDatePicker: typeof components.RTableWhereQueryDatePicker;
    RTableWhereQueryDateRangePicker: typeof components.RTableWhereQueryDateRangePicker;
    RTableWhereQueryInput: typeof components.RTableWhereQueryInput;
    RTableWhereQueryItem: typeof components.RTableWhereQueryItem;
    RTableWhereQuerySelect: typeof components.RTableWhereQuerySelect;
    RTableLabelValueRender: typeof components.RTableLabelValueRender;
    RTable: typeof components.RTable;
  }
}
export {};
