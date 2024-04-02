import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Pagination } from './pagination.model';
import { Items } from '../popup-tooltip/popup-tooltip.model';
import { SINGLE, TOP } from '../../helpers/global.helper';
import { PopupTooltipComponent } from '../popup-tooltip/popup-tooltip.component';
import { OverlayService } from '../../services/overlay.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent implements OnInit {
  @Input() pagination = {
    from: 0,
    to: 0,
    count: 0,
    page: 0,
    range: 0,
  };

  @Output() public pageEmitter = new EventEmitter<Pagination>();

  @ViewChild('dropdown') dropdown: ElementRef;
  @ViewChild('tooltip') tooltip: PopupTooltipComponent;

  public math = Math;
  public pageTooltipData = {
    title: 'Show rows',
    position: TOP,
    type: SINGLE,
    items: this.paginationValues,
  };
  public showPopupTooltip = false;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private overlayService: OverlayService
  ) {}

  ngOnInit(): void {
    this.pagination.page = 1;
    this.pagination.range = 10;

    const input = this.input;
    this.renderer.setAttribute(input, 'min', '1');
    this.renderer.setAttribute(input, 'onfocus', 'this.temp = value');
    this.renderer.setAttribute(
      input,
      'oninput',
      'value = validity.valid ? this.temp = value : this.temp'
    );
  }

  public prev(): void {
    if (this.pagination.from <= 0) {
      return;
    }

    if (this.pagination.page === this.lastPage) {
      this.pagination.to = (this.pagination.page - 1) * this.pagination.range;
      this.pagination.from = this.pagination.to - this.pagination.range;
    } else {
      this.pagination.to -= this.pagination.range;
      this.pagination.from -= this.pagination.range;
    }

    this.pagination.page--;
    this.showPage();
  }

  public next(): void {
    const lastPage = this.lastPage;

    if (lastPage === this.pagination.page) {
      this.pagination.to = this.pagination.count;
      return;
    }

    this.pagination.page++;
    if (lastPage === this.pagination.page) {
      this.pagination.to = this.pagination.count;
    } else {
      this.pagination.to += this.pagination.range;
    }

    this.pagination.from += this.pagination.range;
    this.showPage();
  }

  public showTooltip(): void {
    this.showPopupTooltip = !this.showPopupTooltip;
    if (this.showPopupTooltip) {
      this.tooltip.showRelativeTo(this.dropdown);
      this.overlayService.show(this.checkDropdown.bind(this));
    } else {
      this.close();
      this.overlayService.hide(event);
    }
  }

  public checkDropdown(event?: Event): boolean {
    const input = this.elementRef.nativeElement.querySelector(
      '.wfw-pagination__pages'
    );
    const resultList = this.elementRef.nativeElement.querySelector(
      '.wfw-pagination-tooltip'
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

  private close(): void {
    this.showPopupTooltip = false;
    this.tooltip.hide();
  }

  public goToPage(): void {
    let page = Number(this.input.value);
    const lastPage = this.lastPage;

    if (this.input.value === '' || page <= 0) {
      page = 1;
    }

    if (page >= lastPage) {
      this.pagination.page = lastPage;
      this.pagination.to = this.pagination.count;
      this.pagination.from = (lastPage - 1) * this.pagination.range;
    } else {
      this.pagination.page = page;
      this.pagination.to = page * this.pagination.range;
      this.pagination.from = this.pagination.to - this.pagination.range;
    }

    this.input.value = page.toString();
    this.pageEmitter.emit(this.pagination);
  }

  public showPage(): void {
    this.pageEmitter.emit(this.pagination);
  }

  public selectItem(range: number): void {
    this.pagination.page = 1;
    this.pagination.from = 0;
    this.pagination.to =
      range > this.pagination.count ? this.pagination.count : range;
    this.pagination.range = range;
    this.showPage();
    this.close();
    this.showPopupTooltip = false;
    this.pageTooltipData.items.forEach(
      (menuItems) =>
        (menuItems.popupItems.choose = menuItems.key === this.pagination.range)
    );
  }

  private get paginationValues(): Items[] {
    return [
      {
        key: 10,
        popupItems: {
          value: '10',
          choose: true,
        },
      },
      {
        key: 25,
        popupItems: {
          value: '25',
        },
      },
      {
        key: 50,
        popupItems: {
          value: '50',
        },
      },
      {
        key: 100,
        popupItems: {
          value: '100',
        },
      },
      {
        key: 200,
        popupItems: {
          value: '200',
        },
      },
    ] as Items[];
  }

  private get lastPage(): number {
    return Math.ceil(this.pagination.count / this.pagination.range);
  }

  private get input(): HTMLInputElement {
    return this.elementRef.nativeElement.querySelector(
      '.wfw-pagination__input'
    );
  }
}
