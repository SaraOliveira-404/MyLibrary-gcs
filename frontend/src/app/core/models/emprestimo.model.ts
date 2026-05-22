export interface Emprestimo {
  id: number;
  livroId: number;
  livroTitulo: string;
  nomePessoa: string;
  telefone: string;
  dataEmprestimo: string;
  dataDevolucaoPrevista: string;
  dataDevolucaoEfetiva: string | null;
  atrasado: boolean;
  diasAtraso: number;
}

export interface EmprestimoRequest {
  livroId: number;
  nomePessoa: string;
  telefone: string;
  dataDevolucaoPrevista: string;
}
