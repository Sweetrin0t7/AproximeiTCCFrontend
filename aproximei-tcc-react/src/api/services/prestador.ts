// src/api/services/prestador.ts
import { api } from "@/api/api";

export interface FotoDTO {
  id: number;
  imagemBase64: string;
}

export interface AvaliacaoDTO {
  id: number;
  nomeCliente: string;
  nota: number;
  comentario: string;
  data: string;
}

export interface ServicoDTO {
  id: number;
  nome: string;
  descricao: string;
  fotos: FotoDTO[];
}

export interface PrestadorDTO {
  id: number;
  nomeUsuario: string;
  endereco: string;
  sobreMim: string;

  mediaNota: number;
  latitude: number;
  longitude: number;

  fotoPerfilBase64: string;

  distanciaKm: number;
  maxDistance: number;

  servicos: ServicoDTO[];
  fotos: FotoDTO[];
  avaliacoes: AvaliacaoDTO[];
}

export async function getPrestador(id: number): Promise<PrestadorDTO> {
  const response = await api.get(`/prestadores/${id}`);
  return response.data;
}
