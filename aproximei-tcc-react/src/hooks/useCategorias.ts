import { useQuery } from "@tanstack/react-query";
import {
  CategoriaDTO,
  TipoServicoDTO,
  getCategorias,
  getTiposServicoPorCategoria,
} from "@/api/services/categoria";

export function useCategorias() {
  return useQuery<CategoriaDTO[]>({
    queryKey: ["categorias"],
    queryFn: getCategorias,
  });
}

export function useTiposServico(categoriaId: number | null) {
  return useQuery<TipoServicoDTO[]>({
    queryKey: ["tiposServico", categoriaId],
    queryFn: () => getTiposServicoPorCategoria(categoriaId!),
    enabled: !!categoriaId,
  });
}
