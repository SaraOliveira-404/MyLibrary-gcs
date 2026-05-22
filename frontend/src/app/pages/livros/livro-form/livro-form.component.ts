import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Categoria } from '../../../core/models/categoria.model';
import { CategoriaService } from '../../../core/services/categoria.service';
import { LivroService } from '../../../core/services/livro.service';
import { getApiErrorMessage } from '../../../core/services/error-message.util';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';

@Component({
  selector: 'app-livro-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, LoadingComponent],
  templateUrl: './livro-form.component.html',
  styleUrl: './livro-form.component.css'
})
export class LivroFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  categorias: Categoria[] = [];
  livroId: number | null = null;
  carregando = false;
  salvando = false;
  erro = '';

  form = this.fb.nonNullable.group({
    titulo: ['', [Validators.required]],
    autor: ['', [Validators.required]],
    isbn: ['', [Validators.required]],
    ano: [new Date().getFullYear(), [Validators.required, Validators.min(0)]],
    categoriaId: [0, [Validators.required, Validators.min(1)]]
  });

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly livroService: LivroService,
    private readonly categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.livroId = id ? Number(id) : null;
    this.carregarDados();
  }

  carregarDados(): void {
    this.carregando = true;
    this.erro = '';

    if (this.livroId) {
      forkJoin({
        categorias: this.categoriaService.listar(),
        livro: this.livroService.buscarPorId(this.livroId)
      }).subscribe({
        next: ({ categorias, livro }) => {
          this.categorias = categorias;
          const categoria = categorias.find((item) => item.nome === livro.categoria);

          this.form.patchValue({
            titulo: livro.titulo,
            autor: livro.autor,
            isbn: livro.isbn,
            ano: livro.ano,
            categoriaId: categoria?.id ?? 0
          });

          this.carregando = false;
        },
        error: (error) => {
          this.erro = getApiErrorMessage(error);
          this.carregando = false;
        }
      });
      return;
    }

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

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.salvando = true;
    this.erro = '';
    const request = this.form.getRawValue();

    const operacao = this.livroId
      ? this.livroService.atualizar(this.livroId, request)
      : this.livroService.cadastrar(request);

    operacao.subscribe({
      next: () => this.router.navigateByUrl('/livros'),
      error: (error) => {
        this.erro = getApiErrorMessage(error);
        this.salvando = false;
      }
    });
  }

  campoInvalido(campo: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[campo];
    return control.invalid && (control.touched || control.dirty);
  }
}