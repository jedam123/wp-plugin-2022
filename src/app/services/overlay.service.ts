import { ElementRef, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  public isActive$ = new Subject<boolean>();

  private callbackFn: (event: Event) => boolean = null;
  private componentRef: ElementRef;

  public attachComponent(component: ElementRef): void {
    this.componentRef = component;
  }

  public detachComponent(): void {
    this.componentRef = null;
  }

  public isComponentAttached(): boolean {
    return !!this.componentRef;
  }

  public show(callback?: () => boolean): void {
    this.isActive$.next(true);
    if (callback) {
      this.callbackFn = callback;
    }
  }

  public hide(event?: Event): boolean {
    let doHide = true;

    if (this.callbackFn) {
      doHide = this.callbackFn(event);
    }

    if (doHide) {
      this.isActive$.next(false);
      this.callbackFn = null;
    }

    return doHide;
  }
}
