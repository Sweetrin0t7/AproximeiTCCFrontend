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
  categoria: string;
  tipoServico: string;
  //fotos: FotoDTO[];
}

export interface PrestadorDTO {
  id: number;
  nomeUsuario: string;
  endereco: string;
  sobreMim: string;

  mediaNota: number;
  latitude: number;
  longitude: number;

  fotoPerfil: string | null;

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

export async function updateFotoPerfil(
  idPrestador: number,
  file: File
): Promise<void> {
  const formData = new FormData();
  formData.append("foto", file);

  await api.put(`/prestadores/${idPrestador}/foto-perfil`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export async function deleteFotoPerfil(idPrestador: number): Promise<void> {
  await api.delete(`/prestadores/${idPrestador}/foto-perfil`);
}
