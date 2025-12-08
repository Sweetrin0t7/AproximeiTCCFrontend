import { api } from "@/api/api";

export interface ClienteMensagemDTO {
  id: number;
  nome: string;
  telefone: string;
  notificacoes: boolean;
}

export async function salvarClienteMensagem(body: {
  nome: string;
  telefone: string;
  notificacoes: boolean;
}): Promise<ClienteMensagemDTO> {
  const response = await api.post("/clientes-mensagem", body);
  return response.data; 
}
