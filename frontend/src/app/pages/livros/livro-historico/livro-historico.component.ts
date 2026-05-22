import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Emprestimo } from '../../../core/models/emprestimo.model';

import { Livro } from '../../../core/models/livro.model';
import { LivroService } from '../../../core/services/livro.service';
import { getApiErrorMessage } from '../../../core/services/error-message.util';

import { BrDatePipe } from '../../../shared/pipes/br-date.pipe';

import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-livro-historico',
  standalone: true,
  imports: [RouterLink, BrDatePipe, LoadingComponent, EmptyStateComponent],
  templateUrl: './livro-historico.component.html',
  styleUrl: './livro-historico.component.css'
})

export class LivroHistoricoComponent implements OnInit {
  livro: Livro | null = null;
  historico: Emprestimo[] = [];
  carregando = false;
  erro = '';
  

  constructor(
    private readonly route: ActivatedRoute,
    private readonly livroService: LivroService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.carregar(id);
  }

  carregar(id: number): void {
    this.carregando = true;
    this.erro = '';

    this.livroService.buscarPorId(id).subscribe({
      next: (livro) => {
        this.livro = livro;
        this.carregando = false;
      },
      error: (error) => {
        this.erro = getApiErrorMessage(error);
        this.carregando = false;
      }
    });

    
      this.livroService.historico(id).subscribe({
        next: (historico) => {
          this.historico = historico;
          this.carregando = false;
        },
        error: (error) => {
          this.erro = getApiErrorMessage(error);
          this.carregando = false;
        }
      });
    
  }
}