// src/hooks/usePrestador.ts
import { useQuery } from "@tanstack/react-query";
import { getPrestador, PrestadorDTO } from "@/api/services/prestador";

export function usePrestador(id: number) {
  return useQuery<PrestadorDTO>({
    queryKey: ["prestador", id],
    queryFn: () => getPrestador(id),
    enabled: !!id,
  });
}
