import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, X } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const EditarServicos = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState("cabeleireira");
  const [servicoData, setServicoData] = useState({
    sobre: "Sou pedreiro com experiência e dedicação em cada trabalho que realizo. Prezo pela qualidade, pontualidade e respeito com o cliente. Faço desde pequenos reparos até obras maiores, sempre com responsabilidade e atenção aos detalhes. Meu compromisso é entregar um serviço bem feito, seguro e do jeito que você precisa.",
    palavrasChave: "reboco, muros, cimento, contrapiso.",
  });

  const [photos, setPhotos] = useState([
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400",
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400",
    "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=400",
  ]);

  const handleAddService = () => {
    // Implementar lógica para adicionar novo serviço
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-aproximei-blue hover:text-aproximei-blue/80 mb-6 transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="text-sm font-medium">Voltar</span>
        </button>

        <h1 className="text-3xl font-bold text-foreground mb-8">
          Perfil do prestador
        </h1>

        <div className="bg-card border border-border rounded-lg p-6 md:p-8">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Selecione o serviço que deseja editar
          </h2>

          <Tabs value={selectedService} onValueChange={setSelectedService}>
            <TabsList className="w-full grid grid-cols-3 lg:w-auto">
              <TabsTrigger value="cabeleireira">Cabeleireira</TabsTrigger>
              <TabsTrigger value="manicure">Manicure</TabsTrigger>
              <TabsTrigger value="maquiadora">Maquiadora</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedService} className="mt-6">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="sobre">Sobre o serviço</Label>
                  <Textarea
                    id="sobre"
                    value={servicoData.sobre}
                    onChange={(e) =>
                      setServicoData({ ...servicoData, sobre: e.target.value })
                    }
                    className="mt-2 min-h-32"
                  />
                </div>

                <div>
                  <Label htmlFor="palavrasChave">Palavras-chave</Label>
                  <Input
                    id="palavrasChave"
                    value={servicoData.palavrasChave}
                    onChange={(e) =>
                      setServicoData({ ...servicoData, palavrasChave: e.target.value })
                    }
                    className="mt-2"
                    placeholder="Separe por vírgulas"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Fotos</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-aproximei-blue border-aproximei-blue hover:bg-aproximei-blue/10"
                    >
                      Escolha a imagem
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    {photos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={photo}
                          alt={`Foto ${index + 1}`}
                          className="w-full h-40 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => handleRemovePhoto(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1 text-red-500 border-red-500 hover:bg-red-50"
                  >
                    Excluir
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate(-1)}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button
                    className="flex-1 bg-aproximei-blue hover:bg-aproximei-blue/90"
                    onClick={() => navigate("/prestador/1")}
                  >
                    Salvar
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-8 pt-8 border-t border-border">
            <Button
              onClick={handleAddService}
              className="w-full sm:w-auto bg-aproximei-blue hover:bg-aproximei-blue/90"
            >
              Adicionar Serviços +
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarServicos;
