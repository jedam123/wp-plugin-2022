import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupTooltipComponent } from './popup-tooltip.component';

describe('PopupTooltipComponent', () => {
  let component: PopupTooltipComponent;
  let fixture: ComponentFixture<PopupTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupTooltipComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
