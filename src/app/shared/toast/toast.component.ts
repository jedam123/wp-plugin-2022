import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastService } from './toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
})
export class ToastComponent implements OnInit, OnDestroy {
  public show = false;
  public message = '';
  private subscription = new Subscription();

  constructor(private toastService: ToastService) {}

  public ngOnInit(): void {
    this.subscription = this.toastService.toastState.subscribe((state) => {
      this.message = state.message;
      this.show = state.show;
      setTimeout(() => this.close(), 3000);
    });
  }

  public close(): void {
    this.show = false;
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
