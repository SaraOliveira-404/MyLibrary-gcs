import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Dashboard } from '../../core/models/dashboard.model';
import { DashboardService } from '../../core/services/dashboard.service';
import { getApiErrorMessage } from '../../core/services/error-message.util';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { BrDatePipe } from '../../shared/pipes/br-date.pipe';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, StatCardComponent, LoadingComponent, EmptyStateComponent, BrDatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  dados: Dashboard | null = null;
  carregando = false;
  erro = '';

  constructor(private readonly dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    this.carregando = true;
    this.erro = '';

    this.dashboardService.buscarDados().subscribe({
      next: (dados) => {
        this.dados = dados;
        this.carregando = false;
      },
      error: (error) => {
        this.erro = getApiErrorMessage(error);
        this.carregando = false;
      }
    });
  }

  get percentualDisponiveis(): number {
    if (!this.dados?.totalLivros) return 0;
    return Math.round((this.dados.totalDisponiveis / this.dados.totalLivros) * 100);
  }

  get percentualEmprestados(): number {
    if (!this.dados?.totalLivros) return 0;
    return Math.round((this.dados.totalEmprestados / this.dados.totalLivros) * 100);
  }

  get percentualAtrasados(): number {
    if (!this.dados?.totalLivros) return 0;
    return Math.round((this.dados.totalAtrasados / this.dados.totalLivros) * 100);
  }

  get donutStyle(): string {
    const disponiveis = this.percentualDisponiveis;
    const emprestados = disponiveis + this.percentualEmprestados;

    return `conic-gradient(var(--green) 0 ${disponiveis}%, var(--orange) ${disponiveis}% ${emprestados}%, var(--red) ${emprestados}% 100%)`;
  }
}
