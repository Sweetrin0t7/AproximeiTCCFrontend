import { api } from "@/api/api";

export interface LinkAvaliacaoRequestDTO {
  nome: string;
  telefone: string;
  servicoId: number; 
}

export interface LinkAvaliacaoResponseDTO {
  id: number;
  token: string;
  criado_em: string;
}

export interface ServicoDTO {
  id: number;
  nome: string;
}

export interface AvaliacaoClienteDTO {
  prestadorNome: string;
  prestadorAvatar?: string;
  prestadorRating?: number;
  servicos: ServicoDTO[];
}


export async function gerarLinkAvaliacao(
  body: LinkAvaliacaoRequestDTO,
  token: string
): Promise<LinkAvaliacaoResponseDTO> {
  if (!token) throw new Error("Token não encontrado");

  const response = await api.post("/links-avaliacao/gerar", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function validarTokenAvaliacao(token: string): Promise<AvaliacaoClienteDTO> {
  const response = await api.get(`/links-avaliacao/validar/${token}`);
  return response.data;
}

export async function marcarLinkComoUsado(token: string) {
  await api.post(`/links-avaliacao/usar/${token}`);
}

export async function enviarAvaliacao(
  token: string,
  servicoId: string,
  comentario: string,
  nota: number
) {
  await api.post(`/links-avaliacao/avaliar/${token}`, {
    servicoId,
    comentario,
    nota,
  });
}