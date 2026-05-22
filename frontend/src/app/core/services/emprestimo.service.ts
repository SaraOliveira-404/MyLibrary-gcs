import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Emprestimo, EmprestimoRequest } from '../models/emprestimo.model';
import { API_BASE_URL } from './api.config';

@Injectable({ providedIn: 'root' })
export class EmprestimoService {
  private readonly apiUrl = `${API_BASE_URL}/emprestimos`;

  constructor(private readonly http: HttpClient) {}

  listarTodos(): Observable<Emprestimo[]> {
    return this.http.get<Emprestimo[]>(this.apiUrl);
  }

  listarAtivos(): Observable<Emprestimo[]> {
    return this.http.get<Emprestimo[]>(`${this.apiUrl}/ativos`);
  }

  listarAtrasados(): Observable<Emprestimo[]> {
    return this.http.get<Emprestimo[]>(`${this.apiUrl}/atrasados`);
  }

  emprestar(request: EmprestimoRequest): Observable<Emprestimo> {
    return this.http.post<Emprestimo>(`${this.apiUrl}/emprestar`, request);
  }

  devolver(id: number): Observable<Emprestimo> {
    return this.http.post<Emprestimo>(`${this.apiUrl}/${id}/devolver`, {});
  }
}
