import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DropdownData } from './dropdown-widget.model';
import { OverlayService } from '../../services/overlay.service';
import { PopupTooltipComponent } from '../popup-tooltip/popup-tooltip.component';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent implements OnInit {
  @Input() data: DropdownData;
  @Input() isError = false;

  @Output() choose = new EventEmitter<any>();

  @ViewChild('dropdown') dropdown: ElementRef;
  @ViewChild('tooltip') tooltip: PopupTooltipComponent;

  public defaultValue: string;
  public isOpen = false;

  constructor(
    private elementRef: ElementRef,
    private overlayService: OverlayService,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.defaultValue = this.getDefaultValue(this.data.defaultKey);
  }

  public openTooltip(event?: MouseEvent): void {
    if (!this.data.isEnabled) {
      return;
    }

    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.tooltip.showRelativeTo(this.dropdown);
      this.overlayService.show(this.checkDropdown.bind(this));
    } else {
      this.close();
      this.overlayService.hide(event);
    }
  }

  public checkDropdown(event?: Event): boolean {
    this.isError = false;
    const input = this.elementRef.nativeElement.querySelector(
      '.wfw-dropdown-widget__input'
    );
    const resultList = this.elementRef.nativeElement.querySelector(
      '.wfw-dropdown-tooltip'
    );
    let doClose = true;

    if (
      resultList &&
      !resultList.contains(event.target) &&
      !input.contains(event.target)
    ) {
      this.close();
    }

    if (resultList && resultList.contains(event.target)) {
      doClose = false;
    }
    return doClose;
  }

  public setValue(selected: any): void {
    this.defaultValue = this.getDefaultValue(selected);
    this.choose.emit(selected);
    this.close();
  }

  public close(): void {
    this.isOpen = false;
    this.tooltip.hide();
    this.cdr.detectChanges();
  }

  private getDefaultValue(selected: any): string {
    return this.data.options.items.find((item) => item.key === selected)
      .popupItems.value;
  }
}
