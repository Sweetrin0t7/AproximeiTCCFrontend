import { useMutation, useQuery } from "@tanstack/react-query";
import { LinkAvaliacaoRequestDTO, gerarLinkAvaliacao, LinkAvaliacaoResponseDTO, validarTokenAvaliacao, enviarAvaliacao, AvaliacaoClienteDTO } from "@/api/services/linkAvaliacao";
import { useAuth } from "@/context/AuthContext";

export function useGerarLinkAvaliacao() {
  const { token } = useAuth();

  return useMutation<LinkAvaliacaoResponseDTO, Error, LinkAvaliacaoRequestDTO>({
    mutationFn: (body: LinkAvaliacaoRequestDTO) => {
      if (!token) throw new Error("Token não encontrado");
      return gerarLinkAvaliacao(body, token);
    },
  });
}

export function useAvaliacaoCliente(token: string) {
  return useQuery<AvaliacaoClienteDTO, Error>({
    queryKey: ["avaliacaoCliente", token],
    queryFn: () => validarTokenAvaliacao(token),
    enabled: !!token, 
  });
}

export function useEnviarAvaliacao(token: string) {
  return useMutation({
    mutationFn: ({ servicoId, comentario, nota }: { servicoId: string; comentario: string; nota: number }) => 
      enviarAvaliacao(token, servicoId, comentario, nota)
  });
}