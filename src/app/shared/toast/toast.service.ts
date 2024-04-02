import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  public toastSubject = new Subject<any>();
  public toastState = this.toastSubject.asObservable();

  constructor() {}

  public show(message: string): void {
    this.toastSubject.next({
      show: true,
      message,
    });
  }
}
