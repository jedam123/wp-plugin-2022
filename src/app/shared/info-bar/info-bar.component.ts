import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-bar',
  templateUrl: './info-bar.component.html',
})
export class InfoBarComponent {
  @Input() address: string;
  @Input() btnLabel: string;
  @Input() text: string;
  @Input() icon: string;

  constructor() {}
}
