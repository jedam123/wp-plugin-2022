import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SettingsService } from '../../services/settings.service';
import { ComponentCanDeactivate } from '../../guards/router.guard';
import { WpResponse } from '../../models/wordpress-response.model';
import { Submenu } from '../../shared/menu/menu.model';
import {
  fadeAnimation,
  getBlackLargeButton,
  getSilverLargeButton,
} from '../../helpers/global.helper';
import { AppPaths } from '../../helpers/app.paths';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  animations: fadeAnimation(),
})
export class SettingsComponent implements OnInit, ComponentCanDeactivate {
  public submenu = {
    title: 'Settings',
    address: '',
    openOnAddress: AppPaths.SETTINGS + '/' + AppPaths.API_KEY,
    menu: [
      {
        icon: 'ico--list',
        address: AppPaths.SETTINGS + '/' + AppPaths.API_KEY,
        label: 'API key',
      },
    ],
  } as Submenu;

  public apiKey = '';
  public apiKeyOrg = '';
  public editMode = false;
  public loader = true;
  public isError = false;
  public saveButton = getBlackLargeButton();
  public cancelButton = getSilverLargeButton();

  constructor(private settingsService: SettingsService) {}

  public ngOnInit(): void {
    this.settingsService.getApiKey().subscribe((apiKey: string) => {
      this.apiKey = apiKey;
      this.apiKeyOrg = apiKey;
      this.editMode = apiKey === '';
      this.loader = false;
    });
  }

  public canDeactivate(): Observable<boolean> | boolean {
    return of(true);
  }

  public updateValue(value: string): void {
    this.apiKey = value;
  }

  public saveData(): void {
    this.settingsService
      .saveApiKey(this.apiKey)
      .pipe(
        catchError((err) => {
          this.isError = true;
          return of(err);
        })
      )
      .subscribe((wpResponse: WpResponse) => {
        if (wpResponse.status === 200) {
          window.location.reload();
        } else {
          this.isError = true;
        }
      });
  }

  public cancel(): void {
    this.editMode = false;
    this.isError = false;
    this.apiKey = this.apiKeyOrg;
  }
}
