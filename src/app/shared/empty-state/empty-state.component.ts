import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
})
export class EmptyStateComponent {
  @Input() title: string;
  @Input() imageStyle: string;


  constructor() {}
}
