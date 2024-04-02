import { PopupTooltipData } from '../popup-tooltip/popup-tooltip.model';

export interface MenuItem {
  icon: string;
  label?: string;
  address?: string;
  tooltip?: string;
  active?: boolean;
  popupTooltipData?: PopupTooltipData;
  submenu?: Submenu;
}

export interface Submenu {
  title: string;
  address?: string;
  menu?: MenuItem[];
}
