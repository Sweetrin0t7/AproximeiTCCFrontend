import { loginUsuario, cadastrarUsuario } from "@/api/services/loginCadastro";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLoginCadastro = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const login = async (email: string, senha: string) => {
    try {
      setLoading(true);
      setErro(null);

      const token = await loginUsuario(email, senha);

      localStorage.setItem("token", token);

      navigate("/");
    } catch (err: any) {
      setErro(err.response?.data || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  const cadastrar = async (
    nome: string,
    email: string,
    telefone: string,
    senha: string
  ) => {
    try {
      setLoading(true);
      setErro(null);

      await cadastrarUsuario({
        nomeUsuario: nome,
        emailUsuario: email,
        telefone,
        senha,
      });

      navigate("/entrar");
    } catch (err: any) {
      setErro(
        err.response?.data?.mensagem ||
        err.response?.data ||
        "Erro no cadastro"
      );
    } finally {
      setLoading(false);
    }
  };

  return { login, cadastrar, loading, erro };
};
