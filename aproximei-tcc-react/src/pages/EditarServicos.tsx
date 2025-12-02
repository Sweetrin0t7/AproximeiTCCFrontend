import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Plus, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useServicos,
  useCreateServico,
  useUpdateServico,
  useDeleteServico,
} from "@/hooks/useServicos";
import { useCategorias, useTiposServico } from "@/hooks/useCategorias";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

const EditarServicos = () => {
  const { user } = useAuth();
  const PRESTADOR_ID = user?.idPrestador ?? 1;

  const navigate = useNavigate();
  const { data: servicos, isLoading, error } = useServicos(PRESTADOR_ID);
  const createServico = useCreateServico(PRESTADOR_ID);
  const updateServico = useUpdateServico(PRESTADOR_ID);
  const deleteServico = useDeleteServico(PRESTADOR_ID);

  const { data: categorias, isLoading: isLoadingCategorias } = useCategorias();

  const [selectedServiceId, setSelectedServiceId] = useState<string>("");
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [selectedCategoriaId, setSelectedCategoriaId] = useState<number | null>(
    null
  );

  const { data: tiposServico, isLoading: isLoadingTipos } =
    useTiposServico(selectedCategoriaId);

  const [formData, setFormData] = useState({
    nome: "",
    sobre: "",
    palavrasChave: "",
    tipoServicoId: null as number | null,
  });

  const palavrasChaveArray = formData.palavrasChave
  .split(",")            
  .map(p => p.trim())
  .filter(p => p.length > 0) 
  .map(p => ({ palavra: p }));


  useEffect(() => {
    if (servicos && servicos.length > 0 && !selectedServiceId) {
      setSelectedServiceId(servicos[0].id.toString());
    }
  }, [servicos, selectedServiceId]);

  useEffect(() => {
    if (servicos && selectedServiceId && !isAddingNew) {
      const servico = servicos.find(
        (s) => s.id.toString() === selectedServiceId
      );
      if (servico) {
        setFormData({
          nome: servico.nome,
          sobre: servico.sobre,
          palavrasChave: Array.isArray(servico.palavrasChave)
            ? servico.palavrasChave.map((p: any) => p.palavra).join(",")
            : servico.palavrasChave ?? "",
          tipoServicoId: null,
        });
        setSelectedCategoriaId(null);
      }
    }
  }, [selectedServiceId, servicos, isAddingNew]);

  const handleAddService = () => {
    setIsAddingNew(true);
    setSelectedServiceId("");
    setSelectedCategoriaId(null);
    setFormData({
      nome: "",
      sobre: "",
      palavrasChave: "",
      tipoServicoId: null,
    });
  };

  const handleCategoriaChange = (value: string) => {
    const categoriaId = parseInt(value);
    setSelectedCategoriaId(categoriaId);
    setFormData((prev) => ({ ...prev, tipoServicoId: null, nome: "" }));
  };

  const handleTipoServicoChange = (value: string) => {
    const tipoId = parseInt(value);
    const tipo = tiposServico?.find((t) => t.id === tipoId);
    setFormData((prev) => ({
      ...prev,
      tipoServicoId: tipoId,
    }));
  };

  const handleSave = async () => {
    if (!formData.nome.trim()) {
      toast.error("Nome do serviço é obrigatório");
      return;
    }

    try {
      if (isAddingNew) {
        await createServico.mutateAsync({
          nome: formData.nome,
          sobre: formData.sobre,
          palavrasChave: palavrasChaveArray,
          prestadorId: PRESTADOR_ID,
          categoriaId: selectedCategoriaId,
          categoriaServicoId: formData.tipoServicoId,
        });

        toast.success("Serviço criado com sucesso!");
        setIsAddingNew(false);
      } else {
        await updateServico.mutateAsync({
          id: parseInt(selectedServiceId),
          data: {
            nome: formData.nome,
            sobre: formData.sobre,
            palavrasChave: palavrasChaveArray,
          },
        });


        toast.success("Serviço atualizado com sucesso!");
      }
    } catch (error: any) {
      const msg = error?.response?.data?.message || "Erro ao salvar serviço";

      toast.error(msg);
    }
  };

  const handleDelete = async () => {
    if (!selectedServiceId) return;

    try {
      await deleteServico.mutateAsync(parseInt(selectedServiceId));
      toast.success("Serviço excluído com sucesso!");
      setSelectedServiceId("");
    } catch {
      toast.error("Erro ao excluir serviço");
    }
  };

  const handleCancel = () => {
    if (isAddingNew) {
      setIsAddingNew(false);
      if (servicos && servicos.length > 0) {
        setSelectedServiceId(servicos[0].id.toString());
      }
    } else {
      navigate(-1);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 max-w-6xl flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-aproximei-blue" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
            Erro ao carregar serviços. Tente novamente mais tarde.
          </div>
        </div>
      </div>
    );
  }

  const hasNoServices = !servicos || servicos.length === 0;

  if (hasNoServices && !isAddingNew) {
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

          <div className="bg-card border border-border rounded-lg p-8 md:p-12 text-center">
            <div className="w-20 h-20 bg-aproximei-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Plus className="h-10 w-10 text-aproximei-blue" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Nenhum serviço cadastrado
            </h1>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Você ainda não possui nenhum serviço cadastrado. Adicione seu
              primeiro serviço para começar a receber clientes!
            </p>
            <Button
              onClick={handleAddService}
              className="bg-aproximei-blue hover:bg-aproximei-blue/90"
              size="lg"
            >
              <Plus className="h-5 w-5 mr-2" />
              Adicionar meu primeiro serviço
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
          {isAddingNew ? "Adicionar novo serviço" : "Editar serviços"}
        </h1>

        <div className="bg-card border border-border rounded-lg p-6 md:p-8">
          {!isAddingNew && servicos && servicos.length > 0 && (
            <>
              <h2 className="text-xl font-semibold text-foreground mb-6">
                Selecione o serviço que deseja editar
              </h2>

              <Tabs
                value={selectedServiceId}
                onValueChange={setSelectedServiceId}
              >
                <TabsList className="w-full flex flex-wrap gap-1 h-auto p-1">
                  {servicos.map((servico) => (
                    <TabsTrigger key={servico.id} value={servico.id.toString()}>
                      {servico.nome}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </>
          )}

          {isAddingNew && (
            <h2 className="text-xl font-semibold text-foreground mb-6">
              Preencha as informações do novo serviço
            </h2>
          )}

          <div className="mt-6 space-y-6">
            {isAddingNew && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="categoria">Categoria</Label>
                    <Select
                      value={selectedCategoriaId?.toString() || ""}
                      onValueChange={handleCategoriaChange}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {isLoadingCategorias ? (
                          <div className="flex items-center justify-center p-4">
                            <Loader2 className="h-4 w-4 animate-spin" />
                          </div>
                        ) : (
                          categorias?.map((categoria) => (
                            <SelectItem
                              key={categoria.id}
                              value={categoria.id.toString()}
                            >
                              {categoria.nome}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="tipoServico">Tipo de Serviço</Label>
                    <Select
                      value={formData.tipoServicoId?.toString() || ""}
                      onValueChange={handleTipoServicoChange}
                      disabled={!selectedCategoriaId}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue
                          placeholder={
                            selectedCategoriaId
                              ? "Selecione o tipo de serviço"
                              : "Selecione uma categoria primeiro"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {isLoadingTipos ? (
                          <div className="flex items-center justify-center p-4">
                            <Loader2 className="h-4 w-4 animate-spin" />
                          </div>
                        ) : (
                          tiposServico?.map((tipo) => (
                            <SelectItem
                              key={tipo.id}
                              value={tipo.id.toString()}
                            >
                              {tipo.nome}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </>
            )}

            <div className="mt-6 space-y-6">
              {isAddingNew && (
                <div>
                  <Label htmlFor="nome">Nome do serviço</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) =>
                      setFormData({ ...formData, nome: e.target.value })
                    }
                    className="mt-2"
                    placeholder="Ex: Cabeleireira, Pedreiro, Eletricista..."
                  />
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="sobre">Sobre o serviço</Label>
              <Textarea
                id="sobre"
                value={formData.sobre}
                maxLength={500} // limite
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sobre: e.target.value.slice(0, 500), 
                  })
                }
                className="mt-2 min-h-32"
                placeholder="Descreva seu serviço, experiência e diferenciais..."
              />
              <p className="text-sm text-muted-foreground mt-1">
                {formData.sobre.length} / 500 caracteres
              </p>
            </div>

            <div>
              <Label htmlFor="palavrasChave">Palavras-chave</Label>             
              <Input
                id="palavrasChave"
                value={formData.palavrasChave}
                onChange={(e) => {
                  setFormData({ ...formData, palavrasChave: e.target.value });
                }}
                className="mt-2"
                placeholder="Separe por vírgulas"
              />
              <p className="text-sm text-muted-foreground mt-1">
                {formData.palavrasChave
                  .split(",")
                  .filter((p) => p.trim().length > 0).length}{" "}
                / 10 palavras (máx. 50 caracteres cada)
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {!isAddingNew && (
                <Button
                  variant="outline"
                  className="flex-1 text-destructive border-destructive hover:bg-destructive/10"
                  onClick={handleDelete}
                  disabled={deleteServico.isPending}
                >
                  {deleteServico.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Excluir"
                  )}
                </Button>
              )}
              <Button
                variant="outline"
                onClick={handleCancel}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                className="flex-1 bg-aproximei-blue hover:bg-aproximei-blue/90"
                onClick={handleSave}
                disabled={
                  createServico.isPending ||
                  updateServico.isPending ||
                  (isAddingNew && !formData.nome)
                }
              >
                {createServico.isPending || updateServico.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Salvar"
                )}
              </Button>
            </div>
          </div>

          {!isAddingNew && (
            <div className="mt-8 pt-8 border-t border-border">
              <Button
                onClick={handleAddService}
                className="w-full sm:w-auto bg-aproximei-blue hover:bg-aproximei-blue/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Serviços
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditarServicos;
