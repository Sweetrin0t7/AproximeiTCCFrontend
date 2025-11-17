import { useQuery } from "@tanstack/react-query";
import { getServicos, getCategorias, Servico, Categoria } from "@/api/services/filtros";

export const useServicos = () =>
  useQuery<Servico[], Error>({
    queryKey: ["servicos"],
    queryFn: getServicos,
    staleTime: 1000 * 60 * 10,
  });

export const useCategorias = () =>
  useQuery<Categoria[], Error>({
    queryKey: ["categorias"],
    queryFn: getCategorias,
    staleTime: 1000 * 60 * 10,
  });
