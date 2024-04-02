import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FieldsData, FormsData } from '../models/forms.model';
import { API_URL, HEADER } from '../helpers/global.helper';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  constructor(private http: HttpClient) {}

  public getForms(): Observable<FormsData> {
    return this.http.get<FormsData>(`${API_URL}wfw/v1/forms`, {
      headers: HEADER,
    });
  }

  public getFields(): Observable<FieldsData[]> {
    return this.http.get<FieldsData[]>(`${API_URL}wfw/v1/fields`, {
      headers: HEADER,
    });
  }

  public saveFields(fieldsData: FieldsData[]): Observable<FieldsData[]> {
    return this.http.post<FieldsData[]>(
      `${API_URL}wfw/v1/save_fields`,
      fieldsData,
      {
        headers: HEADER,
      }
    );
  }

  public saveFormsStyle(formsData: FormsData): Observable<FormsData> {
    return this.http.post<FormsData>(
      `${API_URL}wfw/v1/save_forms_style`,
      formsData,
      {
        headers: HEADER,
      }
    );
  }

  public saveFormsSettings(formsData: FormsData): Observable<FormsData> {
    return this.http.post<FormsData>(
      `${API_URL}wfw/v1/save_forms_settings`,
      formsData,
      {
        headers: HEADER,
      }
    );
  }
}
