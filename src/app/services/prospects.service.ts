import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProspectsData } from '../models/prospects.model';
import { API_URL, HEADER } from '../helpers/global.helper';

@Injectable({
  providedIn: 'root',
})
export class ProspectsService {
  constructor(private http: HttpClient) {}

  public getProspects(
    range: number,
    page: number,
    status: string
  ): Observable<ProspectsData> {
    return this.http.post<ProspectsData>(
      `${API_URL}wfw/v1/prospects`,
      {
        range,
        page,
        status,
      },
      {
        headers: HEADER,
      }
    );
  }
}
