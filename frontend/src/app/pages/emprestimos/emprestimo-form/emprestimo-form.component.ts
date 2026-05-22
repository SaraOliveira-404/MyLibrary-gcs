import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Livro } from '../../../core/models/livro.model';
import { LivroService } from '../../../core/services/livro.service';
import { EmprestimoService } from '../../../core/services/emprestimo.service';
import { getApiErrorMessage } from '../../../core/services/error-message.util';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';

@Component({
  selector: 'app-emprestimo-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, LoadingComponent],
  templateUrl: './emprestimo-form.component.html',
  styleUrl: './emprestimo-form.component.css'
})
export class EmprestimoFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  livrosDisponiveis: Livro[] = [];
  carregando = false;
  salvando = false;
  erro = '';

  form = this.fb.nonNullable.group({
    livroId: [0, [Validators.required, Validators.min(1)]],
    nomePessoa: ['', [Validators.required]],
    telefone: ['', [Validators.required]],
    dataDevolucaoPrevista: ['', [Validators.required]]
  });

  constructor(
    private readonly router: Router,
    private readonly livroService: LivroService,
    private readonly emprestimoService: EmprestimoService
  ) {}

  ngOnInit(): void {
    this.carregarLivrosDisponiveis();
  }

  carregarLivrosDisponiveis(): void {
    this.carregando = true;
    this.erro = '';

    this.livroService.listar({ status: 'DISPONIVEL' }).subscribe({
      next: (livros) => {
        this.livrosDisponiveis = livros;
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

    this.emprestimoService.emprestar(this.form.getRawValue()).subscribe({
      next: () => this.router.navigateByUrl('/emprestimos'),
      error: (error) => {
        this.erro = getApiErrorMessage(error);
        this.salvando = false;
      }
    });
  }

  get hoje(): string {
    return new Date().toISOString().split('T')[0];
  }

  campoInvalido(campo: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[campo];
    return control.invalid && (control.touched || control.dirty);
  }
}