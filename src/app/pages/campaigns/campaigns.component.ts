import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CampaignsService } from '../../services/campaigns.service';
import { Campaigns, CampaignsData } from '../../models/campaigns.model';
import { Pagination } from '../../shared/pagination/pagination.model';
import {
  BOTTOM,
  DEFAULT_PAGINATION,
  fadeAnimation,
  MULTIPLE,
  STATUS_VALUES,
} from '../../helpers/global.helper';
import { Items } from '../../shared/popup-tooltip/popup-tooltip.model';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ToastService } from '../../shared/toast/toast.service';
import { InputComponent } from '../../shared/input/input.component';
import { ComponentCanDeactivate } from '../../guards/router.guard';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  animations: fadeAnimation(),
})
export class CampaignsComponent implements OnInit, ComponentCanDeactivate {
  @ViewChild('search') public search: InputComponent;

  public data: Campaigns[] = null;
  public fullData: Campaigns[] = null;
  public pagination = { ...DEFAULT_PAGINATION };
  public loader = true;
  public submenu = null;
  public searchValue = '';
  public selectedStatusOptions = [];
  public selectedSentFromOption = [];
  public statusOption;
  public sentFromOption;

  private activeFilter = new Map<string, any[]>();

  constructor(
    private campaignsService: CampaignsService,
    private renderer: Renderer2,
    private toastService: ToastService
  ) {}

  public ngOnInit(): void {
    this.campaignsService
      .getCampaigns()
      .pipe(catchError((err) => of(err)))
      .subscribe((campaignsData: CampaignsData) => {
        this.data = campaignsData?.data;
        this.fullData = campaignsData?.data;
        this.pagination.count = campaignsData?.data?.length;
        this.loader = false;
        this.statusOption = {
          title: 'Status',
          type: MULTIPLE,
          items: STATUS_VALUES,
          position: BOTTOM,
        };
        this.sentFromOption = {
          title: 'Sent from',
          type: MULTIPLE,
          items: this.sentFromValues,
          position: BOTTOM,
        };
      });
  }

  public canDeactivate(): Observable<boolean> | boolean {
    return of(true);
  }

  public copy(event: Event, value: string): void {
    const copyInput = this.renderer.createElement('textarea');
    this.renderer.setStyle(copyInput, 'position', 'absolute');
    this.renderer.setStyle(copyInput, 'left', '0');
    this.renderer.setStyle(copyInput, 'top', '-2000px');
    this.renderer.appendChild(document.body, copyInput);
    copyInput.value = value;
    copyInput.select();
    document.execCommand('copy');
    this.renderer.removeChild(document.body, copyInput);
    this.toastService.show('Shortcode copied');
  }

  public setPagination(pagination: Pagination): void {
    this.pagination = pagination;
  }

  public searchData(search: string): void {
    this.filter([search], 'name');
  }

  public clearFilters(): void {
    if (this.activeFilter.size !== 0) {
      this.activeFilter = new Map<string, any[]>();
      this.selectedStatusOptions = [];
      this.selectedSentFromOption = [];
      this.statusOption.items.forEach(
        (item) => (item.popupItems.choose = false)
      );
      this.sentFromOption.items.forEach(
        (item) => (item.popupItems.choose = false)
      );
      this.search.clearValue();
    }

    this.data = this.fullData;
    this.pagination.count = this.data.length;
  }

  public filter(keyList: any[], name: string): void {
    if (keyList.length === 0) {
      this.activeFilter.delete(name);
    } else {
      this.activeFilter.set(name, keyList);
    }

    if (this.activeFilter.size === 0) {
      this.clearFilters();
      return;
    }

    const newData = [];
    const status = this.activeFilter.get('status');
    const fromEmail = this.activeFilter.get('from_email');
    const campaignName = this.activeFilter.get('name');

    if (status && fromEmail && campaignName) {
      status.forEach((statusValue) => {
        fromEmail.forEach((formEmailValue) => {
          campaignName.forEach((campaignNameValue) => {
            this.fullData.forEach((campaigns: Campaigns) => {
              if (
                campaigns.status === statusValue &&
                campaigns.from_email === formEmailValue &&
                campaigns.name
                  .toLowerCase()
                  .includes(campaignNameValue.toLowerCase())
              ) {
                newData.push(campaigns);
              }
            });
          });
        });
      });
    } else if (status && campaignName) {
      status.forEach((statusValue) => {
        campaignName.forEach((campaignNameValue) => {
          this.fullData.forEach((campaigns: Campaigns) => {
            if (
              campaigns.status === statusValue &&
              campaigns.name
                .toLowerCase()
                .includes(campaignNameValue.toLowerCase())
            ) {
              newData.push(campaigns);
            }
          });
        });
      });
    } else if (fromEmail && campaignName) {
      fromEmail.forEach((formEmailValue) => {
        campaignName.forEach((campaignNameValue) => {
          this.fullData.forEach((campaigns: Campaigns) => {
            if (
              campaigns.from_email === formEmailValue &&
              campaigns.name
                .toLowerCase()
                .includes(campaignNameValue.toLowerCase())
            ) {
              newData.push(campaigns);
            }
          });
        });
      });
    } else if (status) {
      status.forEach((statusValue) => {
        this.fullData.forEach((campaigns: Campaigns) => {
          if (campaigns.status === statusValue) {
            newData.push(campaigns);
          }
        });
      });
    } else if (fromEmail) {
      fromEmail.forEach((formEmailValue) => {
        this.fullData.forEach((campaigns: Campaigns) => {
          if (campaigns.from_email === formEmailValue) {
            newData.push(campaigns);
          }
        });
      });
    } else if (campaignName) {
      campaignName.forEach((campaignNameValue) => {
        this.fullData.forEach((campaigns: Campaigns) => {
          if (
            campaigns.name
              .toLowerCase()
              .includes(campaignNameValue.toLowerCase())
          ) {
            newData.push(campaigns);
          }
        });
      });
    }

    this.pagination = { ...DEFAULT_PAGINATION };
    this.pagination.count = newData?.length;
    this.data = newData;
  }

  private get sentFromValues(): Items[] {
    const options = [];

    if (!this.data) {
      return options;
    }

    this.data.forEach((item: Campaigns) => {
      if (
        item.from_email === '' ||
        options.findIndex((menuItem) => menuItem.key === item.from_email) !== -1
      ) {
        return;
      }

      options.push({
        key: item.from_email,
        popupItems: {
          value: item.from_email,
          choose: false,
          icon: 'ico--prospect',
        },
      });
    });

    return options;
  }
}
