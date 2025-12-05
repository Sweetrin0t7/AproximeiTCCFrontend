import { useQuery } from "@tanstack/react-query";
import {
  buscarPrestadores,
  getPrestadoresMelhoresDaSemana,
  fetchCategoriasMaisAcessadas, 
  fetchServicosMaisAcessados, 
  Prestador,
  BuscaParams,
  CategoriaAcessada,
  ServicoAcessado, 
} from "@/api/services/home";
import { useEffect, useMemo, useState } from "react";

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
export const useBuscaPrestadores = (params: BuscaParams, enabled: boolean) => {
  return useQuery<Prestador[], Error>({
    queryKey: ["prestadores", params],
    queryFn: () => buscarPrestadores(params),
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
