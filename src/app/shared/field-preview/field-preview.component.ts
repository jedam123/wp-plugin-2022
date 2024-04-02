import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tags } from '../../models/tags.model';
import { clearAllTooltips, isEmailField } from '../../helpers/global.helper';

@Component({
  selector: 'app-field-preview',
  templateUrl: './field-preview.component.html',
})
export class FieldPreviewComponent {
  @Input() public field: Tags;
  @Input() public tag = false;
  @Input() public drag = false;
  @Input() public showActions = true;

  @Output() edit = new EventEmitter();
  @Output() remove = new EventEmitter();

  public checkEmailField = isEmailField;

  constructor() {}

  public onEdit(): void {
    this.edit.emit();
  }

  public onRemove(): void {
    if (this.checkEmailField(this.field)) {
      return;
    }

    clearAllTooltips();
    this.remove.emit();
  }
}
