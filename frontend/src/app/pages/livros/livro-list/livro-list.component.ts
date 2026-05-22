import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Categoria } from '../../../core/models/categoria.model';
import { Livro } from '../../../core/models/livro.model';
import { StatusLivro } from '../../../core/models/status-livro.model';
import { CategoriaService } from '../../../core/services/categoria.service';
import { LivroService } from '../../../core/services/livro.service';
import { getApiErrorMessage } from '../../../core/services/error-message.util';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-livro-list',
  standalone: true,
  imports: [FormsModule, RouterLink, LoadingComponent, EmptyStateComponent],
  templateUrl: './livro-list.component.html',
  styleUrl: './livro-list.component.css'
})
export class LivroListComponent implements OnInit {
  livros: Livro[] = [];
  categorias: Categoria[] = [];
  carregando = false;
  erro = '';
  sucesso = '';

  termo = '';
  categoriaId: number | null = null;
  status: StatusLivro | null = null;

  paginaAtual = 1;
  itensPorPagina = 10;

  constructor(
    private readonly livroService: LivroService,
    private readonly categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.carregarCategorias();
    this.carregarLivros();
  }

  carregarCategorias(): void {
    this.categoriaService.listar().subscribe({
      next: (categorias) => this.categorias = categorias,
      error: (error) => this.erro = getApiErrorMessage(error)
    });
  }

  carregarLivros(): void {
    this.carregando = true;
    this.erro = '';
    this.sucesso = '';

    this.livroService.listar({
      termo: this.termo,
      categoriaId: this.categoriaId,
      status: this.status
    }).subscribe({
      next: (livros) => {
        this.livros = livros;
        this.paginaAtual = 1;
        this.carregando = false;
      },
      error: (error) => {
        this.erro = getApiErrorMessage(error);
        this.carregando = false;
      }
    });
  }

  limparFiltros(): void {
    this.termo = '';
    this.categoriaId = null;
    this.status = null;
    this.carregarLivros();
  }

  excluir(livro: Livro): void {
    if (livro.status === 'EMPRESTADO') {
      this.erro = 'Não é possível excluir um livro emprestado.';
      return;
    }

    const confirmou = confirm(`Deseja excluir o livro "${livro.titulo}"?`);
    if (!confirmou) return;

    this.livroService.excluir(livro.id).subscribe({
      next: () => {
        this.sucesso = 'Livro excluído com sucesso.';
        this.carregarLivros();
      },
      error: (error) => this.erro = getApiErrorMessage(error)
    });
  }

  get totalPaginas(): number {
    return Math.max(1, Math.ceil(this.livros.length / this.itensPorPagina));
  }

  get livrosPaginados(): Livro[] {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    return this.livros.slice(inicio, inicio + this.itensPorPagina);
  }

  alterarPagina(pagina: number): void {
    if (pagina < 1 || pagina > this.totalPaginas) return;
    this.paginaAtual = pagina;
  }
}
