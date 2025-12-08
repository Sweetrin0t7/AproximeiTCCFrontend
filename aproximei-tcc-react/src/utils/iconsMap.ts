// src/utils/iconsMap.ts
import {
  Hammer,
  Scissors,
  Stethoscope,
  BookOpen,
  Cpu,
  Truck,
  Brush,
  Gift,
  Megaphone,
  FileText,
  ShieldCheck,
  Users,
} from "lucide-react";

// Mapear nomes das categorias e serviços para ícones
export const iconsMap: Record<string, any> = {
  // Categorias
  "Financeiro": FileText,
  "Saúde": Stethoscope,
  "Educação": BookOpen,
  "Tecnologia": Cpu,
  "Construção": Hammer,
  "Limpeza": Brush,
  "Transporte": Truck,
  "Beleza": Users,
  "Eventos": Gift,
  "Marketing": Megaphone,
  "Jurídico": ShieldCheck,

  // Serviços - Financeiro
  "Contador": FileText,
  "Consultoria Fiscal": FileText,
  "Corretor Seguro": ShieldCheck,

  // Serviços - Saúde
  "Fisioterapia": Stethoscope,
  "Enfermagem": Stethoscope,
  "Psicólogo": Stethoscope,
  "Nutricionista": Stethoscope,
  "Fisioterapia Domiciliar": Stethoscope,

  // Serviços - Educação
  "Reforço Escolar": BookOpen,
  "Aula de Inglês": BookOpen,
  "Aula de Violão": BookOpen,
  "Aula Enem/Vestibular": BookOpen,

  // Serviços - Tecnologia
  "Suporte Técnico": Cpu,
  "Criação de Sites": Cpu,
  "Programador": Cpu,
  "Instalação Câmera": Cpu,

  // Serviços - Construção
  "Pedreiro": Hammer,
  "Eletricista": Hammer,
  "Encanador": Hammer,
  "Pintor": Brush,
  "Marceneiro": Hammer,
  "Gesseiro": Hammer,

  // Serviços - Limpeza
  "Diarista": Brush,
  "Limpeza Pós-Obra": Brush,
  "Limpeza Estofados": Brush,
  "Passadeira": Brush,

  // Serviços - Transporte
  "Frete": Truck,
  "Frete Rápido": Truck,
  "Mudança": Truck,
  "Motorista Particular": Truck,
  "Guincho": Truck,

  // Serviços - Beleza
  "Cabeleireiro": Scissors,
  "Corte de cabelo feminino": Scissors,
  "Manicure": Brush,
  "Manicure tradicional": Brush,
  "Depilação": Brush,
  "Maquiagem": Brush,
  "Massagem": Users,
  "Sobrancelha": Brush,
  "Extensão de Cílios": Brush,

  // Serviços - Eventos
  "Buffet": Gift,
  "Fotógrafo": Gift,
  "DJ": Gift,
  "Garçom": Users,
  "Decoração": Gift,
  "Animador": Users,

  // Serviços - Marketing
  "Social Media": Megaphone,
  "Gestão de Instagram": Megaphone,
  "Tráfego Pago": Megaphone,
  "Design Gráfico": Megaphone,
  "Vídeo Maker": Megaphone,

  // Serviços - Jurídico
  "Advogado Cível": ShieldCheck,
  "Abertura MEI": ShieldCheck,
  "Registro de Marca": ShieldCheck,
};
