import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountInfo } from '../models/settings.model';
import { API_URL, HEADER } from '../helpers/global.helper';
import { WpResponse } from '../models/wordpress-response.model';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private http: HttpClient) {}

  public getApiKey(): Observable<string> {
    return this.http.get<string>(`${API_URL}wfw/v1/api_key`, {
      headers: HEADER,
    });
  }

  public saveApiKey(apiKey: string): Observable<WpResponse> {
    return this.http.post<WpResponse>(
      `${API_URL}wfw/v1/save_api_key`,
      {
        api_key: apiKey,
      },
      {
        headers: HEADER,
      }
    );
  }

  public getAccountInfo(): Observable<AccountInfo> {
    return this.http.get<AccountInfo>(`${API_URL}wfw/v1/me`, {
      headers: HEADER,
    });
  }

  public setFactorySettings(): Observable<WpResponse> {
    return this.http.get<WpResponse>(`${API_URL}wfw/v1/troubleshoot`, {
      headers: HEADER,
    });
  }

  public updateDatabase(): Observable<WpResponse> {
    return this.http.get<WpResponse>(`${API_URL}wfw/v1/update_database`, {
      headers: HEADER,
    });
  }
}
