import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { PopupTooltipData } from './popup-tooltip.model';
import {
  BOTTOM,
  DROPDOWN,
  MULTIPLE,
  RIGHT,
  SINGLE,
  TOP,
} from '../../helpers/global.helper';

const PADDING_LEFT_RIGHT = 20;
const PADDING_TOP_BOTTOM = 28;

@Component({
  selector: 'app-popup-tooltip',
  templateUrl: './popup-tooltip.component.html',
})
export class PopupTooltipComponent implements OnInit, OnDestroy {
  @Input() width = 269;
  @Input() data: PopupTooltipData;
  @Input() topOffset = 0;
  @Input() leftOffset = 0;

  @Output() choose = new EventEmitter<any>();

  public height: number;
  public left: number;
  public top: number;
  public show = false;
  private relativeElement: ElementRef;
  private resize: any;

  constructor() {}

  public ngOnInit(): void {
    this.setHeight();
    this.resize = () => {
      if (!this.show) {
        return;
      }

      this.showRelativeTo(this.relativeElement);
    };
    addEventListener('resize', this.resize);
  }

  public ngOnDestroy(): void {
    removeEventListener('resize', this.resize);
  }

  private setHeight(): void {
    this.height =
      this.data?.items?.length < 10 ? this.data.items.length * 30 + 36 : 335;
  }

  public showRelativeTo(relativeElement: ElementRef): void {
    this.relativeElement = relativeElement;

    if (!relativeElement) {
      return;
    }

    const element = relativeElement.nativeElement;
    const bounding = element.getBoundingClientRect();
    if (!bounding) {
      return;
    }

    const wpLeftBar = document.querySelector('#adminmenuback');
    const wpLeftBarWidth = wpLeftBar
      ? wpLeftBar.getBoundingClientRect().width
      : 0;
    const wpTopBar = document.querySelector('#wpadminbar');
    const wpTopBarHeight = wpTopBar
      ? wpTopBar.getBoundingClientRect().height
      : 0;

    switch (this.data.position) {
      case RIGHT:
        this.top =
          this.topOffset + bounding.top + window.scrollY - wpTopBarHeight;
        this.left =
          this.leftOffset +
          bounding.left +
          (bounding.right - bounding.left) -
          wpLeftBarWidth;
        break;
      case TOP:
        this.top =
          element.offsetTop -
          (PADDING_TOP_BOTTOM + this.topOffset + this.height);
        break;

      case DROPDOWN:
        this.top =
          bounding.top +
          window.scrollY +
          bounding.height +
          this.topOffset -
          wpTopBarHeight;
        this.left = 0;
        break;

      default:
      case BOTTOM:
        this.top =
          bounding.top +
          window.scrollY +
          bounding.height +
          this.topOffset -
          wpTopBarHeight;

        const rightSpace = window.innerWidth - bounding.left;
        if (this.width + PADDING_LEFT_RIGHT > Math.floor(rightSpace)) {
          this.left =
            element.offsetLeft +
            (bounding.right - bounding.left) +
            window.scrollX -
            this.width -
            PADDING_LEFT_RIGHT;
        } else {
          this.left = bounding.left - wpLeftBarWidth;
        }
        break;
    }

    this.show = true;
  }

  public onClick(selectedKey: any): void {
    if (this.data.type === SINGLE) {
      this.data.items.forEach(
        (menuItem) =>
          (menuItem.popupItems.choose = menuItem.key === selectedKey)
      );
    } else if (this.data.type === MULTIPLE) {
      const popupItems = this.data.items.find(
        (menuItem) => menuItem.key === selectedKey
      ).popupItems;
      popupItems.choose = !popupItems.choose;
    }

    this.choose.emit(selectedKey);
  }

  public hide(): void {
    this.show = false;
  }
}
