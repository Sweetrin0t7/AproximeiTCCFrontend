import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Servicos from "./pages/Servicos";
import NotFound from "./pages/NotFound";
import Prestador from "./pages/Prestador";
import EditarInformacoes from "./pages/EditarInformacoes";
import EditarServicos from "./pages/EditarServicos";
import GerarAvaliacao from "./pages/GerarAvaliacao";
import AvaliacaoCliente from "./pages/AvaliacaoCliente";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/entrar" element={<Login />} />
          <Route path="/cadastrar" element={<Cadastro />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/prestador/:id" element={<Prestador />} />
          <Route path="/prestador/editar-informacoes" element={<EditarInformacoes />} />
          <Route path="/prestador/editar-servicos" element={<EditarServicos />} />
          <Route path="/prestador/gerar-avaliacao" element={<GerarAvaliacao />} />
          <Route path="/avaliar/:id" element={<AvaliacaoCliente />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
