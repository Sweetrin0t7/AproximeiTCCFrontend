import { api } from "@/api/api";

export interface PalavraChaveDTO {
  id?: number;
  palavra: string;
}

export interface ServicoDTO {
  id: number;
  nome: string;
  sobre: string;
  palavrasChave: PalavraChaveDTO[];
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
  servico: Omit<ServicoDTO, "id">,
  token: string
): Promise<ServicoDTO> {
  const payload = {
    ...servico,
    palavrasChave: servico.palavrasChave.map((p: any) =>
      typeof p === "string" ? { palavra: p.trim() } : p
    ),
  };

  const response = await api.post(
    `/prestadores/${prestadorId}/servicos`,
    payload,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
}

export async function updateServico(
  idServico: number,
  servico: Partial<ServicoDTO>,
  token: string
): Promise<ServicoDTO> {
  const payload = {
    ...servico,
    palavrasChave: servico.palavrasChave?.map((p: any) =>
      typeof p === "string" ? { palavra: p.trim() } : p
    ),
  };

  const response = await api.put(
    `/servicos/${idServico}`,
    payload,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
}

export async function deleteServico(idServico: number, token: string): Promise<void> {
  await api.delete(`/servicos/${idServico}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
