import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const AvaliacaoCliente = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(5);
  const [formData, setFormData] = useState({
    nomePrestador: "Diego Brandão",
    servico: "",
    comentario: "",
  });

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
          <h1 className="text-3xl font-bold text-center text-foreground mb-2">
            Avaliação
          </h1>
          <p className="text-center text-muted-foreground mb-8">
            Sua opinião é muito importante para nós!
            <br />
            Avalie o serviço prestado e nos ajude a melhorar cada vez mais.
          </p>

          <div className="flex justify-center mb-8">
            <div className="flex flex-col items-center gap-3">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
                  alt={formData.nomePrestador}
                />
                <AvatarFallback className="bg-aproximei-blue text-white text-2xl">
                  DB
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="font-semibold text-foreground">
                  {formData.nomePrestador}
                </h3>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-4 w-4 fill-aproximei-orange text-aproximei-orange" />
                  <span className="text-sm text-muted-foreground">4.0</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <Label htmlFor="nomePrestador">Nome do prestador</Label>
              <Input
                id="nomePrestador"
                value={formData.nomePrestador}
                readOnly
                className="mt-2 bg-muted"
              />
            </div>

            <div>
              <Label htmlFor="servico">Avaliação do Serviço:</Label>
              <Select value={formData.servico} onValueChange={(value) => setFormData({ ...formData, servico: value })}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Selecione o serviço" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pedreiro">Pedreiro</SelectItem>
                  <SelectItem value="pintor">Pintor</SelectItem>
                  <SelectItem value="eletricista">Eletricista</SelectItem>
                  <SelectItem value="encanador">Encanador</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="comentario">Comentário</Label>
              <Textarea
                id="comentario"
                value={formData.comentario}
                onChange={(e) => setFormData({ ...formData, comentario: e.target.value })}
                className="mt-2 min-h-32"
                placeholder="Adorei o serviço, nota 1000! Super recomendo!"
              />
            </div>

            <div>
              <Label className="mb-3 block">Avaliação</Label>
              <div className="flex gap-2 justify-center">
                {[5, 4, 3, 2, 1].map((star) => (
                  <Button
                    key={star}
                    type="button"
                    variant={rating === star ? "default" : "outline"}
                    size="lg"
                    onClick={() => setRating(star)}
                    className={`min-w-20 ${
                      rating === star
                        ? "bg-aproximei-blue hover:bg-aproximei-blue/90"
                        : ""
                    }`}
                  >
                    {star} <Star className="ml-1 h-4 w-4" />
                  </Button>
                ))}
              </div>
            </div>

            <Button
              className="w-full bg-aproximei-blue hover:bg-aproximei-blue/90"
              disabled={!formData.servico}
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
