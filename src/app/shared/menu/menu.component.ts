import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MenuItem, Submenu } from './menu.model';
import { OverlayService } from '../../services/overlay.service';
import { PopupTooltipComponent } from '../popup-tooltip/popup-tooltip.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  @Input() menu: MenuItem[];
  @Input() submenu: Submenu;

  @ViewChild('popupItem') popupItem: ElementRef;
  @ViewChild('tooltip') tooltip: PopupTooltipComponent;

  public menuItem: MenuItem;

  constructor(
    private overlayService: OverlayService,
    private elementRef: ElementRef
  ) {}

  public showTooltip(item: MenuItem, event?: MouseEvent): void {
    this.menuItem = item;
    this.menuItem.active = !item.active;

    if (this.menuItem.active) {
      this.tooltip.showRelativeTo(this.popupItem);
      this.overlayService.show(this.checkButton.bind(this));
    } else {
      this.menuItem = null;
      this.tooltip.hide();
      this.overlayService.hide(event);
    }
  }

  public checkButton(event?: Event): boolean {
    let doClose = true;
    const input = this.elementRef.nativeElement.querySelector(
      '.wfw-menu__item--tooltip'
    );
    const resultList =
      this.elementRef.nativeElement.querySelector('.wfw-menu__list');

    if (
      resultList &&
      !resultList.contains(event.target) &&
      !input.contains(event.target) &&
      this.menuItem.active
    ) {
      this.tooltip.hide();
      this.menuItem.active = false;
    }

    if (resultList && resultList.contains(event.target)) {
      doClose = false;
    }
    return doClose;
  }
}
