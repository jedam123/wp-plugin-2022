import { Component, OnInit } from '@angular/core';
import { Observable, Observer, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FormsService } from '../../services/forms.service';
import { ToastService } from '../../shared/toast/toast.service';
import { ComponentCanDeactivate } from '../../guards/router.guard';
import { FormsData } from '../../models/forms.model';

import { getFieldsSubmenu } from '../../helpers/fields.helper';
import {
  fadeAnimation,
  getBlackLargeButton,
  getReminderPopupWithColor,
  getSilverLargeButton,
} from '../../helpers/global.helper';

@Component({
  selector: 'app-form-settings',
  templateUrl: './form-settings.component.html',
  animations: fadeAnimation(),
})
export class FormSettingsComponent implements OnInit, ComponentCanDeactivate {
  public buttonSave = getBlackLargeButton();
  public buttonUndo = getSilverLargeButton();
  public submenu = getFieldsSubmenu();
  public formsData: FormsData;
  public formsDataOrg: FormsData;
  public isEdited = false;
  public loader = true;
  public showLeaveReminder = false;
  public reminderPopup = getReminderPopupWithColor();
  private closeObserver: Observer<boolean>;

  constructor(
    private formsService: FormsService,
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

  public initFormsData(): void {
    this.isEdited = false;
    this.formsService.getForms().subscribe((data: FormsData) => {
      this.setFormsData(data);
      this.loader = false;
    });
  }

  public updateMessage(value: string, fieldName: string): void {
    this.formsData[fieldName] = value;
    this.isEdited = this.isEditedField;
  }

  public get isEditedField(): boolean {
    return (
      this.formsData.success_message !== this.formsDataOrg.success_message ||
      this.formsData.error_message !== this.formsDataOrg.error_message ||
      this.formsData.already_exist_message !==
        this.formsDataOrg.already_exist_message ||
      this.formsData.field_required_message !==
        this.formsDataOrg.field_required_message ||
      this.formsData.privacy_policy_message !==
        this.formsDataOrg.privacy_policy_message
    );
  }

  public resetField(): void {
    this.formsData = { ...this.formsDataOrg };
    this.isEdited = false;
  }

  public saveFields(): void {
    this.formsService
      .saveFormsSettings(this.formsData)
      .pipe(catchError((err) => of(err)))
      .subscribe((data) => {
        this.toastService.show('Changes saved');
        this.setFormsData(data);
      });
  }

  private setFormsData(data: FormsData): void {
    this.formsData = data;
    this.formsDataOrg = { ...this.formsData };
    this.isEdited = false;
  }
}
