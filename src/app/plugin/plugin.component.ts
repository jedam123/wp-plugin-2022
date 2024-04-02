import { Component } from '@angular/core';
import { MenuItem, Submenu } from '../shared/menu/menu.model';
import { AppPaths } from '../helpers/app.paths';
import { Router } from '@angular/router';
import { SettingsService } from '../services/settings.service';
import { AccountInfo } from '../models/settings.model';
import { Items } from '../shared/popup-tooltip/popup-tooltip.model';
import { animate, style, transition, trigger } from '@angular/animations';
import { RIGHT } from '../helpers/global.helper';
import { forkJoin } from 'rxjs';
import { WpResponse } from '../models/wordpress-response.model';

@Component({
  selector: 'app-plugin',
  templateUrl: './plugin.component.html',
  animations: [
    trigger('animate', [
      transition(':enter', [
        style({
          height: 0,
          opacity: 0,
        }),
        animate('300ms', style({ height: '66px', opacity: 1 })),
      ]),
      transition(':leave', [
        style({
          height: '66px',
          opacity: 1,
        }),
        animate('300ms', style({ height: 0, opacity: 0 })),
      ]),
    ]),
  ],
})
export class PluginComponent {
  public menuStructure = [
    {
      icon: 'ico--list',
      address: AppPaths.FORMS,
      tooltip: 'Forms',
    },
    {
      icon: 'ico--html',
      address: AppPaths.CAMPAIGNS,
      tooltip: 'Shortcodes',
    },
    {
      icon: 'ico--prospect',
      address: AppPaths.PROSPECTS,
      tooltip: 'Prospects',
    },
    {
      icon: 'ico--settings',
      address: AppPaths.SETTINGS,
      tooltip: 'Settings',
    },
    {
      icon: 'ico--help-menu',
      address: '',
      tooltip: '',
      popupTooltipData: {
        title: 'Help',
        items: this.getHelpData,
        position: RIGHT,
      },
      active: false,
    },
  ] as MenuItem[];
  public submenu: Submenu;
  public isApiCorrect = true;

  constructor(
    private router: Router,
    private settingsService: SettingsService
  ) {
    router.initialNavigation();
  }

  public checkSubmenu(event: any): void {
    this.submenu = event.submenu;
    forkJoin([
      this.settingsService.getAccountInfo(),
      this.settingsService.updateDatabase(),
    ]).subscribe(
      (data: [AccountInfo, WpResponse]) =>
        (this.isApiCorrect = data[0] !== null),
      (err) => console.log(err.error?.message)
    );
  }

  private get getHelpData(): Items[] {
    return [
      {
        key: 1,
        popupItems: {
          value: 'How to use it? - read manual',
          address: 'https://woodpecker.co/help/woodpecker-for-wordpress-plugin/',
          icon: 'ico--help-menu',
        },
      },
      {
        key: 2,
        popupItems: {
          value: 'See video on YouTube',
          address: 'https://www.youtube.com/channel/UCNN9wM55yaNI-KEZCfh66_A',
          icon: 'ico--yt',
        },
      },
      {
        key: 3,
        popupItems: {
          value: 'Join our Academy',
          address: 'https://woodpecker.co/academy/signup',
          icon: 'ico--book',
        },
      },
      {
        key: 4,
        popupItems: {
          value: 'Go to Woodpecker.co',
          address: 'https://woodpecker.co/',
          icon: 'ico--arrow-right',
        },
      },
    ];
  }
}
