// src/hooks/usePrestador.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getPrestador,
  updateFotoPerfil,
  deleteFotoPerfil,
  PrestadorDTO,
  updatePrestador,
  PrestadorUpdateDTO,
} from "@/api/services/prestador";

export function usePrestador(id: number) {
  return useQuery<PrestadorDTO>({
    queryKey: ["prestador", id],
    queryFn: () => getPrestador(id),
    enabled: !!id && id > 0,
  });
}

export function useUpdateFotoPerfil(idPrestador: number) {
  const qc = useQueryClient();

  const upload = useMutation({
    mutationFn: (file: File) => updateFotoPerfil(idPrestador, file),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["prestador", idPrestador] });
    },
    onError: (error: any) => {
      if (error?.response?.status === 413) {
        throw new Error(
          "A imagem é muito grande. Tamanho máximo permitido é 2MB."
        );
      }
      throw new Error("Erro ao enviar a imagem.");
    },
  });

  const remove = useMutation({
    mutationFn: () => deleteFotoPerfil(idPrestador),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["prestador", idPrestador] });
    },
  });

  return { upload, remove };
}

export function useUpdatePrestador(id: number) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (body: Partial<PrestadorUpdateDTO>) =>
      updatePrestador(id, body),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["prestador", id] });
    },
  });
}
