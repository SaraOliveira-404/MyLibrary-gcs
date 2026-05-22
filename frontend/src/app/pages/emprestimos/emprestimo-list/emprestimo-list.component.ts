import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Emprestimo } from '../../../core/models/emprestimo.model';
import { EmprestimoService } from '../../../core/services/emprestimo.service';
import { getApiErrorMessage } from '../../../core/services/error-message.util';
import { BrDatePipe } from '../../../shared/pipes/br-date.pipe';
import { daysRemaining } from '../../../shared/utils/date.util';
import { StatCardComponent } from '../../../shared/components/stat-card/stat-card.component';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-emprestimo-list',
  standalone: true,
  imports: [FormsModule, RouterLink, BrDatePipe, StatCardComponent, LoadingComponent, EmptyStateComponent],
  templateUrl: './emprestimo-list.component.html',
  styleUrl: './emprestimo-list.component.css'
})
export class EmprestimoListComponent implements OnInit {
  ativos: Emprestimo[] = [];
  atrasados: Emprestimo[] = [];
  todos: Emprestimo[] = [];
  termo = '';
  carregando = false;
  erro = '';
  sucesso = '';

  constructor(private readonly emprestimoService: EmprestimoService) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.carregando = true;
    this.erro = '';
    this.sucesso = '';

    forkJoin({
      ativos: this.emprestimoService.listarAtivos(),
      atrasados: this.emprestimoService.listarAtrasados(),
      todos: this.emprestimoService.listarTodos()
    }).subscribe({
      next: ({ ativos, atrasados, todos }) => {
        this.atrasados = atrasados;
        const idsAtrasados = new Set(atrasados.map((item) => item.id));
        this.ativos = ativos.filter((item) => !idsAtrasados.has(item.id));
        this.todos = todos;
        this.carregando = false;
      },
      error: (error) => {
        this.erro = getApiErrorMessage(error);
        this.carregando = false;
      }
    });
  }

  devolver(emprestimo: Emprestimo): void {
    const confirmou = confirm(`Confirmar devolução de "${emprestimo.livroTitulo}"?`);
    if (!confirmou) return;

    this.emprestimoService.devolver(emprestimo.id).subscribe({
      next: () => {
        this.sucesso = 'Livro devolvido com sucesso.';
        this.carregar();
      },
      error: (error) => this.erro = getApiErrorMessage(error)
    });
  }

  diasRestantes(data: string): number {
    return daysRemaining(data);
  }

  get devolvidosMes(): number {
    const hoje = new Date();
    return this.todos.filter((item) => {
      if (!item.dataDevolucaoEfetiva) return false;
      const data = new Date(`${item.dataDevolucaoEfetiva}T00:00:00`);
      return data.getMonth() === hoje.getMonth() && data.getFullYear() === hoje.getFullYear();
    }).length;
  }

  get ativosFiltrados(): Emprestimo[] {
    return this.filtrar(this.ativos);
  }

  get atrasadosFiltrados(): Emprestimo[] {
    return this.filtrar(this.atrasados);
  }

  private filtrar(lista: Emprestimo[]): Emprestimo[] {
    const termo = this.termo.trim().toLowerCase();
    if (!termo) return lista;

    return lista.filter((item) =>
      item.livroTitulo.toLowerCase().includes(termo)
      || item.nomePessoa.toLowerCase().includes(termo)
      || item.telefone.toLowerCase().includes(termo)
    );
  }
}
