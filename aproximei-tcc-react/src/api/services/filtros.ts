import axios from "axios";

export interface Servico {
  id: number;
  nome: string;
}

export interface Categoria {
  id: number;
  nome: string;
}

export const getServicos = async (): Promise<Servico[]> => {
  const { data } = await axios.get<Servico[]>("http://localhost:8080/filtros/servicos");
  return data;
};

export const getCategorias = async (): Promise<Categoria[]> => {
  const { data } = await axios.get<Categoria[]>("http://localhost:8080/filtros/categorias");
  return data;
};
