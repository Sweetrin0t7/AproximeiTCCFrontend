import { loginUsuario, cadastrarUsuario } from "@/api/services/loginCadastro";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  idUsuario: number;
  idPrestador: number | null;
  nome: string;
  fotoPerfilBase64: string | null;
}

export const useLoginCadastro = () => {
  const navigate = useNavigate();
  const { login: storeToken, loginStoreUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const login = async (email: string, senha: string) => {
    try {
      setLoading(true);
      setErro(null);

      const token = await loginUsuario(email, senha);

      storeToken(token);

      const decoded: TokenPayload = jwtDecode(token);

      const userObj = {
        idUsuario: decoded.idUsuario,
        idPrestador: decoded.idPrestador,
        nome: decoded.nome,
        fotoPerfilBase64: decoded.fotoPerfilBase64,
      };

      loginStoreUser(userObj);

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
      setErro(err.response?.data?.message || "Erro no cadastro");
    } finally {
      setLoading(false);
    }
  };

  return { login, cadastrar, loading, erro, setErro };
};
