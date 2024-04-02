import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { PopupTooltipData } from '../popup-tooltip/popup-tooltip.model';
import { OverlayService } from '../../services/overlay.service';
import { PopupTooltipComponent } from '../popup-tooltip/popup-tooltip.component';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
})
export class FilterComponent {
  @Input() label = '';
  @Input() options: PopupTooltipData;
  @Input() width = 240;
  @Input() keysList = [];

  @Output() filter = new EventEmitter<any>();

  @ViewChild('filter') filterElement: ElementRef;
  @ViewChild('tooltip') tooltip: PopupTooltipComponent;

  public isOpen = false;

  constructor(
    private overlayService: OverlayService,
    private elementRef: ElementRef
  ) {}

  public openTooltip(event?: MouseEvent): void {
    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      this.tooltip.showRelativeTo(this.filterElement);
      this.overlayService.show(this.checkFilter.bind(this));
    } else {
      this.isOpen = false;
      this.tooltip.hide();
      this.overlayService.hide(event);
    }
  }

  public checkFilter(event?: Event): boolean {
    const input = this.elementRef.nativeElement.querySelector(
      '.wfw-filter-box__label'
    );
    const resultList = this.elementRef.nativeElement.querySelector(
      '.wfw-filter-box__list'
    );
    let doClose = true;

    if (
      resultList &&
      !resultList.contains(event.target) &&
      !input.contains(event.target) &&
      this.isOpen
    ) {
      this.isOpen = false;
      this.tooltip.hide();
    }

    if (resultList && resultList.contains(event.target)) {
      doClose = false;
    }
    return doClose;
  }

  public setValue(key: string): void {
    if (
      this.options.items.find((menuItem) => menuItem.key === key).popupItems
        .choose
    ) {
      this.keysList.push(key);
      this.onFilter();
      return;
    }

    const index = this.keysList.indexOf(key);
    if (index !== -1) {
      this.keysList.splice(index, 1);
    }

    this.onFilter();
  }

  public onFilter(): void {
    this.filter.emit(this.keysList);
  }
}
