export interface PopupTooltipData {
  title: string;
  items: Items[];
  type?: string;
  position?: string;
}

export interface Items {
  key: any;
  popupItems: PopupItems;
}

export interface PopupItems {
  value: string;
  address?: string;
  icon?: string;
  choose?: boolean;
  isHidden?: boolean;
}
