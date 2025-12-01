import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ServicoDTO,
  getServicosPrestador,
  createServico,
  updateServico,
  deleteServico,
} from "@/api/services/servico";

export function useServicos(prestadorId: number) {
  return useQuery<ServicoDTO[]>({
    queryKey: ["servicos", prestadorId],
    queryFn: () => getServicosPrestador(prestadorId),
    enabled: !!prestadorId,
  });
}

export function useCreateServico(prestadorId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (novoServico: Omit<ServicoDTO, "id">) =>
      createServico(prestadorId, novoServico),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["servicos", prestadorId] }),
  });
}

export function useUpdateServico(prestadorId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<ServicoDTO> }) =>
      updateServico(id, data),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["servicos", prestadorId] }),
  });
}

export function useDeleteServico(prestadorId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (idServico: number) => deleteServico(idServico),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["servicos", prestadorId] }),
  });
}
