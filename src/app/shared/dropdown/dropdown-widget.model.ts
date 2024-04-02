import { PopupTooltipData } from '../popup-tooltip/popup-tooltip.model';

export interface DropdownData {
  options?: PopupTooltipData;
  label?: string;
  placeholder?: string;
  defaultKey?: any;
  isEnabled: boolean;
  validationMsg?: string;
}
