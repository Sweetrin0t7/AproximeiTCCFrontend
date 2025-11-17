import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, MessageCircle, Pencil } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ReviewCard from "@/components/ReviewCard";

const Prestador = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("informacoes");
  const [selectedService, setSelectedService] = useState("cabeleireira");

  // Mock data
  const reviews = [
    {
      name: "Fernanda Silva",
      rating: 5,
      category: "Cabeleireiro",
      date: "11 de novembro de 2024",
      comment: "Ótimo atendimento e serviço!",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      name: "Fernanda Silva",
      rating: 5,
      category: "Cabeleireiro",
      date: "11 de novembro de 2024",
      comment: "Ótimo atendimento e serviço!",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      name: "Fernanda Silva",
      rating: 5,
      category: "Cabeleireiro",
      date: "11 de novembro de 2024",
      comment: "Ótimo atendimento e serviço!",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      name: "Fernanda Silva",
      rating: 5,
      category: "Cabeleireiro",
      date: "11 de novembro de 2024",
      comment: "Ótimo atendimento e serviço!",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
  ];

  const photos = [
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400",
    "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400",
    "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=400",
  ];

  const sidebarItems = [
    { id: "informacoes", label: "Informações pessoais" },
    { id: "servicos", label: "Serviços" },
    { id: "avaliacoes-sidebar", label: "Avaliações" },
    { id: "fotos", label: "Fotos" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-aproximei-blue hover:text-aproximei-blue/80 mb-6 transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="text-sm font-medium">Voltar</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-3">
            <div className="flex flex-col items-center gap-6">
              <Avatar className="h-40 w-40">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400"
                  alt="Carolina Braga de Almeida"
                />
                <AvatarFallback className="bg-aproximei-blue text-white text-2xl">
                  CA
                </AvatarFallback>
              </Avatar>

              <nav className="w-full space-y-2">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                      activeSection === item.id
                        ? "text-aproximei-blue font-medium"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              <Button
                onClick={() => navigate("/prestador/gerar-avaliacao")}
                variant="outline"
                className="w-full border-aproximei-blue text-aproximei-blue hover:bg-aproximei-blue/10"
              >
                Pedir avaliação
              </Button>

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
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(00) 00000-0000"
                      />
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
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-6">
            <h1 className="text-3xl font-bold text-foreground mb-6">
              Perfil do prestador
            </h1>

            {/* Personal Information */}
            <div className="bg-card border border-border rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">
                  Informações pessoais
                </h2>
                <button
                  onClick={() => navigate("/prestador/editar-informacoes")}
                  className="text-aproximei-blue hover:text-aproximei-blue/80 transition-colors"
                >
                  <Pencil className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-3 text-sm">
                <p>
                  <span className="font-medium">Nome:</span> Carolina Braga de
                  Almeida
                </p>
                <p>
                  <span className="font-medium">Endereço:</span> Rua das Flores,
                  Centro - Charqueadas/RS
                </p>
                <p>
                  <span className="font-medium">Sobre mim:</span> Sou a Carolina,
                  uma babá carinhosa, apaixonada por crianças e comprometida com a
                  segurança e o bem-estar dos pequenos. Com anos de experiência em
                  cuidados infantis e atividades educativas, ofereço um ambiente
                  seguro e divertido para o seu filho. Disponível para cuidados
                  diurnos e noturnos.
                </p>
              </div>
            </div>

            {/* Services Section */}
            <div className="bg-card border border-border rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">
                  Selecione o serviço que deseja visualizar
                </h2>
                <button
                  onClick={() => navigate("/prestador/editar-servicos")}
                  className="text-aproximei-blue hover:text-aproximei-blue/80 transition-colors"
                >
                  <Pencil className="h-5 w-5" />
                </button>
              </div>
              
              <Tabs value={selectedService} onValueChange={setSelectedService}>
                <TabsList className="w-full">
                  <TabsTrigger value="cabeleireira" className="flex-1">
                    Cabeleireira
                  </TabsTrigger>
                  <TabsTrigger value="manicure" className="flex-1">
                    Manicure
                  </TabsTrigger>
                  <TabsTrigger value="maquiadora" className="flex-1">
                    Maquiadora
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="cabeleireira" className="mt-4">
                  <p className="text-sm text-foreground">
                    <span className="font-medium">Sobre o serviço:</span> Sou
                    cabeleireira especializada apenas em cortes. Atendo diversos
                    estilos, sempre com atenção ao que valoriza o seu tipo de
                    cabelo e rosto. Meu foco é oferecer um corte bem feito, com
                    cuidado e praticidade para o seu dia a dia.
                  </p>
                </TabsContent>
                <TabsContent value="manicure" className="mt-4">
                  <p className="text-sm text-foreground">
                    Serviços de manicure profissional com esmaltação tradicional e
                    em gel.
                  </p>
                </TabsContent>
                <TabsContent value="maquiadora" className="mt-4">
                  <p className="text-sm text-foreground">
                    Maquiagem para todos os tipos de eventos e ocasiões.
                  </p>
                </TabsContent>
              </Tabs>
            </div>

            {/* Photos Section */}
            <div className="bg-card border border-border rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Fotos
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`Trabalho ${index + 1}`}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Avaliações
              </h2>
              <div className="space-y-4">
                {reviews.slice(0, 1).map((review, index) => (
                  <ReviewCard key={index} {...review} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Reviews Filter */}
          <div className="lg:col-span-3">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">
                  Filtro
                </h3>
                <Button
                  variant="default"
                  size="sm"
                  className="bg-aproximei-blue hover:bg-aproximei-blue/90"
                >
                  Filtrar
                </Button>
              </div>

              <div className="space-y-6">
                {/* Service Filter */}
                <div>
                  <Label className="text-sm font-medium mb-2">Serviço</Label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="cabeleireira">Cabeleireira</SelectItem>
                      <SelectItem value="manicure">Manicure</SelectItem>
                      <SelectItem value="maquiadora">Maquiadora</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Category Filter */}
                <div>
                  <Label className="text-sm font-medium mb-2">Categoria</Label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="manutencao">
                        Manutenção e Reparos
                      </SelectItem>
                      <SelectItem value="beleza">Beleza e Bem-estar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Rating Filter */}
                <div>
                  <Label className="text-sm font-medium mb-2">Avaliação</Label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <Button
                        key={rating}
                        variant="outline"
                        size="sm"
                        className="px-3"
                      >
                        {rating}★
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Sort Order */}
                <div>
                  <Label className="text-sm font-medium mb-2">
                    Ordenar por
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">
                      Todos
                    </Button>
                    <Button variant="outline" size="sm">
                      A-Z
                    </Button>
                    <Button variant="outline" size="sm">
                      Z-A
                    </Button>
                    <Button variant="outline" size="sm">
                      Recente
                    </Button>
                  </div>
                </div>
              </div>

              {/* Reviews List */}
              <div className="mt-6 space-y-4">
                {reviews.map((review, index) => (
                  <ReviewCard key={index} {...review} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prestador;
