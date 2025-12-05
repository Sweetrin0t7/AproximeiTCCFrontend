import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import ProviderCard from "@/components/ProviderCard";
import SearchHero from "@/components/SearchHero";
import { useServicos, useCategorias } from "@/hooks/useFiltros";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import FiltroSelect from "@/components/Filtro";
import { useBuscaPrestadores } from "@/hooks/useHome";
import { Button } from "@/components/ui/button"; 
import { toast } from "sonner"; 

const Servicos = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const palavraParam = searchParams.get("palavra") || "";
  const servicoParam = searchParams.get("servicoId");
  const categoriaParam = searchParams.get("categoriaId");
  const avaliacaoParam = searchParams.get("avaliacaoMin");

  const [filtros, setFiltros] = useState({
    searchText: palavraParam,
    servicoId: servicoParam ? Number(servicoParam) : undefined,
    categoriaId: categoriaParam ? Number(categoriaParam) : undefined,
    avaliacaoMin: avaliacaoParam ? Number(avaliacaoParam) : undefined,
  });

  const [maxDistance, setMaxDistance] = useState<number>(0);
  
  const [shouldFetch, setShouldFetch] = useState(!!palavraParam); 
  
  const [selectKey, setSelectKey] = useState(0); 

  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  
  useEffect(() => {
    if (!("geolocation" in navigator)) {
      console.warn("Geolocalização não disponível neste navegador.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.warn("Erro ao obter localização:", error.message);
        setLocation(null);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 1000 * 60 * 5,
      }
    );
  }, []);

  const { data: servicos } = useServicos();
  const { data: categorias } = useCategorias();
  const avaliacaoOptions = [5, 4, 3];

  const {
    data: prestadores,
    isLoading,
    error,
  } = useBuscaPrestadores(
    {
      palavra: filtros.searchText || undefined,
      servicoId: filtros.servicoId,
      categoriaId: filtros.categoriaId,
      avaliacaoMin: filtros.avaliacaoMin,
      latitude: location?.latitude,
      longitude: location?.longitude,
      maxDistance: maxDistance > 0 ? maxDistance : undefined,
    },
    shouldFetch
  );

  const handleSearch = () => {
    const isSearchText = filtros.searchText.trim().length > 0;
    
    if (!isSearchText) {
      toast.error("Você deve digitar um termo de busca para realizar a pesquisa.");
      return; 
    }

    setShouldFetch(true); 

    const newParams: Record<string, string> = {};
    newParams.palavra = filtros.searchText.trim(); 
    
    if (filtros.servicoId) newParams.servicoId = String(filtros.servicoId);
    if (filtros.categoriaId) newParams.categoriaId = String(filtros.categoriaId);
    if (filtros.avaliacaoMin)
      newParams.avaliacaoMin = String(filtros.avaliacaoMin);

    setSearchParams(newParams);
  };

  const handleSearchTextChange = (text: string) => {
    setFiltros((prev) => ({ ...prev, searchText: text }));
    
    if (!text.trim()) {
      setShouldFetch(false);
      
      const currentParams = Object.fromEntries(searchParams.entries());
      if (currentParams.palavra) {
          delete currentParams.palavra;
          setSearchParams(currentParams, { replace: true });
      }
    }
  };

  const handleClearFilters = () => {
    setFiltros({
      searchText: "",
      servicoId: undefined,
      categoriaId: undefined,
      avaliacaoMin: undefined,
    });
    setMaxDistance(0);
    setSearchParams({});
    setShouldFetch(false);
    setSelectKey((prev) => prev + 1); 
  };

  useEffect(() => {
    const isFetching = !!palavraParam || !!servicoParam || !!categoriaParam || !!avaliacaoParam;
    
    setFiltros({
      searchText: palavraParam,
      servicoId: servicoParam ? Number(servicoParam) : undefined,
      categoriaId: categoriaParam ? Number(categoriaParam) : undefined,
      avaliacaoMin: avaliacaoParam ? Number(avaliacaoParam) : undefined,
    });
    
    setShouldFetch(!!palavraParam);

    if (!palavraParam && (servicoParam || categoriaParam || avaliacaoParam)) {
        setShouldFetch(false);
    }
    
  }, [palavraParam, servicoParam, categoriaParam, avaliacaoParam]);

  const handleFilterChange = (
    key: keyof typeof filtros,
    value: number | undefined
  ) => {
    setFiltros((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <SearchHero
        searchText={filtros.searchText}
        onSearchTextChange={handleSearchTextChange}
        onSearch={handleSearch}
      />

      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-card border border-border rounded-lg p-6 sticky top-24 space-y-6">
            <h2 className="text-lg font-bold mb-6">Filtros</h2>

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

            <FiltroSelect
              key={`servico-${selectKey}`} 
              label="Serviço"
              value={filtros.servicoId}
              options={servicos || []}
              placeholder="Todos"
              onChange={(v) => handleFilterChange("servicoId", v)}
            />

            <FiltroSelect
              key={`categoria-${selectKey}`}
              label="Categoria"
              value={filtros.categoriaId}
              options={categorias || []}
              placeholder="Todos"
              onChange={(v) => handleFilterChange("categoriaId", v)}
            />

            <FiltroSelect
              key={`avaliacao-${selectKey}`}
              label="Avaliação"
              value={filtros.avaliacaoMin}
              options={avaliacaoOptions.map((a) => ({
                id: a,
                nome: `${a}+ estrelas`,
              }))}
              placeholder="Todas"
              onChange={(v) => handleFilterChange("avaliacaoMin", v)}
            />

            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={handleClearFilters}
            >
              Limpar Filtros
            </Button>
          </div>
        </aside>

        <div className="flex-1 space-y-4">
          {isLoading && <p>Carregando prestadores...</p>}
          {error && (
            <p className="text-red-500">Erro ao carregar: {error.message}</p>
          )}

          {!shouldFetch && (
            <div className="p-4 rounded-lg">
              Digite um termo de busca e clique em Buscar para ver os resultados.
            </div>
          )}

          {!location && !filtros.searchText && !filtros.servicoId && (
            <div className="p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg">
              Permita a localização para ver a distância e prestadores mais
              próximos.
            </div>
          )}

          {shouldFetch && prestadores?.length === 0 && !isLoading && (
            <p>Nenhum prestador encontrado.</p>
          )}

          {(shouldFetch || isLoading) && prestadores?.map((p) => (
            <ProviderCard
              key={p.id}
              id={p.id}
              name={p.nomeUsuario}
              image={p.fotoPerfil}
              rating={p.mediaNota}
              distance={
                p.distanciaKm !== null
                  ? `${p.distanciaKm.toFixed(1)} km`
                  : "Distância Indisponível"
              }
              categories={p.categorias.flatMap((c) =>
                c.servicos.map((s) => s.nome)
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