import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CategoriaService } from '../../../core/services/categoria.service';
import { getApiErrorMessage } from '../../../core/services/error-message.util';

@Component({
  selector: 'app-categoria-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './categoria-form.component.html',
  styleUrl: './categoria-form.component.css'
})
export class CategoriaFormComponent {
  salvando = false;
  erro = '';

  form;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly categoriaService: CategoriaService
  ) {
    this.form = this.fb.nonNullable.group({
      nome: ['', [Validators.required, Validators.maxLength(100)]],
      descricao: ['', [Validators.required]]
    });
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.salvando = true;
    this.erro = '';

    this.categoriaService.criar(this.form.getRawValue()).subscribe({
      next: () => this.router.navigateByUrl('/categorias'),
      error: (error) => {
        this.erro = getApiErrorMessage(error);
        this.salvando = false;
      }
    });
  }

  campoInvalido(campo: 'nome' | 'descricao'): boolean {
    const control = this.form.controls[campo];
    return control.invalid && (control.touched || control.dirty);
  }
}