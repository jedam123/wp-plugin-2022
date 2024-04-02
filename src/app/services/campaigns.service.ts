import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CampaignsData } from '../models/campaigns.model';
import { API_URL, HEADER } from '../helpers/global.helper';

@Injectable({
  providedIn: 'root',
})
export class CampaignsService {
  constructor(private http: HttpClient) {}

  public getCampaigns(): Observable<CampaignsData> {
    return this.http.get<CampaignsData>(`${API_URL}wfw/v1/campaigns_list`, {
      headers: HEADER,
    });
  }
}
