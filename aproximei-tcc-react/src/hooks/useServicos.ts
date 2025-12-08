import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ServicoDTO,
  getServicosPrestador,
  createServico,
  updateServico,
  deleteServico,
} from "@/api/services/servico";
import { useAuth } from "@/context/AuthContext";

export function useServicos(prestadorId: number) {
  return useQuery<ServicoDTO[]>({
    queryKey: ["servicos", prestadorId],
    queryFn: () => getServicosPrestador(prestadorId),
    enabled: !!prestadorId,
  });
}

export function useCreateServico(prestadorId: number) {
  const { token } = useAuth();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (novoServico: Omit<ServicoDTO, "id">) =>
      createServico(prestadorId, novoServico, token!),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["servicos", prestadorId] });
      qc.invalidateQueries({ queryKey: ["prestador", prestadorId] });
    },
  });
}

export function useUpdateServico(prestadorId: number) {
  const { token } = useAuth();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<ServicoDTO> }) =>
      updateServico(id, data, token!),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["servicos", prestadorId] });
      qc.invalidateQueries({ queryKey: ["prestador", prestadorId] });
    },
  });
}

export function useDeleteServico(prestadorId: number) {
  const { token } = useAuth();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (idServico: number) => deleteServico(idServico, token!),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["servicos", prestadorId] });
      qc.invalidateQueries({ queryKey: ["prestador", prestadorId] });
    },
  });
}
