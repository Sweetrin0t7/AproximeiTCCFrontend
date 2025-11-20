// Componente Servicos.tsx refatorado

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import ProviderCard from "@/components/ProviderCard";
// IMPORTAÇÃO DO NOVO COMPONENTE
import SearchHero from "@/components/SearchHero";
import { useServicos, useCategorias } from "@/hooks/useFiltros";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
// ... outras importações
import FiltroSelect from "@/components/Filtro";
import { useBuscaPrestadores } from "@/hooks/useHome";

const Servicos = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const palavraParam = searchParams.get("palavra") || "";
  const servicoParam = searchParams.get("servicoId");
  const categoriaParam = searchParams.get("categoriaId");
  const avaliacaoParam = searchParams.get("avaliacaoMin");

  // ... (restante dos estados e hooks, não alterados)
  const [filtros, setFiltros] = useState({
    searchText: palavraParam,
    servicoId: servicoParam ? Number(servicoParam) : undefined,
    categoriaId: categoriaParam ? Number(categoriaParam) : undefined,
    avaliacaoMin: avaliacaoParam ? Number(avaliacaoParam) : undefined,
  });

  const [maxDistance, setMaxDistance] = useState<number>(0);

  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  // ... (useEffect para geolocalização e hooks de dados permanecem iguais)
  useEffect(() => {
    // ... lógica de geolocalização
  }, []);

  const { data: servicos } = useServicos();
  const { data: categorias } = useCategorias();
  const avaliacaoOptions = [5, 4, 3];

  const {
    data: prestadores,
    isLoading,
    error,
  } = useBuscaPrestadores({
    palavra: filtros.searchText || undefined,
    servicoId: filtros.servicoId,
    categoriaId: filtros.categoriaId,
    avaliacaoMin: filtros.avaliacaoMin,
    latitude: location?.latitude,
    longitude: location?.longitude,
    maxDistance: maxDistance > 0 ? maxDistance : undefined,
  });

  const handleSearch = () => {
    // Atualiza os search params com os filtros atuais
    setSearchParams({
      ...(filtros.searchText.trim() && { palavra: filtros.searchText.trim() }),
      ...(filtros.servicoId && { servicoId: String(filtros.servicoId) }),
      ...(filtros.categoriaId && { categoriaId: String(filtros.categoriaId) }),
      ...(filtros.avaliacaoMin && {
        avaliacaoMin: String(filtros.avaliacaoMin),
      }),
    });
  };

  // Função auxiliar para atualizar o texto de busca no estado
  const handleSearchTextChange = (text: string) => {
    setFiltros({ ...filtros, searchText: text });
  };

  // ... (useEffect para sincronizar a URL e handleFilterChange permanecem iguais)
  useEffect(() => {
    setFiltros({
      searchText: palavraParam,
      servicoId: servicoParam ? Number(servicoParam) : undefined,
      categoriaId: categoriaParam ? Number(categoriaParam) : undefined,
      avaliacaoMin: avaliacaoParam ? Number(avaliacaoParam) : undefined,
    });
  }, [palavraParam, servicoParam, categoriaParam, avaliacaoParam]);

  const handleFilterChange = (
    key: keyof typeof filtros,
    value: number | undefined,
  ) => {
    setFiltros((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* REUTILIZAÇÃO DO COMPONENTE DE BUSCA */}
      <SearchHero
        searchText={filtros.searchText}
        onSearchTextChange={handleSearchTextChange}
        onSearch={handleSearch}
      />

      {/* Conteúdo (o resto da página) */}
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-card border border-border rounded-lg p-6 sticky top-24 space-y-6">
            <h2 className="text-lg font-bold mb-6">Filtros</h2>

            {/* Distância */}
            <div>
              <Label className="text-sm font-semibold mb-3 block">
                Distância Máxima: {maxDistance} km
              </Label>
              <Slider
                defaultValue={[0]}
                max={200}
                step={5}
                className="mb-2"
                onValueChange={(value) => setMaxDistance(value[0])}
                value={[maxDistance]}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0 km</span>
                <span>200 km</span>
              </div>
            </div>

            {/* Filtros reutilizáveis */}
            <FiltroSelect
              label="Serviço"
              value={filtros.servicoId}
              options={servicos || []}
              placeholder="Todos"
              onChange={(v) => handleFilterChange("servicoId", v)}
            />

            <FiltroSelect
              label="Categoria"
              value={filtros.categoriaId}
              options={categorias || []}
              placeholder="Todos"
              onChange={(v) => handleFilterChange("categoriaId", v)}
            />

            <FiltroSelect
              label="Avaliação"
              value={filtros.avaliacaoMin}
              options={avaliacaoOptions.map((a) => ({
                id: a,
                nome: `${a}+ estrelas`,
              }))}
              placeholder="Todas"
              onChange={(v) => handleFilterChange("avaliacaoMin", v)}
            />
          </div>
        </aside>

        {/* Resultados */}
        <div className="flex-1 space-y-4">
          {isLoading && <p>Carregando prestadores...</p>}
          {error && (
            <p className="text-red-500">Erro ao carregar: {error.message}</p>
          )}

          {!location && !filtros.searchText && !filtros.servicoId && (
            <div className="p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg">
              Permita a localização para ver a distância e prestadores mais
              próximos.
            </div>
          )}
          {prestadores?.length === 0 && !isLoading && (
            <p>Nenhum prestador encontrado.</p>
          )}
          {prestadores?.map((p) => (
            <ProviderCard
              key={p.id}
              id={p.id}
              name={p.nomeUsuario}
              rating={p.mediaNota}
              distance={
                p.distanciaKm !== null
                  ? `${p.distanciaKm.toFixed(1)} km`
                  : "Distância Indisponível"
              }
              categories={p.categorias.flatMap((c) =>
                c.servicos.map((s) => s.nome),
              )}
              description={p.sobreMim}
              horizontal
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Servicos;
