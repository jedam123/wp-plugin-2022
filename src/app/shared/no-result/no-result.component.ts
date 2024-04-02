import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-no-result',
  templateUrl: './no-result.component.html',
})
export class NoResultComponent {
  @Output() public clickEvent = new EventEmitter();

  constructor() {}

  public onClick(): void {
    this.clickEvent.emit();
  }
}
