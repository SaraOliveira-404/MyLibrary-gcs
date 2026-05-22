import { StatusLivro } from './status-livro.model';

export interface Livro {
  id: number;
  titulo: string;
  autor: string;
  isbn: string;
  ano: number;
  categoria: string;
  status: StatusLivro;
}

export interface LivroRequest {
  titulo: string;
  autor: string;
  isbn: string;
  ano: number;
  categoriaId: number;
}

export interface LivroFiltro {
  categoriaId?: number | null;
  status?: StatusLivro | null;
  termo?: string | null;
}
