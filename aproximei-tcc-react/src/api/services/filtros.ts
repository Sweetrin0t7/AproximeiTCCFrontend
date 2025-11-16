import { api } from "@/api/api";

export interface Servico {
  id: number;
  nome: string;
}

export interface Categoria {
  id: number;
  nome: string;
}

export const getServicos = async (): Promise<Servico[]> => {
  const { data } = await api.get<Servico[]>("/filtros/servicos");
  return data;
};

export const getCategorias = async (): Promise<Categoria[]> => {
  const { data } = await api.get<Categoria[]>("/filtros/categorias");
  return data;
};
