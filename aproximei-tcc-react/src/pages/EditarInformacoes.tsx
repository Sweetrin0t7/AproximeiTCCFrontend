import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { usePrestador, useUpdatePrestador } from "@/hooks/usePrestador";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/components/ui/use-toast";

const EditarInformacoes = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const prestadorId = user?.idPrestador;

  if (!prestadorId) return <p>Carregando...</p>;

  const { data, isLoading } = usePrestador(prestadorId);
  const update = useUpdatePrestador(prestadorId);

  const [formData, setFormData] = useState({
    nome: "",
    dataNascimento: "",
    sexo: "",
    email: "",
    telefone: "",
    sobreMim: "",
    cep: "",
    rua: "",
    numero: "",
    cidade: "",
    estado: "",
    latitude: undefined as number | undefined,
    longitude: undefined as number | undefined,
  });

  useEffect(() => {
    if (data) {
      const dataNascimentoFormatada = data.dataNascimento
        ? new Date(data.dataNascimento).toISOString().split("T")[0]
        : "";
      setFormData({
        nome: data.nomeUsuario,
        dataNascimento: dataNascimentoFormatada,
        sexo: data.sexo,
        email: data.email,
        telefone: data.telefone,
        sobreMim: data.sobreMim,
        cep: data.cep,
        rua: data.rua,
        numero: data.numero,
        cidade: data.cidade,
        estado: data.estado,
        latitude: data.latitude ?? undefined,
        longitude: data.longitude ?? undefined,
      });
    }
  }, [data]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setFormData((old) => ({
          ...old,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        })),
      () => console.log("Usuário não deu permissão")
    );
  }, []);

  const handleSave = () => {
    const limites = {
      nome: 255,
      email: 255,
      telefone: 20,
      sobreMim: 500,
      cep: 10,
      rua: 100,
      numero: 10,
      cidade: 50,
      estado: 2,
    };

    for (const key in limites) {
      const value = (formData as any)[key];
      if (typeof value === "string" && value.length > (limites as any)[key]) {
        toast({
          title: "Limite de caracteres excedido",
          description: `O campo "${key}" não pode exceder ${(limites as any)[key]} caracteres.`,
        });
        return;
      }
    }

    update.mutate(formData, {
      onSuccess: () => navigate(`/prestador/${prestadorId}`),
    });
  };

  if (isLoading) return <p className="p-4">Carregando...</p>;

  const renderCounter = (value: string, limit: number) => (
    <p
      className={`text-sm mt-1 ${
        value.length >= limit * 0.9 ? "text-red-500" : "text-muted-foreground"
      }`}
    >
      {value.length} / {limit}
    </p>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
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
            Informações pessoais
          </h2>

          <div className="space-y-6">
            {/* Nome */}
            <div>
              <Label htmlFor="nome">Nome completo</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) =>
                  setFormData({ ...formData, nome: e.target.value })
                }
                className="mt-2"
                maxLength={100}
              />
              {renderCounter(formData.nome, 255)}
            </div>

            {/* Data nascimento e sexo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Data de nascimento</Label>
                <Input
                  type="date"
                  value={formData.dataNascimento}
                  onChange={(e) =>
                    setFormData({ ...formData, dataNascimento: e.target.value })
                  }
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Sexo</Label>
                <Select
                  value={formData.sexo}
                  onValueChange={(value) =>
                    setFormData({ ...formData, sexo: value })
                  }
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="masculino">Masculino</SelectItem>
                    <SelectItem value="feminino">Feminino</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Email */}
            <div>
              <Label>Email</Label>
              <Input
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="mt-2"
                maxLength={100}
              />
              {renderCounter(formData.email, 255)}
            </div>

            {/* Telefone */}
            <div>
              <Label>Telefone</Label>
              <Input
                value={formData.telefone}
                onChange={(e) =>
                  setFormData({ ...formData, telefone: e.target.value })
                }
                className="mt-2"
                maxLength={20}
              />
              {renderCounter(formData.telefone, 20)}
            </div>

            {/* Sobre mim */}
            <div>
              <Label>Sobre mim</Label>
              <Textarea
                value={formData.sobreMim}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 500) {
                    setFormData({ ...formData, sobreMim: value });
                  }
                }}
                className="mt-2 min-h-32"
              />
              <p className="text-sm text-muted-foreground mt-1">
                {formData.sobreMim.length}
              </p>
              {renderCounter(formData.sobreMim, 500)}
            </div>

            {/* Endereço */}
            <h3 className="text-lg font-semibold pt-4">Endereço</h3>

            <div>
              <Label>CEP</Label>
              <Input
                value={formData.cep}
                onChange={(e) =>
                  setFormData({ ...formData, cep: e.target.value })
                }
                className="mt-2"
                maxLength={10}
              />
              {renderCounter(formData.cep, 10)}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Label>Rua</Label>
                <Input
                  value={formData.rua}
                  onChange={(e) =>
                    setFormData({ ...formData, rua: e.target.value })
                  }
                  className="mt-2"
                  maxLength={100}
                />
                {renderCounter(formData.rua, 100)}
              </div>

              <div>
                <Label>Número</Label>
                <Input
                  value={formData.numero}
                  onChange={(e) =>
                    setFormData({ ...formData, numero: e.target.value })
                  }
                  className="mt-2"
                  maxLength={10}
                />
                {renderCounter(formData.numero, 10)}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Cidade</Label>
                <Input
                  value={formData.cidade}
                  onChange={(e) =>
                    setFormData({ ...formData, cidade: e.target.value })
                  }
                  className="mt-2"
                  maxLength={50}
                />
                {renderCounter(formData.cidade, 50)}
              </div>

              <div>
                <Label>Estado</Label>
                <Input
                  value={formData.estado}
                  onChange={(e) =>
                    setFormData({ ...formData, estado: e.target.value })
                  }
                  className="mt-2"
                  maxLength={2}
                />
                {renderCounter(formData.estado, 2)}
              </div>
            </div>

            {/* Botões */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                variant="outline"
                onClick={() => navigate(-1)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                className="flex-1 bg-aproximei-blue hover:bg-aproximei-blue/90"
                onClick={handleSave}
              >
                Salvar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarInformacoes;
