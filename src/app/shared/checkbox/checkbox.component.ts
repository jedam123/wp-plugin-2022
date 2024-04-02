import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent {
  @Input() isChecked: boolean;
  @Input() label = '';
  @Input() name = '';
  @Input() isEnabled = true;

  @Output() toggleCheckbox = new EventEmitter<boolean>();

  constructor() {}

  public toggle(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.toggleCheckbox.emit(checkbox.checked);
  }
}
