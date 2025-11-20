import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/Logo";
import Header from "@/components/Header";
import { useLoginCadastro } from "@/hooks/useLoginCadastro";

const Login = () => {
  const { login, loading, erro } = useLoginCadastro();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, senha);
  };

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
              Entrar
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {erro && (
                <p className="text-red-500 text-sm text-center">{erro}</p>
              )}

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
                <Label htmlFor="senha">Senha</Label>
                <Input
                  id="senha"
                  type="password"
                  placeholder="Senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={loading}
              >
                {loading ? "Entrando..." : "Entrar"}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Esqueceu sua senha?{" "}
                <Link to="#" className="text-aproximei-orange hover:underline">
                  Recuperar
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
