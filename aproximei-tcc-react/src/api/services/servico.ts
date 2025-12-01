import { api } from "@/api/api";

export interface ServicoDTO {
  id: number;
  nome: string;
  sobre: string;
  palavrasChave: string;
  prestadorId: number;
  categoriaId?: number;
  categoriaServicoId?: number;
}

export async function getServicosPrestador(
  prestadorId: number
): Promise<ServicoDTO[]> {
  const response = await api.get(`/prestadores/${prestadorId}/servicos`);
  return response.data;
}

export async function getServico(idServico: number): Promise<ServicoDTO> {
  const response = await api.get(`/servicos/${idServico}`);
  return response.data;
}

export async function createServico(
  prestadorId: number,
  servico: Omit<ServicoDTO, "id">
): Promise<ServicoDTO> {
  const response = await api.post(
    `/prestadores/${prestadorId}/servicos`,
    servico
  );
  return response.data;
}

export async function updateServico(
  idServico: number,
  servico: Partial<ServicoDTO>
): Promise<ServicoDTO> {
  const response = await api.put(`/servicos/${idServico}`, servico);
  return response.data;
}

export async function deleteServico(idServico: number): Promise<void> {
  await api.delete(`/servicos/${idServico}`);
}
