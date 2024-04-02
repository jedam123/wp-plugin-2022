import { BrowserModule } from '@angular/platform-browser';
import { DoBootstrap, Injector, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MenuComponent } from './shared/menu/menu.component';
import { FormsComponent } from './pages/forms/forms.component';
import { InfoBarComponent } from './shared/info-bar/info-bar.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { CampaignsComponent } from './pages/campaigns/campaigns.component';
import { ProspectsComponent } from './pages/prospects/prospects.component';
import { InputComponent } from './shared/input/input.component';
import { EmptyStateComponent } from './shared/empty-state/empty-state.component';
import { ButtonComponent } from './shared/button/button.component';
import { PluginComponent } from './plugin/plugin.component';
import { createCustomElement } from '@angular/elements';
import { AppRoutingModule } from './app-routing.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FieldsComponent } from './pages/fields/fields.component';
import { FieldPreviewComponent } from './shared/field-preview/field-preview.component';
import { PaginationComponent } from './shared/pagination/pagination.component';
import { HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from './shared/loader/loader.component';
import { StyleComponent } from './pages/style/style.component';
import { FormSettingsComponent } from './pages/form-settings/form-settings.component';
import { PopupComponent } from './shared/popup/popup.component';
import { PopupTooltipComponent } from './shared/popup-tooltip/popup-tooltip.component';
import { TooltipDirective } from './directives/tooltip.directive';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SwitchWidgetComponent } from './shared/switch-widget/switch-widget.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { EditPanelComponent } from './shared/edit-panel/edit-panel.component';
import { DropdownComponent } from './shared/dropdown/dropdown.component';
import { CheckboxComponent } from './shared/checkbox/checkbox.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterComponent } from './shared/filter/filter.component';
import { OverlayComponent } from './shared/overlay/overlay.component';
import { TroubleshootComponent } from './pages/troubleshoot/troubleshoot.component';
import { ToastComponent } from './shared/toast/toast.component';
import { NoResultComponent } from './shared/no-result/no-result.component';
import { RouterGuard } from './guards/router.guard';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FormsComponent,
    InfoBarComponent,
    SettingsComponent,
    CampaignsComponent,
    ProspectsComponent,
    InputComponent,
    EmptyStateComponent,
    ButtonComponent,
    PluginComponent,
    FieldsComponent,
    FieldPreviewComponent,
    PaginationComponent,
    LoaderComponent,
    StyleComponent,
    FormSettingsComponent,
    PopupComponent,
    PopupTooltipComponent,
    TooltipDirective,
    SwitchWidgetComponent,
    EditPanelComponent,
    DropdownComponent,
    CheckboxComponent,
    FilterComponent,
    OverlayComponent,
    TroubleshootComponent,
    ToastComponent,
    NoResultComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DragDropModule,
    ColorPickerModule,
    NgScrollbarModule,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    RouterGuard,
  ],
  exports: [TooltipDirective],
  entryComponents: [PluginComponent],
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  ngDoBootstrap(): void {
    const plugin = createCustomElement(PluginComponent, {
      injector: this.injector,
    });
    customElements.define('app-plugin', plugin);
  }
}
