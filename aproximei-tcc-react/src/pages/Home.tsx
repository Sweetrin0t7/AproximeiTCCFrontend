// src/pages/Home.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "@/components/Header";
import Logo from "@/components/Logo";
import CategoryIcon from "@/components/CategoryIcon";
import ProviderCard from "@/components/ProviderCard";

import { Button } from "@/components/ui/button";
import SearchHero from "@/components/SearchHero";

import {
  useMelhoresPrestadores,
  useCategoriasMaisAcessadas,
  useServicosMaisAcessados,
} from "@/hooks/useHome";

//TODO ARRUMAR ÍCONE MOCKADO PARA TODAS AS CATEGORIAS / SERVIÇOS
import { Hammer } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  const { data: topProviders, isLoading: loadingProviders } =
    useMelhoresPrestadores();
  const { data: topCategories, isLoading: loadingCategories } =
    useCategoriasMaisAcessadas();
  const { data: topServices, isLoading: loadingServices } =
    useServicosMaisAcessados();

  const handleSearch = () => {
    if (searchText.trim()) {
      navigate(`/servicos?palavra=${encodeURIComponent(searchText.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* HERO */}
      <SearchHero
        searchText={searchText}
        onSearchTextChange={setSearchText}
        onSearch={handleSearch}
      />

      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* CATEGORIAS */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold">
              Categorias mais acessadas
            </h2>
            <Button variant="link" className="text-aproximei-blue">
              Mostrar todos
            </Button>
          </div>

          {loadingCategories && <p>Carregando categorias...</p>}

          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
            {Array.isArray(topCategories) &&
              topCategories.map((cat) => (
                <CategoryIcon
                  key={cat.id}
                  label={cat.nome}
                  Icon={Hammer} // 👈 ÍCONE MOCKADO
                />
              ))}

            {!loadingCategories &&
              (!topCategories || topCategories.length === 0) && (
                <p className="col-span-full text-muted-foreground">
                  Nenhuma categoria encontrada.
                </p>
              )}
          </div>
        </div>

        {/* SERVIÇOS MAIS ACESSADOS */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold">
              Serviços mais acessados
            </h2>
            <Button variant="link" className="text-aproximei-blue">
              Mostrar todos
            </Button>
          </div>

          {loadingServices && <p>Carregando serviços...</p>}

          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
            {Array.isArray(topServices) &&
              topServices.map((service) => (
                <CategoryIcon
                  key={service.id}
                  label={service.nome}
                  Icon={Hammer}
                />
              ))}

            {!loadingServices && (!topServices || topServices.length === 0) && (
              <p className="col-span-full text-muted-foreground">
                Nenhum serviço encontrado.
              </p>
            )}
          </div>
        </div>

        {/* MELHORES PRESTADORES */}
        <div>
          <h2 className="text-xl md:text-2xl font-bold mb-6">
            Prestadores com as melhores avaliações da semana
          </h2>

          {loadingProviders && <p>Carregando prestadores...</p>}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.isArray(topProviders) &&
              topProviders.map((provider) => (
                <ProviderCard
                  id={provider.id}
                  key={provider.id}
                  name={provider.nomeUsuario}
                  image={provider.fotoPerfilBase64}
                  rating={provider.mediaNota}
                  distance={
                    provider.distanciaKm
                      ? `${provider.distanciaKm.toFixed(1)} km de distância`
                      : "Distância indisponível"
                  }
                  categories={(provider.categorias || []).flatMap((c) =>
                    (c.servicos || []).map((s) => s.nome),
                  )}
                  description={provider.sobreMim}
                />
              ))}

            {!loadingProviders &&
              (!topProviders || topProviders.length === 0) && (
                <p className="col-span-full text-muted-foreground">
                  Nenhum prestador encontrado.
                </p>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
