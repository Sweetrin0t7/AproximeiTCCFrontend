import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Copy, Check } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { ClienteMensagemDTO, salvarClienteMensagem } from "@/api/services/clienteMensagem";
import { useGerarLinkAvaliacao } from "@/hooks/useLinkAvaliacao";
import { useAuth } from "@/context/AuthContext";
import { useServicos } from "@/hooks/useServicos";
import { api } from "@/api/api";
import { toast } from "sonner";

interface FormData {
  nome: string;
  celular: string;
  servicoId: number;
}

const GerarAvaliacao = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: servicos = [] } = useServicos(user?.idPrestador || 0);
  const { mutateAsync: gerarLink } = useGerarLinkAvaliacao();

  const [formData, setFormData] = useState<FormData>({
    nome: "",
    celular: "",
    servicoId: 0,
  });

  const [telefoneTouched, setTelefoneTouched] = useState(false);
  const [telefoneErro, setTelefoneErro] = useState("");
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");

  const handleTelefoneChange = (valor: string) => {
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

    setFormData({ ...formData, celular: formatado });

    if (somenteNumeros.length === 10 || somenteNumeros.length === 11) {
      setTelefoneErro("");
    } else {
      setTelefoneErro("Número inválido. Formato esperado: (00) 00000-0000");
    }
  };

  const telefoneValido = !telefoneErro && formData.celular !== "";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleGenerateLink = async () => {
    if (!telefoneValido || !formData.nome || !formData.servicoId) return;

    try {
      const telefoneNumeros = formData.celular.replace(/\D/g, "");
      
      const response = await api.get(`/clientes-mensagem/por-telefone/${telefoneNumeros}`);
      const cliente: ClienteMensagemDTO = response.data;

      const linkData = await gerarLink({
        nome: formData.nome,
        telefone: telefoneNumeros,
        servicoId: formData.servicoId,
      });



      setGeneratedLink(`${window.location.origin}/avaliar/${linkData.token}`);
      setShowLinkDialog(true);
    } catch (err: any) {
      if (err.response?.status === 404) {
        toast.error(
          "Não foi possível gerar o link. O cliente não foi encontrado. Certifique-se que ele entrou em contato pelo site ou digitou o número corretamente."
        );
      } else {
        toast.error(err.response?.data?.erro || err.message || "Erro ao gerar link de avaliação");
      }
    }
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

        <h1 className="text-3xl font-bold text-foreground mb-8">Perfil do prestador</h1>

        <div className="bg-card border border-border rounded-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold text-center mb-4">Avaliação</h2>
          <p className="text-center text-muted-foreground mb-8">
            Preencha os dados do cliente atendido. Um link será gerado para que ele faça a avaliação do serviço.
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
                onChange={(e) => {
                  handleTelefoneChange(e.target.value);
                  setTelefoneTouched(true);
                }}
                placeholder="(00) 00000-0000"
                className="mt-2"
              />
              {telefoneTouched && telefoneErro && <p className="text-red-500 text-sm mt-1">{telefoneErro}</p>}
            </div>

            <div>
              <Label htmlFor="servico">Serviço prestado</Label>
              <Select
                value={formData.servicoId?.toString() || ""}
                onValueChange={(value) => setFormData({ ...formData, servicoId: Number(value) })}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Selecione o serviço" />
                </SelectTrigger>
                <SelectContent>
                  {servicos.map((s) => (
                    <SelectItem key={s.id} value={s.id.toString()}>
                      {s.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleGenerateLink}
              disabled={!formData.nome || !telefoneValido || !formData.servicoId}
              className="w-full bg-aproximei-blue hover:bg-aproximei-blue/90"
            >
              Criar link de avaliação
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={showLinkDialog} onOpenChange={setShowLinkDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">Link gerado!</DialogTitle>
            <DialogDescription className="text-center pt-2">
              Envie este link pelo WhatsApp para que seu cliente possa avaliá-lo.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <Label className="text-sm font-medium mb-2 block">Link</Label>
              <div className="flex gap-2">
                <Input value={generatedLink} readOnly className="bg-muted" />
                <Button size="icon" variant="outline" onClick={handleCopyLink}>
                  {linkCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <Button onClick={() => setShowLinkDialog(false)} className="w-full bg-aproximei-blue hover:bg-aproximei-blue/90">
              Fechar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GerarAvaliacao;
