import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dashboard } from '../models/dashboard.model';
import { API_BASE_URL } from './api.config';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly apiUrl = `${API_BASE_URL}/dashboard`;

  constructor(private readonly http: HttpClient) {}

  buscarDados(): Observable<Dashboard> {
    return this.http.get<Dashboard>(this.apiUrl);
  }
}
