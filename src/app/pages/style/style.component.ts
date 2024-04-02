import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { forkJoin, Observable, Observer, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FormsService } from '../../services/forms.service';
import { ToastService } from '../../shared/toast/toast.service';
import { ComponentCanDeactivate } from '../../guards/router.guard';
import { Tags } from '../../models/tags.model';
import { FieldsData, FormsData } from '../../models/forms.model';
import { EMAIL, getFieldsSubmenu } from '../../helpers/fields.helper';
import {
  fadeAnimation,
  getBlackLargeButton,
  getReminderPopupWithColor,
  getSilverLargeButton,
} from '../../helpers/global.helper';

@Component({
  selector: 'app-style',
  templateUrl: './style.component.html',
  animations: fadeAnimation(),
})
export class StyleComponent implements OnInit, ComponentCanDeactivate {
  public buttonSave = getBlackLargeButton();
  public buttonUndo = getSilverLargeButton();
  public submenu = getFieldsSubmenu();
  public items = [];
  public formsData: FormsData;
  public formsDataOrg: FormsData;
  public isEdited = false;
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
    this.initFormsData();
  }

  public canDeactivate(): Observable<boolean> | boolean {
    if (this.isEdited) {
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

  public togglePanel(): void {
    const toggledValue = this.formsData.default_style === '0' ? '1' : '0';
    this.formsData.default_style = toggledValue;

    const isDefaultStyle = this.formsData.default_style === '0';
    this.formsData.button_color = isDefaultStyle
      ? '#5d32e9'
      : this.formsDataOrg.button_color;
    this.formsData.button_hover = isDefaultStyle
      ? '#5d32e9'
      : this.formsDataOrg.button_hover;
    this.formsData.font_color = isDefaultStyle
      ? '#FFFFFF'
      : this.formsDataOrg.font_color;

    this.setEdited();
  }

  public initFormsData(): void {
    this.items = [];
    this.loader = true;

    forkJoin([this.formsService.getForms(), this.formsService.getFields()])
      .pipe(catchError((err) => of(err)))
      .subscribe((formsData: [FormsData, FieldsData[]]) => {
        this.setFormsData(formsData[0]);
        this.setFieldsData(formsData[1]);
        this.loader = false;
      });
  }

  public toggleButtonColor(isOn: boolean): void {
    const button =
      this.elementRef.nativeElement.querySelector('.wfw-fields__btn');
    const color = isOn
      ? this.formsData.button_hover
      : this.formsData.button_color;

    this.renderer.setStyle(button, 'background-color', color);
  }

  public updateField(
    event: Event,
    fieldName: string,
    updateButtons: boolean,
    checkPatter: boolean
  ): void {
    let value = (event.target as HTMLInputElement).value;

    if (checkPatter) {
      value = '#' + value;
    }

    const pattern = /^#([0-9A-F]{3}){1,2}$/i;
    if (!pattern.test(value) && checkPatter) {
      return;
    }

    this.formsData[fieldName] = value;

    if (updateButtons) {
      this.setEdited();
    }
  }

  public saveData(): void {
    this.formsService
      .saveFormsStyle(this.formsData)
      .pipe(catchError((err) => of(err)))
      .subscribe((data) => {
        this.setFormsData(data);
        this.toastService.show('Changes saved');
      });
  }

  public resetData(): void {
    this.formsData = { ...this.formsDataOrg };
    this.isEdited = false;
  }

  public get isEditedField(): boolean {
    return (
      this.formsData.button_label !== this.formsDataOrg.button_label ||
      this.formsData.default_style !== this.formsDataOrg.default_style ||
      this.formsData.button_color !== this.formsDataOrg.button_color ||
      this.formsData.font_color !== this.formsDataOrg.font_color ||
      this.formsData.button_hover !== this.formsDataOrg.button_hover
    );
  }

  public setEdited(): void {
    this.isEdited = this.isEditedField;
  }

  private setFormsData(formsData: FormsData): void {
    this.isEdited = false;
    this.formsData = formsData;
    this.formsDataOrg = { ...this.formsData };
  }

  private setFieldsData(fieldsData: FieldsData[]): void {
    fieldsData.forEach((data: FieldsData) => {
      this.items.push({
        id: data.id,
        slug: data.slug,
        name: data.field_label,
        field_map: data.fields_map,
        disabled: data.slug === EMAIL,
        required: data.required,
        validation_msg: data.validate_text,
      } as Tags);
    });
  }
}
