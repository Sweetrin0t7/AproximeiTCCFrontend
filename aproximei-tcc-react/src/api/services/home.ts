// src/api/services/home.ts
import { api } from "@/api/api";

const API_BASE_URL = "http://localhost:8080";

export interface ServicoResumoDTO {
    id: number;
    nome: string;
}

export interface CategoriaServicoResumoDTO {
    id: number;
    nome: string;
    servicos: ServicoResumoDTO[];
}

export interface Prestador {
    id: number;
    nomeUsuario: string;
    sobreMim: string;
    mediaNota: number;
    latitude: number | null;
    longitude: number | null;
    distanciaKm: number | null;
    categorias: CategoriaServicoResumoDTO[];
}

export interface BuscarPrestadoresParams {
    palavra?: string;
    servicoId?: number;
    categoriaId?: number;
    avaliacaoMin?: number;
    latitude?: number;
    longitude?: number;
}

export interface BuscaParams {
  palavra?: string;
  servicoId?: number;
  categoriaId?: number;
  avaliacaoMin?: number;
  latitude?: number;
  longitude?: number;
  maxDistance?: number; 
}

export interface CategoriaAcessada {
    id: number;
    nome: string;
    descricao: string;
    totalAcessos: number; 
}

export interface ServicoAcessado {
    id: number;
    nome: string;
    descricao: string;
    totalAcessos: number;
}

export const fetchCategoriasMaisAcessadas = async (): Promise<CategoriaAcessada[]> => {
    const response = await api.get('/home/categorias-mais-acessadas');
    return response.data;
};

export const fetchServicosMaisAcessados = async (): Promise<ServicoAcessado[]> => {
    const response = await api.get('/home/servicos-mais-acessados');
    return response.data;
};

export const buscarPrestadores = async (params: BuscarPrestadoresParams): Promise<Prestador[]> => {
    const { data } = await api.get<Prestador[]>('/busca', { params });
    return data;
};

export async function getPrestadoresMelhoresDaSemana(size: number = 6): Promise<Prestador[]> {
    const { data } = await api.get<Prestador[]>('/home/prestadores/melhores-da-semana', {
        params: { size }
    });
    return data;
}

