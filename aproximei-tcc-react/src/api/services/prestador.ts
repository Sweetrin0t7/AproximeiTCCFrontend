// src/api/services/prestador.ts
import { api } from "@/api/api";

export interface FotoDTO {
  id: number;
  imagemBase64: string;
}

export interface PalavraChaveDTO {
  id?: number;
  palavra: string;
}

export interface AvaliacaoDTO {
  id: number;
  nomeCliente: string;
  nota: number;
  comentario: string;
  data: string;
}

export interface ServicoDTO {
  palavrasChave: PalavraChaveDTO[];
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
  email: string;
  telefone: string;

  dataNascimento: Date;
  sexo: string;

  sobreMim: string;

  cep: string;
  rua: string;
  numero: string;
  cidade: string;
  estado: string;

  latitude: number;
  longitude: number;

  fotoPerfil: string | null;

  mediaNota: number;
  distanciaKm: number;
  maxDistance: number;

  servicos: ServicoDTO[];
  fotos: FotoDTO[];
  avaliacoes: AvaliacaoDTO[];
}


export type PrestadorUpdateDTO = {
  id: number;
  nome: string;
  dataNascimento: string;
  sexo: string;
  email: string;
  telefone: string;
  sobreMim: string;
  cep: string;
  rua: string;
  numero: string;
  cidade: string;
  estado: string;
  latitude?: number;
  longitude?: number;
};

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

export async function updatePrestador(
  id: number,
  body: Partial<PrestadorUpdateDTO>
): Promise<PrestadorUpdateDTO> {
  const { data } = await api.put(`/prestadores/${id}`, body);
  return data;
}
