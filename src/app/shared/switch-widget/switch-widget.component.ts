import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-switch-widget',
  templateUrl: './switch-widget.component.html',
})
export class SwitchWidgetComponent {
  @Input() public isActive = false;

  @Output() public onClick = new EventEmitter<boolean>();

  constructor() {}

  public toggle(): void {
    this.isActive = !this.isActive;
    this.onClick.emit(this.isActive);
  }
}
