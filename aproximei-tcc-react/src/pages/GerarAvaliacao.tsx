import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Copy, Check } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const GerarAvaliacao = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    celular: "",
    servico: "",
  });
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const generatedLink = `${window.location.origin}/avaliar/prestador-123`;

  const handleGenerateLink = () => {
    if (formData.nome && formData.celular && formData.servico) {
      setShowLinkDialog(true);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

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

        <h1 className="text-3xl font-bold text-foreground mb-8">
          Perfil do prestador
        </h1>

        <div className="bg-card border border-border rounded-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold text-center text-foreground mb-4">
            Avaliação
          </h2>
          <p className="text-center text-muted-foreground mb-8">
            Solicitamos o nome e o telefone do cliente atendido para que possamos
            gerar o link de avaliação referente ao atendimento realizado.
          </p>

          <div className="space-y-6">
            <div>
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                className="mt-2"
                placeholder="Nome do cliente"
              />
            </div>

            <div>
              <Label htmlFor="celular">Número de celular</Label>
              <Input
                id="celular"
                value={formData.celular}
                onChange={(e) => setFormData({ ...formData, celular: e.target.value })}
                className="mt-2"
                placeholder="(00) 00000-0000"
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

            <Button
              onClick={handleGenerateLink}
              className="w-full bg-aproximei-blue hover:bg-aproximei-blue/90"
              disabled={!formData.nome || !formData.celular || !formData.servico}
            >
              Criar link de avaliação
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={showLinkDialog} onOpenChange={setShowLinkDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Link gerado!
            </DialogTitle>
            <DialogDescription className="text-center pt-2">
              Envie este link pelo WhatsApp para que seu cliente possa avaliá-lo.
              Lembrando que, para direito à avaliação, o cliente precisa ter feito
              um pré-cadastro ao clicar em "Enviar mensagem" no site.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label className="text-sm font-medium mb-2 block">Link</Label>
              <div className="flex gap-2">
                <Input
                  value={generatedLink}
                  readOnly
                  className="bg-muted"
                />
                <Button
                  size="icon"
                  variant="outline"
                  onClick={handleCopyLink}
                  className="shrink-0"
                >
                  {linkCopied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <Button
              onClick={() => setShowLinkDialog(false)}
              className="w-full bg-aproximei-blue hover:bg-aproximei-blue/90"
            >
              Fechar
            </Button>
            <Button
              onClick={handleGenerateLink}
              variant="outline"
              className="w-full"
            >
              Criar link de avaliação
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GerarAvaliacao;
