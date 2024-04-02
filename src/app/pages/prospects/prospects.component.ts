import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ComponentCanDeactivate } from '../../guards/router.guard';
import { ProspectsService } from '../../services/prospects.service';
import { Prospects, ProspectsData } from '../../models/prospects.model';
import { Pagination } from '../../shared/pagination/pagination.model';
import { campaignStatusMapper } from '../../helpers/prospects.helper';
import {
  DEFAULT_PAGINATION,
  fadeAnimation,
  MULTIPLE,
  PROSPECT_STATUS_VALUES,
} from '../../helpers/global.helper';

@Component({
  selector: 'app-prospects',
  templateUrl: './prospects.component.html',
  animations: fadeAnimation(),
})
export class ProspectsComponent implements OnInit, ComponentCanDeactivate {
  public pagination = { ...DEFAULT_PAGINATION };
  public loader = true;
  public refreshPage = false;
  public submenu = null;
  public statusOption;
  public keyList = [];
  public campaignStatusMapper = campaignStatusMapper;

  private prospects: Prospects[];

  constructor(private prospectsService: ProspectsService) {}

  ngOnInit(): void {
    this.loadData('');
  }

  public canDeactivate(): Observable<boolean> | boolean {
    return of(true);
  }

  public setPagination(pagination: Pagination): void {
    this.pagination = pagination;
    this.refreshPage = true;
    this.loadData('');
  }

  public filter(keyList: any[]): void {
    this.loader = true;
    this.keyList = keyList;
    this.pagination.page = 1;
    this.loadData(keyList.join());
  }

  public clearFilters(): void {
    this.loader = true;
    this.keyList = [];
    this.pagination.page = 1;
    this.prospects = [];
    this.loadData('');
    this.statusOption.items.forEach((item) => (item.popupItems.choose = false));
  }

  private loadData(statusFilter: string): void {
    this.prospectsService
      .getProspects(this.pagination.range, this.pagination.page, statusFilter)
      .pipe(catchError((err) => of(err)))
      .subscribe((prospectsData: ProspectsData) => {
        if (prospectsData.total !== 0) {
          this.prospects = prospectsData.data;
        } else {
          this.prospects = null;
        }

        this.pagination.count = prospectsData.total;
        this.loader = false;
        this.refreshPage = false;
        this.statusOption = {
          title: 'Status',
          type: MULTIPLE,
          items: PROSPECT_STATUS_VALUES,
        };
      });
  }
}
