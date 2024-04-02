import { Component } from '@angular/core';
import { fadeAnimation } from '../../helpers/global.helper';
import { ComponentCanDeactivate } from '../../guards/router.guard';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  animations: fadeAnimation(),
})
export class FormsComponent implements ComponentCanDeactivate {
  public submenu = null;

  constructor() {}

  public canDeactivate(): Observable<boolean> | boolean {
    return of(true);
  }
}
