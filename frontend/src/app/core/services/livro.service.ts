import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livro, LivroFiltro, LivroRequest } from '../models/livro.model';
//import { Emprestimo } from '../models/emprestimo.model';
import { API_BASE_URL } from './api.config';

@Injectable({ providedIn: 'root' })
export class LivroService {
  private readonly apiUrl = `${API_BASE_URL}/livros`;

  constructor(private readonly http: HttpClient) {}

  listar(filtro: LivroFiltro = {}): Observable<Livro[]> {
    let params = new HttpParams();

    if (filtro.categoriaId) {
      params = params.set('categoriaId', filtro.categoriaId);
    }

    if (filtro.status) {
      params = params.set('status', filtro.status);
    }

    if (filtro.termo?.trim()) {
      params = params.set('termo', filtro.termo.trim());
    }

    return this.http.get<Livro[]>(this.apiUrl, { params });
  }

  buscarPorId(id: number): Observable<Livro> {
    return this.http.get<Livro>(`${this.apiUrl}/${id}`);
  }

  buscarPorIsbn(isbn: string): Observable<Livro> {
    return this.http.get<Livro>(`${this.apiUrl}/isbn/${isbn}`);
  }

  cadastrar(request: LivroRequest): Observable<Livro> {
    return this.http.post<Livro>(this.apiUrl, request);
  }

  atualizar(id: number, request: LivroRequest): Observable<Livro> {
    return this.http.put<Livro>(`${this.apiUrl}/${id}`, request);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /*historico(id: number): Observable<Emprestimo[]> {
    return this.http.get<Emprestimo[]>(`${this.apiUrl}/${id}/historico`);
  }*/
}
