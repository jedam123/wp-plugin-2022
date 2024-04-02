import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { OverlayService } from '../../services/overlay.service';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverlayComponent implements OnInit, OnDestroy {
  @Input() public asOverlay = false;
  @Input() public closeOnClick = true;
  @Input() public background: string;
  @Input() public opacity = 0.8;
  @Input() public zIndex: number;
  @Output() public closing = new EventEmitter();

  @ViewChild('overlay') public overlayContainer: ElementRef;
  public isActive: boolean;

  private hasListener = false;
  private bindedOnClick = this.onClickClose.bind(this);
  private hasSubscription = false;
  private subscriptions = new Subscription();

  constructor(
    private renderer: Renderer2,
    private element: ElementRef,
    private service: OverlayService,
    private cd: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    if (this.service.isComponentAttached()) {
      return;
    }

    this.service.attachComponent(this.element);
    this.hasSubscription = true;
    this.subscriptions.add(
      this.service.isActive$.subscribe((isVisible) => {
        this.isActive = isVisible;
        if (isVisible) {
          document.addEventListener('click', this.bindedOnClick, true);
          this.hasListener = true;
        }
        this.cd.detectChanges();
      })
    );
  }

  public onClickClose(event: Event): void {
    const isHidden = this.service.hide(event);

    if (isHidden) {
      document.removeEventListener('click', this.bindedOnClick, true);
      this.hasListener = false;
    }
  }

  public ngOnDestroy(): void {
    if (this.hasSubscription) {
      document.removeEventListener('click', this.bindedOnClick, true);
      this.service.detachComponent();
      this.subscriptions.unsubscribe();
    }
  }
}
