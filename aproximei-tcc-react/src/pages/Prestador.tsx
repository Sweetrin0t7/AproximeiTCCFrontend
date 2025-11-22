// src/pages/prestador/Prestador.tsx
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, MessageCircle, Pencil } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import ReviewCard from "@/components/ReviewCard";
import { usePrestador } from "@/hooks/usePrestador";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";

const Prestador = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const prestadorId = Number(id);

  const { data: prestador, isLoading } = usePrestador(prestadorId);

  const { isAuthenticated } = useAuth();

  const [activeSection, setActiveSection] = useState("informacoes");
  const [selectedService, setSelectedService] = useState("");

  if (isLoading) {
    return <div className="p-8 text-center text-lg">Carregando...</div>;
  }

  if (!prestador) {
    return (
      <div className="p-8 text-center text-lg text-red-500">
        Prestador não encontrado.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-aproximei-blue hover:text-aproximei-blue/80 mb-6 transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="text-sm font-medium">Voltar</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <div className="flex flex-col items-center gap-6">
              <Avatar className="h-40 w-40">
                <AvatarImage src={`${prestador.fotoPerfilBase64}`} />
                <AvatarFallback className="bg-aproximei-blue text-white text-2xl">
                  {prestador.nomeUsuario?.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <nav className="w-full space-y-2">
                {["informacoes", "servicos", "avaliacoes-sidebar", "fotos"].map(
                  (item) => (
                    <button
                      key={item}
                      onClick={() => setActiveSection(item)}
                      className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                        activeSection === item
                          ? "text-aproximei-blue font-medium"
                          : "text-foreground hover:bg-muted"
                      }`}
                    >
                      {item === "informacoes" && "Informações pessoais"}
                      {item === "servicos" && "Serviços"}
                      {item === "avaliacoes-sidebar" && "Avaliações"}
                      {item === "fotos" && "Fotos"}
                    </button>
                  ),
                )}
              </nav>

              {/* Usuário logado → mostrar EDITAR + PEDIR AVALIAÇÃO */}
              {isAuthenticated && (
                  <Button
                    onClick={() => navigate("/prestador/gerar-avaliacao")}
                    variant="outline"
                    className="w-full border-aproximei-blue text-aproximei-blue hover:bg-aproximei-blue/10"
                  >
                    Pedir avaliação
                  </Button>
              )}

              {/* Usuário NÃO logado → mostrar WhatsApp */}
              {!isAuthenticated && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-aproximei-blue hover:bg-aproximei-blue/90">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Enviar mensagem
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-center">
                        Quase lá!
                      </DialogTitle>
                      <DialogDescription className="text-center">
                        Precisamos do seu nome e seu contato para podermos
                        personalizar sua experiência.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome</Label>
                        <Input id="name" placeholder="Seu nome completo" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Número de celular</Label>
                        <Input id="phone" type="tel" placeholder="(00) 00000-0000" />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox id="notifications" />
                        <label
                          htmlFor="notifications"
                          className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Aceito receber notificações de AproximEI
                        </label>
                      </div>

                      <DialogClose asChild>
                        <Button className="w-full bg-aproximei-blue hover:bg-aproximei-blue/90">
                          Enviar mensagem
                        </Button>
                      </DialogClose>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>

          {/* Conteúdo principal */}
          <div className="lg:col-span-6">
            <h1 className="text-3xl font-bold mb-6">Perfil do prestador</h1>

            {/* Informações pessoais */}
            <div className="bg-card border border-border rounded-lg p-6 mb-6">
              <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold">Informações pessoais</h2>

                {isAuthenticated && (
                  <button
                    onClick={() => navigate("/prestador/editar-informacoes")}
                    className="text-aproximei-blue hover:text-aproximei-blue/80"
                  >
                    <Pencil className="h-5 w-5" />
                  </button>
                )}
              </div>

              <div className="space-y-3 text-sm">
                <p>
                  <span className="font-medium">Nome:</span>{" "}
                  {prestador.nomeUsuario}
                </p>
                <p>
                  <span className="font-medium">Endereço:</span>{" "}
                  {prestador.endereco}
                </p>
                <p>
                  <span className="font-medium">Sobre mim:</span>{" "}
                  {prestador.sobreMim}
                </p>
              </div>
            </div>

            {/* Serviços */}
            <div className="bg-card border border-border rounded-lg p-6 mb-6">
              <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold mb-4">Serviços</h2>
                {isAuthenticated && (
                    <button
                      onClick={() => navigate("/prestador/editar-servicos")}
                      className="text-aproximei-blue hover:text-aproximei-blue/80"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                  )}
              </div>
              <Tabs value={selectedService} onValueChange={setSelectedService}>
                <TabsList className="w-full">
                  {prestador.servicos.map((s) => (
                    <TabsTrigger
                      key={s.id}
                      value={String(s.id)}
                      className="flex-1"
                    >
                      {s.nome}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {prestador.servicos.map((s) => (
                  <TabsContent key={s.id} value={String(s.id)} className="mt-4">
                    <p>{s.descricao}</p>
                  </TabsContent>
                ))}
              </Tabs>
            </div>

            {/* Fotos */}
            <div className="bg-card border border-border rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Fotos</h2>

              <div className="grid grid-cols-3 gap-4">
                {prestador.servicos
                  .flatMap((s) => s.fotos)
                  .map((f) => (
                    <img
                      key={f.id}
                      src={`${f.imagemBase64}`}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  ))}
              </div>
            </div>

            {/* Avaliações */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Avaliações</h2>

              {prestador.avaliacoes.length === 0 && (
                <p className="text-muted-foreground">
                  Nenhuma avaliação ainda.
                </p>
              )}

              <div className="space-y-4">
                {prestador.avaliacoes.map((a) => (
                  <ReviewCard
                    key={a.id}
                    name={a.nomeCliente}
                    rating={a.nota}
                    comment={a.comentario}
                    date={new Date(a.data).toLocaleDateString("pt-BR")}
                    category={""}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar direita — filtros (mantive igual por enquanto) */}
          <div className="lg:col-span-3">{/* ... filtros permanecem iguais */}</div>
        </div>
      </div>
    </div>
  );
};

export default Prestador;
