import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BLACK, ButtonWidgetModel } from './button-widget.model';

const BTN = 'wfw-btn';
const BTN_LINK = 'wfw-btn-link';
const DEFAULT_BUTTON_WIDGET_OPTIONS = {
  className: '',
  btnSize: '',
  btnColor: BLACK,
  isEnabled: true,
};

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input()
  public set buttonWidgetModel(buttonWidgetModel: ButtonWidgetModel) {
    this.buttonWidgetOptions = {
      ...DEFAULT_BUTTON_WIDGET_OPTIONS,
      ...buttonWidgetModel,
    };
  }

  @Input() public isEnabled = true;

  @Output() public open = new EventEmitter();

  public buttonWidgetOptions: ButtonWidgetModel;

  constructor() {
    if (!this.buttonWidgetModel) {
      this.buttonWidgetOptions = DEFAULT_BUTTON_WIDGET_OPTIONS;
    }
  }

  public get getBtnStyle(): string {
    const color = this.buttonWidgetOptions.btnColor;
    const btnTypeClass = [this.buttonWidgetOptions.className];
    const isBtn = color.includes(BTN);
    btnTypeClass.push(isBtn ? BTN : BTN_LINK);
    btnTypeClass.push(color);
    btnTypeClass.push(isBtn ? this.buttonWidgetOptions.btnSize : '');

    return btnTypeClass.toString().replace(/,/g, ' ');
  }

  public onClick(): void {
    if (!this.isEnabled) {
      return;
    }

    this.open.emit();
  }
}
