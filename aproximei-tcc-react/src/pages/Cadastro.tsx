import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/Logo";
import Header from "@/components/Header";
import { useLoginCadastro } from "@/hooks/useLoginCadastro";

const Cadastro = () => {
  const { cadastrar, loading, erro, setErro } = useLoginCadastro();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [telefoneTouched, setTelefoneTouched] = useState(false);
  const [senha, setSenha] = useState("");
  const [senhaTouched, setSenhaTouched] = useState(false);
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      return setErro("As senhas não coincidem!");
    }
    if (!/^\d{10,11}$/.test(telefone)) {
      return setErro("Informe um telefone válido com DDD, somente números! Caso esteja incorreto, os clientes não conseguirão entrar em contato com você pelo WhatsApp.");
    }
    cadastrar(nome, email, telefone, senha);
  };

  const especiais = `!@#$%^&*(),.?":{}|<>`;

  const validarSenha = (senha: string) => {
    const temEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(senha);
    const tamanhoOk = senha.length >= 6;

    return {
      temEspecial,
      tamanhoOk,
      senhaValida: temEspecial && tamanhoOk,
    };
  };

  const validacao = validarSenha(senha);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <div className="w-full max-w-md">
          <div className="md:hidden mb-8 text-center">
            <Logo className="text-5xl" />
          </div>

          <div className="bg-card rounded-lg shadow-lg p-8">
            <div className="hidden md:block text-center mb-6">
              <Logo className="text-4xl" />
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Cadastrar
            </h1>

            <form onSubmit={handleSubmit} className="space-y-5">
              {erro && (
                <p className="text-red-500 text-sm text-center">{erro}</p>
              )}

              <div className="space-y-2">
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  type="text"
                  placeholder="Nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  type="tel"
                  placeholder="Ex: 51999999999"
                  value={telefone}
                  onChange={(e) => {
                    setTelefone(e.target.value);
                    setTelefoneTouched(true);
                  }}
                  required
                />

                {telefoneTouched && (
                  <div className="text-sm mt-1">
                    {!/^\d{10,11}$/.test(telefone) && (
                      <p className="text-red-500">
                        • Informe o telefone junto com o DDD, somente números.
                      </p>
                    )}

                    {!/^\d{10,11}$/.test(telefone) && (
                      <p className="text-gray-400 text-xs mt-1">
                        Exemplo válido: <span className="font-mono">51999999999</span>
                      </p>
                    )}
                  </div>
                )}
              </div>  

              <div className="space-y-2">
                <Label htmlFor="senha">Senha</Label>
                <Input
                  id="senha"
                  type="password"
                  placeholder="Senha"
                  value={senha}
                  onChange={(e) => {
                    setSenha(e.target.value);
                    setSenhaTouched(true);
                  }}
                  required
                />

                {senhaTouched && (
                  <div className="text-sm mt-1">
                    {!validacao.tamanhoOk && (
                      <p className="text-red-500">• A senha deve ter pelo menos 6 caracteres</p>
                    )}

                    {!validacao.temEspecial && (
                      <>
                        <p className="text-red-500">
                          • Falta pelo menos 1 caractere especial
                        </p>
                        <p className="text-gray-400 text-xs mt-1">
                          Caracteres permitidos:{" "}
                          <span className="font-mono break-all">{especiais}</span>
                        </p>
                      </>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmar-senha">Repita a senha</Label>
                <Input
                  id="confirmar-senha"
                  type="password"
                  placeholder="Repita a senha"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={loading}
              >
                {loading ? "Cadastrando..." : "Cadastrar"}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Já tem uma conta?{" "}
                <Link
                  to="/entrar"
                  className="text-aproximei-orange hover:underline"
                >
                  Entrar
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
