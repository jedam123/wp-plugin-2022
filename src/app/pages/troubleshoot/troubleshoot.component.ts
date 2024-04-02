import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SettingsService } from '../../services/settings.service';
import { ComponentCanDeactivate } from '../../guards/router.guard';

@Component({
  selector: 'app-troubleshoot',
  templateUrl: './troubleshoot.component.html',
  styleUrls: ['./troubleshoot.component.scss'],
})
export class TroubleshootComponent implements OnInit, ComponentCanDeactivate {
  public message = '';

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.settingsService.setFactorySettings().subscribe(
      (response) => (this.message = response.message),
      (err) => (this.message = err.error.message)
    );
  }

  public canDeactivate(): Observable<boolean> | boolean {
    return of(true);
  }
}
