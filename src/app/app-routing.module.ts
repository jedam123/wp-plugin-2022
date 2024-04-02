import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsComponent } from './pages/forms/forms.component';
import { AppPaths } from './helpers/app.paths';
import { SettingsComponent } from './pages/settings/settings.component';
import { CampaignsComponent } from './pages/campaigns/campaigns.component';
import { ProspectsComponent } from './pages/prospects/prospects.component';
import { FieldsComponent } from './pages/fields/fields.component';
import { StyleComponent } from './pages/style/style.component';
import { FormSettingsComponent } from './pages/form-settings/form-settings.component';
import { TroubleshootComponent } from './pages/troubleshoot/troubleshoot.component';
import { RouterGuard } from './guards/router.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: AppPaths.FORMS,
    pathMatch: 'full',
  },
  {
    path: AppPaths.FORMS,
    component: FormsComponent,
    canDeactivate: [RouterGuard],
  },
  {
    path: AppPaths.FORMS + '/' + AppPaths.FIELDS,
    component: FieldsComponent,
    canDeactivate: [RouterGuard],
  },
  {
    path: AppPaths.FORMS + '/' + AppPaths.STYLE,
    component: StyleComponent,
    canDeactivate: [RouterGuard],
  },
  {
    path: AppPaths.FORMS + '/' + AppPaths.FORM_SETTINGS,
    component: FormSettingsComponent,
    canDeactivate: [RouterGuard],
  },
  {
    path: AppPaths.CAMPAIGNS,
    component: CampaignsComponent,
    canDeactivate: [RouterGuard],
  },
  {
    path: AppPaths.PROSPECTS,
    component: ProspectsComponent,
    canDeactivate: [RouterGuard],
  },
  {
    path: AppPaths.SETTINGS,
    redirectTo: AppPaths.SETTINGS + '/' + AppPaths.API_KEY,
    pathMatch: 'full',
  },
  {
    path: AppPaths.SETTINGS + '/' + AppPaths.API_KEY,
    component: SettingsComponent,
    canDeactivate: [RouterGuard],
  },
  {
    path: AppPaths.TROUBLESHOOT,
    component: TroubleshootComponent,
    canDeactivate: [RouterGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
