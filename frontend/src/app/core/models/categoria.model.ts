export interface Categoria {
  id: number;
  nome: string;
  descricao: string;
  quantidadeLivros: number;
}

export interface CategoriaRequest {
  nome: string;
  descricao: string;
}
