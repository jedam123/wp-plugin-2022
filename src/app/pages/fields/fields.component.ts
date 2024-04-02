import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Tags } from '../../models/tags.model';
import {
  CdkDragDrop,
  copyArrayItem,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import {
  DROPDOWN,
  fadeAnimation,
  getAllTags,
  getBlackLargeButton,
  getReminderPopupWithColor,
  getSilverLargeButton,
  isEmailField,
  SINGLE,
} from '../../helpers/global.helper';
import { DropdownData } from '../../shared/dropdown/dropdown-widget.model';
import { PopupTooltipData } from '../../shared/popup-tooltip/popup-tooltip.model';
import { EMAIL, getFieldsSubmenu } from '../../helpers/fields.helper';
import { FormsService } from '../../services/forms.service';
import { FieldsData, FormsData } from '../../models/forms.model';
import { ToastService } from '../../shared/toast/toast.service';
import { ComponentCanDeactivate } from '../../guards/router.guard';
import { Observable, Observer, of } from 'rxjs';

const MAPPING_TEXT = 'Mapping';

@Component({
  selector: 'app-fields',
  templateUrl: './fields.component.html',
  animations: fadeAnimation(),
})
export class FieldsComponent implements OnInit, ComponentCanDeactivate {
  public buttonSave = getBlackLargeButton();
  public buttonUndo = getSilverLargeButton();
  public showReminder = false;
  public allTags = getAllTags();
  public items: Tags[] = [];
  public editFieldData: Tags = null;
  public submenu = getFieldsSubmenu();
  public isChanged = false;
  public dropdownData: DropdownData = null;
  public formsData: FormsData;
  public loader = true;
  public showLeaveReminder = false;
  public reminderPopup = getReminderPopupWithColor();
  private closeObserver: Observer<boolean>;

  constructor(
    private formsService: FormsService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private toastService: ToastService
  ) {}

  public ngOnInit(): void {
    this.formsService
      .getForms()
      .subscribe((data: FormsData) => (this.formsData = data));
    this.setDefaultItems();
  }

  public canDeactivate(): Observable<boolean> | boolean {
    if (this.isChanged) {
      return new Observable((observer: Observer<boolean>) => {
        this.showLeaveReminder = true;
        this.closeObserver = observer;
      });
    } else {
      return of(true);
    }
  }

  public back(): void {
    this.showLeaveReminder = false;
  }

  public cancel(): void {
    setTimeout(() => {
      this.closeObserver.next(true);
      this.closeObserver.complete();
      this.closeObserver = null;
    }, 300);
  }

  public drop(event: CdkDragDrop<Tags[]>): void {
    if (event.currentIndex === event.previousIndex) {
      return;
    }

    this.isChanged = true;

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      event.previousContainer.data[event.previousIndex].disabled = true;
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  public removeField(field: Tags): void {
    this.items.splice(this.items.indexOf(field), 1);
    this.allTags.find((tag: Tags) => tag.slug === field.slug).disabled = false;
    this.isChanged = true;
  }

  public resetForm(): void {
    this.items = [];
    this.setDefaultItems();
    this.allTags = getAllTags();
    this.isChanged = false;
  }

  public showPanel(data: Tags): void {
    this.editFieldData = data;

    this.dropdownData = {
      options: this.getOptions(data.field_map),
      label: MAPPING_TEXT,
      defaultKey: data.field_map,
      isEnabled: !isEmailField(data),
    };
  }

  public closePanel(): void {
    this.editFieldData = null;
    this.dropdownData = null;
  }

  public setData(newData: Tags): void {
    this.items[this.items.findIndex((tag: Tags) => tag.slug === newData.slug)] =
      newData;
    this.closePanel();
  }

  public toggleButtonColor(isOn: boolean): void {
    const button =
      this.elementRef.nativeElement.querySelector('.wfw-fields__btn');
    const color = isOn
      ? this.formsData.button_hover
      : this.formsData.button_color;

    this.renderer.setStyle(button, 'background-color', color);
  }

  public updateData(data: Tags): void {
    this.closePanel();
    const tagToUpdate = this.items.find((item) => item.slug === data.slug);
    tagToUpdate.name = data.name;
    tagToUpdate.field_map = data.field_map;
    tagToUpdate.required = data.required;
    tagToUpdate.validation_msg = data.validation_msg;
    this.isChanged = true;
  }

  public saveFields(): void {
    const fieldsData = [];
    let i = 1;

    this.items.forEach((item) => {
      fieldsData.push({
        id: i,
        field_label: item.name,
        fields_map: item.field_map,
        form_id: 1,
        required: item.required,
        validate_text: item.validation_msg,
        slug: item.slug,
      } as FieldsData);
      i++;
    });

    this.formsService.saveFields(fieldsData).subscribe(() => {
      this.toastService.show('Changes saved');
      this.resetForm();
    });
  }

  public addField(field: Tags): void {
    if (field.disabled) {
      return;
    }

    field.disabled = true;
    this.items.push(field);
    this.isChanged = true;
  }

  private getOptions(defaultValue: string): PopupTooltipData {
    const allFields = getAllTags();
    const options = [];

    allFields.forEach((tag: Tags) => {
      options.push({
        key: tag.slug,
        popupItems: {
          value: tag.name,
          choose: defaultValue === tag.slug,
          isHidden: isEmailField(tag),
        },
      });
    });

    return {
      title: MAPPING_TEXT,
      items: options,
      type: SINGLE,
      position: DROPDOWN,
    };
  }

  private setDefaultItems(): void {
    this.loader = true;
    this.items = [];
    this.formsService.getFields().subscribe((fieldsData: FieldsData[]) => {
      this.setFieldsData(fieldsData);
      this.loader = false;
    });
  }

  private setFieldsData(fieldsData: FieldsData[]): void {
    this.items = [];
    fieldsData.forEach((data: FieldsData) => {
      this.items.push({
        id: data.id,
        slug: data.slug,
        name: data.field_label,
        field_map: data.fields_map,
        disabled: data.slug === EMAIL,
        required: data.required,
        validation_msg: data.validate_text,
      });
      const findTag = this.allTags.find((tag: Tags) => tag.slug === data.slug);

      if (findTag) {
        findTag.disabled = true;
      }
    });
  }
}
