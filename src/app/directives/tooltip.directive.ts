import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';
import { clearAllTooltips } from '../helpers/global.helper';

const TOOLTIP_MAIN_CLASS = 'wfw-tooltip';
const TOOLTIP_SHOW_CLASS = `${TOOLTIP_MAIN_CLASS}--show`;
const TOOLTIP_TITLE_CLASS = `${TOOLTIP_MAIN_CLASS}__title`;
const TOOLTIP_CONTENT_CLASS = `${TOOLTIP_MAIN_CLASS}__content`;
const TOOLTIP_HTML_CLASS = `${TOOLTIP_MAIN_CLASS}--html`;
const TOOLTIP_ARROW_CLASS = `${TOOLTIP_MAIN_CLASS}__arrow`;
const TOOLTIP_ARROW_LEFT_CLASS = `${TOOLTIP_ARROW_CLASS}--left`;
const TOOLTIP_ARROW_RIGHT_CLASS = `${TOOLTIP_ARROW_CLASS}--right`;

const TOP = 'top';
const BOTTOM = 'bottom';
const LEFT = 'left';
const RIGHT = 'right';
const HALF_VALUE = 2;
const HORIZONTAL_OFFSET = 10;
const HORIZONTAL_OFFSET_SCROLL = 20;

@Directive({
  selector: '[appTooltip]',
})
export class TooltipDirective {
  @Input('appTooltip') public title: string;
  @Input() public direction = TOP;
  @Input() public tooltipContent: string;
  @Input() public asHtml = false;
  @Input() public setOnTruncate = false;
  @Input() public offset = 5;

  private tooltip: HTMLElement;

  constructor(private element: ElementRef, private render: Renderer2) {}

  @HostListener('mouseenter')
  public onMouseEnter(): void {
    if (!this.tooltip) {
      this.show();
    }
  }

  @HostListener('click')
  public onClick(): void {
    if (!this.tooltip) {
      this.hide();
    }
  }

  @HostListener('mouseleave')
  public onMouseLeave(): void {
    if (this.tooltip) {
      this.hide();
    }
  }

  private show(): void {
    clearAllTooltips();
    setTimeout(() => {
      const element = this.element.nativeElement;

      if (
        (this.setOnTruncate && element.scrollWidth <= element.offsetWidth) ||
        (!this.title && !this.tooltipContent)
      ) {
        return;
      }

      this.asHtml ? this.createAsHtml() : this.create();

      const arrowContainer = this.render.createElement('div');
      this.render.addClass(arrowContainer, TOOLTIP_ARROW_CLASS);

      const arrowLeft = this.render.createElement('div');
      this.render.addClass(arrowLeft, TOOLTIP_ARROW_LEFT_CLASS);

      const arrowRight = this.render.createElement('div');
      this.render.addClass(arrowRight, TOOLTIP_ARROW_RIGHT_CLASS);

      this.render.appendChild(arrowContainer, arrowLeft);
      this.render.appendChild(arrowContainer, arrowRight);
      this.render.appendChild(this.tooltip, arrowContainer);

      this.setPosition();

      this.render.addClass(this.tooltip, TOOLTIP_SHOW_CLASS);
    }, 10);
  }

  private hide(): void {
    if (this.tooltip) {
      this.render.removeClass(this.tooltip, TOOLTIP_SHOW_CLASS);
      this.render.removeChild(document.body, this.tooltip);
      this.tooltip = null;
    }

    clearAllTooltips();
  }

  private createAsHtml(): void {
    this.tooltip = this.render.createElement('div');
    this.createTitle();

    if (this.tooltipContent) {
      const contentDiv = this.render.createElement('div');
      contentDiv.innerHTML = this.tooltipContent;
      this.render.addClass(contentDiv, TOOLTIP_CONTENT_CLASS);
      this.render.appendChild(this.tooltip, contentDiv);
      this.render.addClass(this.tooltip, TOOLTIP_HTML_CLASS);
    }

    this.setTooltip();
  }

  private createTitle(): void {
    const titleDiv = this.render.createElement('div');
    titleDiv.innerHTML = this.title;

    if (this.tooltipContent) {
      this.render.addClass(titleDiv, TOOLTIP_TITLE_CLASS);
    }
    this.render.appendChild(this.tooltip, titleDiv);
  }

  private create(): void {
    if (!this.title) {
      return;
    }

    this.tooltip = this.render.createElement('span');
    this.render.appendChild(this.tooltip, this.render.createText(this.title));
    this.setTooltip();
  }

  private setTooltip(): void {
    this.render.appendChild(document.body, this.tooltip);
    this.render.addClass(this.tooltip, TOOLTIP_MAIN_CLASS);
    this.render.addClass(
      this.tooltip,
      `${TOOLTIP_MAIN_CLASS}--${this.direction}`
    );
  }

  private setPosition(): void {
    const hostPosition = this.element.nativeElement.getBoundingClientRect();
    const tooltipPosition = this.tooltip.getBoundingClientRect();
    const verticalScrollPosition =
      document.documentElement.scrollTop || document.body.scrollTop || 0;

    const horizontalScrollPosition =
      document.documentElement.scrollLeft || document.body.scrollLeft || 0;

    let top;
    let left;

    switch (this.direction) {
      case TOP:
        top = hostPosition.top - tooltipPosition.height - this.offset;
        left = this.correctHorizontalPosition(hostPosition, tooltipPosition);
        break;

      case BOTTOM:
        top = hostPosition.bottom + this.offset;
        left = this.correctHorizontalPosition(hostPosition, tooltipPosition);
        break;

      case LEFT:
        top =
          hostPosition.top +
          (hostPosition.height - tooltipPosition.height) / HALF_VALUE;
        left = hostPosition.left - tooltipPosition.width - this.offset;
        break;

      case RIGHT:
        top =
          hostPosition.top +
          (hostPosition.height - tooltipPosition.height) / HALF_VALUE;
        left = hostPosition.right + this.offset;
        break;
    }

    this.render.setStyle(
      this.tooltip,
      TOP,
      `${top + verticalScrollPosition}px`
    );
    this.render.setStyle(
      this.tooltip,
      LEFT,
      `${left + horizontalScrollPosition}px`
    );
  }

  private correctHorizontalPosition(
    position: DOMRect,
    tooltipPosition: DOMRect
  ): number {
    const screenWidth = (window as Window).innerWidth;
    let left =
      position.left + (position.width - tooltipPosition.width) / HALF_VALUE;

    const endsOutsideScreen = left + tooltipPosition.width > screenWidth;
    const startsOutsideScreen = left < 0;

    if (endsOutsideScreen) {
      const offsetLeft = Math.trunc(
        screenWidth -
          (left +
            tooltipPosition.width +
            (document.body.offsetWidth - document.body.clientWidth))
      );
      left = left + offsetLeft;
      this.correctHorizontalPointerPosition(offsetLeft);
    }

    if (startsOutsideScreen) {
      const offsetLeft = Math.abs(left) + HORIZONTAL_OFFSET;
      left = left + offsetLeft;
      this.correctHorizontalPointerPosition(offsetLeft);
    }

    return left;
  }

  private correctHorizontalPointerPosition(offsetLeft: number): void {
    const left = 0 - 2 * offsetLeft;
    const pointerElement = this.tooltip.querySelector(
      `.${TOOLTIP_ARROW_CLASS}`
    );

    this.render.setStyle(pointerElement, 'left', `${left}px`);
  }
}
