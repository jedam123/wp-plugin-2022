import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import { PopupData } from './popup.model';
import {
  ButtonWidgetModel,
  LG,
  SILVER_BLUE,
} from '../button/button-widget.model';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  animations: [
    trigger('animate', [
      transition(':enter', [
        style({
          opacity: 0,
        }),
        animate('200ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({
          opacity: 1,
        }),
        animate('200ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class PopupComponent implements AfterViewInit {
  @Input() popupData: PopupData;

  @Output() onOk = new EventEmitter();
  @Output() onCancel = new EventEmitter();

  public buttonOk = {
    btnSize: LG,
  } as ButtonWidgetModel;

  public buttonCancel = {
    btnColor: SILVER_BLUE,
    btnSize: LG,
  } as ButtonWidgetModel;

  public isOpen = true;

  constructor(public elementRef: ElementRef, public renderer: Renderer2) {}

  public ngAfterViewInit(): void {
    this.calculatePosition();
  }

  public onClickOk(): void {
    this.isOpen = false;
    setTimeout(() => this.onOk.emit(), 300);
  }

  public onClickCancel(): void {
    this.isOpen = false;
    setTimeout(() => this.onCancel.emit(), 300);
  }

  private calculatePosition(): void {
    const popupOverlay = this.elementRef.nativeElement.querySelector(
      '.wfw-popup__overlay'
    );

    const popup = this.elementRef.nativeElement.querySelector(
      '.wfw-popup__container'
    );
    const topPosition = (popupOverlay.offsetHeight - popup.offsetHeight) / 2;
    this.renderer.setStyle(popup, 'top', topPosition + 'px');
  }
}
