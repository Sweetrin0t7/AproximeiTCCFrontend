import { api } from "@/api/api";

export interface CategoriaDTO {
  id: number;
  nome: string;
}

export interface TipoServicoDTO {
  id: number;
  nome: string;
  categoriaId: number;
}

export async function getCategorias(): Promise<CategoriaDTO[]> {
  const response = await api.get("/categorias");
  return response.data;
}

export async function getTiposServicoPorCategoria(
  categoriaId: number
): Promise<TipoServicoDTO[]> {
  const response = await api.get(`/categorias/${categoriaId}/tipos-servico`);
  return response.data;
}
