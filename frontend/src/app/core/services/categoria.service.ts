import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria, CategoriaRequest } from '../models/categoria.model';
import { API_BASE_URL } from './api.config';

@Injectable({ providedIn: 'root' })
export class CategoriaService {
  private readonly apiUrl = `${API_BASE_URL}/categorias`;

  constructor(private readonly http: HttpClient) {}

  listar(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl);
  }

  criar(request: CategoriaRequest): Observable<Categoria> {
    return this.http.post<Categoria>(this.apiUrl, request);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
