import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Categoria } from '../../../core/models/categoria.model';
import { CategoriaService } from '../../../core/services/categoria.service';
import { getApiErrorMessage } from '../../../core/services/error-message.util';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-categoria-list',
  standalone: true,
  imports: [RouterLink, LoadingComponent, EmptyStateComponent],
  templateUrl: './categoria-list.component.html',
  styleUrl: './categoria-list.component.css'
})
export class CategoriaListComponent implements OnInit {
  categorias: Categoria[] = [];
  carregando = false;
  erro = '';
  sucesso = '';

  constructor(private readonly categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.carregarCategorias();
  }

  carregarCategorias(): void {
    this.carregando = true;
    this.erro = '';
    this.sucesso = '';

    this.categoriaService.listar().subscribe({
      next: (categorias) => {
        this.categorias = categorias;
        this.carregando = false;
      },
      error: (error) => {
        this.erro = getApiErrorMessage(error);
        this.carregando = false;
      }
    });
  }

  excluir(categoria: Categoria): void {
    if (categoria.quantidadeLivros > 0) {
      this.erro = 'Não é possível excluir uma categoria com livros vinculados.';
      return;
    }

    const confirmou = confirm(`Deseja excluir a categoria "${categoria.nome}"?`);
    if (!confirmou) return;

    this.categoriaService.excluir(categoria.id).subscribe({
      next: () => {
        this.sucesso = 'Categoria excluída com sucesso.';
        this.carregarCategorias();
      },
      error: (error) => this.erro = getApiErrorMessage(error)
    });
  }
}
