// src/api/services/loginCadastro.ts
import { api } from "@/api/api";

export const loginUsuario = async (email: string, senha: string) => {
  const response = await api.post("/login/usuario", {
    email,
    senha,
  });
  return response.data; 
};

export const cadastrarUsuario = async (dados: {
  nomeUsuario: string;
  emailUsuario: string;
  telefone: string;
  senha: string;
}) => {
  const response = await api.post("/login/cadastrar", dados);
  return response.data;
};
