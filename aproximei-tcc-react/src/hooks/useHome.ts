import { useQuery } from "@tanstack/react-query";
import {
  buscarPrestadores,
  getPrestadoresMelhoresDaSemana,
  fetchCategoriasMaisAcessadas, // Importando a função de categorias
  fetchServicosMaisAcessados, // Importando a função de serviços
  Prestador,
  BuscaParams,
  CategoriaAcessada,
  ServicoAcessado, // Importando o tipo de serviço
} from "@/api/services/home";
import { useMemo } from "react";

/**
 * Hook para buscar a lista de prestadores mais bem avaliados para a página Home.
 * O tamanho da lista é definido na função de serviço (default 6).
 */
export function useMelhoresPrestadores() {
  return useQuery({
    queryKey: ["prestadoresMelhoresDaSemana"],
    queryFn: () => getPrestadoresMelhoresDaSemana(),
    staleTime: 1000 * 60 * 10,
  });
}

/**
 * Hook para realizar a busca de prestadores com base em diversos parâmetros.
 */
export const useBuscaPrestadores = (params: BuscaParams) => {
  // Só habilita a query se houver pelo menos um parâmetro relevante
  const enabled =
    !!params.palavra ||
    !!params.servicoId ||
    !!params.categoriaId ||
    !!params.avaliacaoMin ||
    (!!params.latitude && !!params.longitude);

  // Memoriza os parâmetros para criar um queryKey estável
  const stableParams = useMemo(
    () => ({
      palavra: params.palavra,
      servicoId: params.servicoId,
      categoriaId: params.categoriaId,
      avaliacaoMin: params.avaliacaoMin,
      latitude: params.latitude,
      longitude: params.longitude,
    }),
    [
      params.palavra,
      params.servicoId,
      params.categoriaId,
      params.avaliacaoMin,
      params.latitude,
      params.longitude,
    ]
  );

  return useQuery<Prestador[], Error>({
    queryKey: ["prestadores", stableParams],
    queryFn: () => buscarPrestadores(stableParams),
    enabled,
    staleTime: 1000 * 60 * 10, 
  });
};

/**
 * Hook para buscar a lista de categorias mais acessadas para a página Home.
 */
export const useCategoriasMaisAcessadas = () => {
  return useQuery<CategoriaAcessada[], Error>({
    queryKey: ["topCategories"],
    queryFn: fetchCategoriasMaisAcessadas,
    staleTime: 1000 * 60 * 10,
  });
};

/**
 * Hook para buscar a lista de serviços mais acessados para a página Home.
 */
export const useServicosMaisAcessados = () => {
  return useQuery<ServicoAcessado[], Error>({
    queryKey: ["topServices"],
    queryFn: fetchServicosMaisAcessados,
    staleTime: 1000 * 60 * 10,
  });
};
