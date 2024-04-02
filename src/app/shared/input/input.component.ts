import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { SEARCH, TEXT } from '../../helpers/global.helper';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  @Input() label: string;
  @Input() type = TEXT;

  @Input() placeholder: string;
  @Input() value = '';
  @Input() validationMsg = '';
  @Input() isEnabled = true;
  @Input() isError = false;

  @Output() onEdit = new EventEmitter<string>();
  @Output() onEnter = new EventEmitter<string>();

  public hasValue = false;

  constructor(private elementRef: ElementRef) {}

  public updateValue(event: Event): void {
    this.onEdit.emit((event.target as HTMLInputElement).value);
  }

  public onKeydown(event: Event): void {
    this.hasValue =
      (event.target as HTMLInputElement).value.trim() !== '' &&
      this.type === SEARCH;
  }

  public clearValue(): void {
    this.elementRef.nativeElement.querySelector(
      '.wfw-input-widget__input'
    ).value = '';
    this.hasValue = false;
    this.onEnter.emit('');
  }

  public enter(event: Event): void {
    const input = event.target as HTMLInputElement;
    const inputValue = input.value.trim();

    if (inputValue === '') {
      input.value = '';
    }

    this.onEnter.emit(inputValue);
  }
}
