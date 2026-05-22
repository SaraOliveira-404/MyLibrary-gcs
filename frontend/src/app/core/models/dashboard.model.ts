import { Emprestimo } from './emprestimo.model';

export interface Dashboard {
  totalLivros: number;
  totalDisponiveis: number;
  totalEmprestados: number;
  totalEmprestimosAtivos: number;
  totalAtrasados: number;
  ultimosEmprestimos: Emprestimo[];
}
