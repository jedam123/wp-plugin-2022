import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Tags } from '../../models/tags.model';
import {
  getBlackXLargeButton,
  getReminderPopup,
  getSilverXLargeButton,
} from '../../helpers/global.helper';
import { DropdownData } from '../dropdown/dropdown-widget.model';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-edit-panel',
  templateUrl: './edit-panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('animate', [
      transition(':enter', [
        style({
          width: 0,
          opacity: 0,
        }),
        animate('200ms', style({ width: '262px', opacity: 1 })),
      ]),
      transition(':leave', [
        style({
          width: '262px',
          opacity: 1,
        }),
        animate('200ms', style({ width: 0, opacity: 0 })),
      ]),
    ]),
  ],
})
export class EditPanelComponent implements OnInit {
  @Input() data: Tags;
  @Input() dropdownData: DropdownData;
  @Input() allTags: Tags[];

  @Output() close = new EventEmitter();
  @Output() done = new EventEmitter<Tags>();

  public buttonDone = getBlackXLargeButton();
  public buttonCancel = getSilverXLargeButton();
  public showReminder = false;
  public reminderPopup = getReminderPopup();

  public newData: Tags = {} as Tags;
  public isOpen = true;
  public isError = false;

  constructor() {}

  public ngOnInit(): void {
    this.newData = {
      id: this.data.id,
      slug: this.data.slug,
      field_map: this.data.field_map,
      name: this.data.name,
      disabled: this.data.disabled,
      required: this.data.required,
      validation_msg: this.data.validation_msg,
    };
  }

  public onClose(): void {
    if (this.isDataChanged) {
      this.showReminder = true;
      return;
    }

    this.cancel();
  }

  public back(): void {
    this.showReminder = false;
  }

  public cancel(): void {
    this.isOpen = false;

    setTimeout(() => this.close.emit(), 300);
  }

  public onDone(): void {
    if (!this.isDuplicateFieldMapping) {
      this.isError = true;
      this.dropdownData.validationMsg = 'Duplicate';
      return;
    }

    this.isOpen = false;
    setTimeout(() => this.done.emit(this.newData), 300);
  }

  public selectItem(fieldMap: string): void {
    this.isError = false;
    this.dropdownData.defaultKey = fieldMap;
    this.newData.field_map = fieldMap;
  }

  public toggleCheckbox(isChecked: boolean): void {
    this.newData.required = isChecked;
  }

  private get isDuplicateFieldMapping(): boolean {
    return (
      this.allTags.filter(
        (tag: Tags) =>
          tag.slug !== this.data.slug &&
          this.newData.field_map === tag.field_map
      ).length <= 0
    );
  }

  private get isDataChanged(): boolean {
    return (
      this.data.validation_msg !== this.newData.validation_msg ||
      this.data.name !== this.newData.name ||
      this.data.field_map !== this.newData.field_map ||
      this.data.required !== this.newData.required
    );
  }
}
