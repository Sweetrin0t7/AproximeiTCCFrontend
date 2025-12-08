import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, Star } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useAvaliacaoCliente, useEnviarAvaliacao } from "@/hooks/useLinkAvaliacao";

const AvaliacaoCliente = () => {
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();
  const [rating, setRating] = useState(5);
  const [formData, setFormData] = useState({ servico: "", comentario: "" });

  const tokenValido = !!token;

  const { data: avaliacaoData, isLoading, isError } = useAvaliacaoCliente(token || "");
  const enviarMutation = useEnviarAvaliacao(token || "");

  const handleSubmit = async () => {
    if (!formData.servico) {
      toast.error("Selecione o serviço avaliado");
      return;
    }

    try {
      await enviarMutation.mutateAsync({
        servicoId: formData.servico,
        comentario: formData.comentario,
        nota: rating,
      });

      toast.success("Avaliação enviada com sucesso!");
      navigate("/");
    } catch {
      toast.error("Erro ao enviar avaliação. Tente novamente.");
    }
  };

  if (!tokenValido || isLoading) {
    return <div className="p-8 text-center">Carregando...</div>;
  }

  if (!avaliacaoData) return null; 

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-aproximei-blue hover:text-aproximei-blue/80 mb-6 transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="text-sm font-medium">Voltar</span>
        </button>

        <div className="bg-card border border-border rounded-lg p-6 md:p-8">
          <div className="flex justify-end mb-6">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                {avaliacaoData.prestadorAvatar ? (
                  <AvatarImage
                    src={avaliacaoData.prestadorAvatar}
                    alt={avaliacaoData.prestadorNome}
                  />
                ) : (
                  <AvatarFallback className="bg-aproximei-blue text-white">
                    {avaliacaoData.prestadorNome
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="text-right">
                <h3 className="font-semibold text-foreground text-sm">
                  {avaliacaoData.prestadorNome}
                </h3>
                {avaliacaoData.prestadorRating && (
                  <div className="flex items-center gap-1 justify-end">
                    <Star className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {avaliacaoData.prestadorRating}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center text-foreground mb-2">
            Avaliação
          </h1>
          <p className="text-center text-muted-foreground mb-8 text-sm">
            Sua opinião é muito importante para nós!
          </p>

          <div className="space-y-6">
            <div>
              <Label
                htmlFor="nomePrestador"
                className="text-muted-foreground text-sm"
              >
                Nome do prestador
              </Label>
              <Input
                id="nomePrestador"
                value={avaliacaoData.prestadorNome}
                readOnly
                className="mt-2 bg-muted/50"
              />
            </div>

            <div>
              <Label htmlFor="servico" className="text-muted-foreground text-sm">
                Avaliação do Serviço:
              </Label>
              <Select
                value={formData.servico}
                onValueChange={(value) =>
                  setFormData({ ...formData, servico: value })
                }
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Selecione o serviço" />
                </SelectTrigger>
                <SelectContent>
                  {avaliacaoData.servicos.map((s) => (
                    <SelectItem key={s.id} value={s.id.toString()}>
                      {s.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="comentario" className="text-muted-foreground text-sm">
                Comentário
              </Label>
              <Textarea
                id="comentario"
                value={formData.comentario}
                onChange={(e) =>
                  setFormData({ ...formData, comentario: e.target.value })
                }
                className="mt-2 min-h-24"
                placeholder="Escreva sua avaliação..."
              />
            </div>

            <div>
              <Label className="mb-3 block text-muted-foreground text-sm">
                Avaliação
              </Label>
              <div className="flex gap-2">
                {[5, 4, 3, 2, 1].map((star) => (
                  <Button
                    key={star}
                    type="button"
                    variant={rating === star ? "default" : "outline"}
                    size="sm"
                    onClick={() => setRating(star)}
                    className={`flex-1 ${
                      rating === star
                        ? "bg-aproximei-blue hover:bg-aproximei-blue/90"
                        : "hover:bg-muted"
                    }`}
                  >
                    {star} <Star className="ml-1 h-3 w-3" />
                  </Button>
                ))}
              </div>
            </div>

            <Button
              className="w-full bg-aproximei-blue hover:bg-aproximei-blue/90 mt-4"
              onClick={handleSubmit}
            >
              Avaliar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvaliacaoCliente;
