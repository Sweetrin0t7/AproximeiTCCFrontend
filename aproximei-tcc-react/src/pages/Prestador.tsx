// src/pages/prestador/Prestador.tsx
import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, Pencil, Camera, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ReviewCard from "@/components/ReviewCard";
import { usePrestador, useUpdateFotoPerfil } from "@/hooks/usePrestador";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { gerarLinkWhats } from "@/utils/whats";
import { useAuth } from "@/context/AuthContext";
import { salvarClienteMensagem } from "@/api/services/clienteMensagem";

const Prestador = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const prestadorId = Number(id);

  const { data: prestador, isLoading } = usePrestador(prestadorId);
  const { upload, remove } = useUpdateFotoPerfil(prestadorId);

  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string>("");

  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [acceptNotifications, setAcceptNotifications] = useState(false);

  const [showMessageModal, setShowMessageModal] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const token = localStorage.getItem("token");
  const decoded = token ? JSON.parse(atob(token.split(".")[1])) : null;
  const prestadorLogadoId = decoded?.idPrestador ?? null;
  const isOwner = prestadorLogadoId === prestadorId;

  const refInfo = useRef<HTMLDivElement>(null);
  const refServicos = useRef<HTMLDivElement>(null);
  const refFotos = useRef<HTMLDivElement>(null);
  const refAvaliacoes = useRef<HTMLDivElement>(null);

  const handleScrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleChooseFile = () => {
    setUploadError(null);
    fileInputRef.current?.click();
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);

    upload.mutate(file, {
      onSuccess: () => {
        setShowPhotoModal(false);
        window.location.reload();
      },
      onError: () => {
        setUploadError(
          "Não foi possível enviar a imagem. O arquivo pode ser muito grande ou houve um erro na conexão."
        );
      },
    });
  };

  const validarTelefone = (valor: string) => {
    const somenteNumeros = valor.replace(/\D/g, "");

    let formatado = "";
    if (somenteNumeros.length <= 2) {
      formatado = `(${somenteNumeros}`;
    } else if (somenteNumeros.length <= 6) {
      formatado = `(${somenteNumeros.slice(0, 2)}) ${somenteNumeros.slice(2)}`;
    } else if (somenteNumeros.length <= 10) {
      formatado = `(${somenteNumeros.slice(0, 2)}) ${somenteNumeros.slice(2, 6)}-${somenteNumeros.slice(6)}`;
    } else {
      formatado = `(${somenteNumeros.slice(0, 2)}) ${somenteNumeros.slice(2, 7)}-${somenteNumeros.slice(7, 11)}`;
    }

    setClientPhone(formatado);

    if (somenteNumeros.length === 10 || somenteNumeros.length === 11) {
      setPhoneError("");
      setIsPhoneValid(true);
    } else {
      setPhoneError("Número inválido. Formato esperado: (00) 00000-0000");
      setIsPhoneValid(false);
    }
  };


  const handleCloseModal = (open: boolean) => {
    setShowPhotoModal(open);
    if (!open) setUploadError(null);
  };

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
  
  let linkWhats = "";

  try {
    linkWhats = gerarLinkWhats(prestador.telefone, prestador.servicos?.[0]?.nome);
  } catch (e) {
    console.error(e);
  }


  if (!selectedService && prestador.servicos?.length > 0) {
    setSelectedService(prestador.servicos[0].id.toString());
  }

  const handleSendMessage = async () => {
    if (!clientName.trim() || !isPhoneValid) return;

    try {
      const telefoneLimpo = clientPhone.replace(/\D/g, "");
      
      await salvarClienteMensagem({
        nome: clientName,
        telefone: telefoneLimpo,
        notificacoes: acceptNotifications,
      });

      window.open(linkWhats, "_blank");

      setShowMessageModal(false);
    } catch (error) {
      console.error(error);
      setPhoneError("Erro ao enviar. Tente novamente.");
    }
  };

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
          {/* MENU LATERAL */}
          <div className="lg:col-span-3">
            <div className="flex flex-col items-center gap-6 relative group">
              {/* FOTO + OVERLAY */}
              <div className="relative">
                <Avatar className="h-40 w-40">
                  <AvatarImage src={prestador.fotoPerfil} />
                  <AvatarFallback className="bg-aproximei-blue text-white text-2xl">
                    {prestador.nomeUsuario?.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                {isOwner && (
                  <div
                    onClick={() => setShowPhotoModal(true)}
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100
                                flex items-center justify-center rounded-full cursor-pointer
                                transition-opacity"
                  >
                    <Camera className="text-white" size={32} />
                  </div>
                )}
              </div>

              {/* HIDDEN FILE INPUT */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileSelected}
              />

              <nav className="w-full space-y-2">
                <button
                  onClick={() => handleScrollTo(refInfo)}
                  className="w-full text-left px-4 py-2 rounded-md hover:bg-muted"
                >
                  Informações pessoais
                </button>
                <button
                  onClick={() => handleScrollTo(refServicos)}
                  className="w-full text-left px-4 py-2 rounded-md hover:bg-muted"
                >
                  Serviços
                </button>
                <button
                  onClick={() => handleScrollTo(refFotos)}
                  className="w-full text-left px-4 py-2 rounded-md hover:bg-muted"
                >
                  Fotos
                </button>
                <button
                  onClick={() => handleScrollTo(refAvaliacoes)}
                  className="w-full text-left px-4 py-2 rounded-md hover:bg-muted"
                >
                  Avaliações
                </button>
              </nav>


              {/* AÇÕES PARA USUÁRIOS QUE NÃO SÃO O DONO */}
              {!isOwner && (
                <div className="w-full mt-6 space-y-4 ">
                  <Dialog open={showMessageModal} onOpenChange={setShowMessageModal}>
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
                          <Input
                            id="name"
                            placeholder="Seu nome completo"
                            value={clientName}
                            onChange={(e) => {
                              setClientName(e.target.value);
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Número de celular</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="(00) 00000-0000"
                            value={clientPhone}
                            onChange={(e) => validarTelefone(e.target.value)}
                          />

                          {phoneError && (
                            <p className="text-red-500 text-xs mt-1">{phoneError}</p>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="notifications"
                            checked={acceptNotifications}
                            onCheckedChange={(v) => setAcceptNotifications(!!v)} 
                          />
                          <label
                            htmlFor="notifications"
                            className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Aceito receber notificações de AproximEI
                          </label>
                        </div>
                        <Button
                          onClick={handleSendMessage}
                          disabled={!clientName.trim() || !isPhoneValid}
                          className="w-full bg-aproximei-blue hover:bg-aproximei-blue/90 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Enviar mensagem
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
              {isOwner && (
                <Button
                  onClick={() => navigate("/prestador/gerar-avaliacao")}
                  variant="outline"
                  className="w-full border-aproximei-blue text-aproximei-blue hover:bg-aproximei-blue/10"
                >
                  Pedir avaliação
                </Button>
              )}
            </div>
          </div>

          {/* MODAL DE FOTO */}
          <Dialog open={showPhotoModal} onOpenChange={handleCloseModal}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Foto de perfil</DialogTitle>
                <DialogDescription>
                  Adicione ou remova sua foto de perfil.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 mt-4">
                <Button
                  className="w-full bg-aproximei-blue hover:bg-aproximei-blue/80"
                  onClick={handleChooseFile}
                >
                  Adicionar / Trocar foto
                </Button>

                {uploadError && (
                  <p className="text-red-500 text-sm text-center">
                    {uploadError}
                  </p>
                )}

                {prestador.fotoPerfil && (
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={() =>
                      remove.mutate(undefined, {
                        onSuccess: () => setShowPhotoModal(false),
                      })
                    }
                  >
                    Remover foto
                  </Button>
                )}

                <DialogClose asChild>
                  <Button variant="outline" className="w-full">
                    Cancelar
                  </Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>

          {/* CONTEÚDO PRINCIPAL */}
          <div className="lg:col-span-6">
            <h1 className="text-3xl font-bold mb-6">Perfil do prestador</h1>

            {/* INFORMAÇÕES */}
            <div ref={refInfo} className="bg-card border rounded-lg p-6 mb-6">
              <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold">Informações pessoais</h2>

                {isOwner && (
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
                  {prestador.rua && prestador.numero
                    ? `${prestador.rua}, ${prestador.numero} - ${prestador.cidade} / ${prestador.cep} `
                    : "Não informado"
                  }
                </p>
                <p>
                  <span className="font-medium">Sobre mim:</span>{" "}
                  {prestador.sobreMim}
                </p>
              </div>
            </div>

            {/* SERVIÇOS */}
            <div
              ref={refServicos}
              className="bg-card border rounded-lg p-6 mb-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">
                  Selecione o serviço que deseja visualizar
                </h2>
                {isOwner && (
                  <button
                    onClick={() => navigate("/prestador/editar-servicos")}
                    className="text-aproximei-blue hover:text-aproximei-blue/80 transition-colors"
                  >
                    <Pencil className="h-5 w-5" />
                  </button>
                )}
              </div>

              {!prestador.servicos || prestador.servicos.length === 0 ? (
                <p className="text-muted-foreground text-center">
                  Nenhum serviço cadastrado.
                </p>
              ) : (
                <Tabs
                  value={selectedService}
                  onValueChange={setSelectedService}
                >
                  <TabsList className="w-full">
                    {prestador.servicos.map((s) => (
                      <TabsTrigger
                        key={s.id}
                        value={s.id.toString()}
                        className="flex-1"
                      >
                        {s.nome}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {prestador.servicos.map((s) => (
                    <TabsContent key={s.id} value={s.id.toString()} className="mt-4 space-y-3">
                      <p className="text-sm text-foreground">
                        <span className="font-medium">Sobre o serviço:</span> {s.descricao}
                      </p>
                      <p className="text-sm text-foreground">
                        <span className="font-medium">Categoria:</span> {s.categoria ?? "Não informado"}
                      </p>
                      <p className="text-sm text-foreground">
                        <span className="font-medium">Tipo de serviço:</span> {s.tipoServico ?? "Não informado"}
                      </p>
                      <p className="text-sm text-foreground">
                        <span className="font-medium">Palavras-chave:</span>{" "}
                        {s.palavrasChave?.map(pc => pc.palavra).join(", ") || "Não informado"}
                      </p>
                    </TabsContent>
                  ))}

                </Tabs>
              )}
            </div>

            {/* FOTOS */}
            <div ref={refFotos} className="bg-card border rounded-lg p-6 mb-6">
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold mb-4">Fotos</h2>
                {isOwner && (
                  <button
                    disabled
                    className="text-gray-400 cursor-not-allowed"
                    title="Indisponível para adição no momento"
                  >
                    <Pencil className="h-5 w-5" />
                  </button>
                )}
              </div>
              <p className="text-muted-foreground text-center">
                Indisponível para adição no momento
              </p>
            </div>

            {/* AVALIAÇÕES */}
            <div ref={refAvaliacoes} className="bg-card border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Avaliações</h2>
              {prestador.avaliacoes.length === 0 ? (
                <p className="text-muted-foreground">
                  Nenhuma avaliação ainda.
                </p>
              ) : (
                prestador.avaliacoes.map((a) => (
                  <ReviewCard
                    key={a.id}
                    name={a.nomeCliente}
                    rating={a.nota}
                    comment={a.comentario}
                    date={new Date(a.data).toLocaleDateString("pt-BR")}
                    category=""
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prestador;
