// src/components/SearchHero.tsx

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchHeroProps {
  searchText: string;
  onSearchTextChange: (text: string) => void;
  onSearch: () => void;
}

const SearchHero: React.FC<SearchHeroProps> = ({
  searchText,
  onSearchTextChange,
  onSearch,
}) => {
  return (
    <div
      className="relative bg-cover bg-center py-16 md:py-24"
      style={{
        backgroundImage:
          "linear-gradient(135deg, rgba(33, 150, 243, 0.95), rgba(66, 89, 130, 0.95)), url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200')",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            No que podemos
            <br />
            te ajudar hoje?
          </h1>
          <p className="text-base md:text-lg mb-8 opacity-90">
            Encontre o serviço ideal na empresa/pessoa adequada
          </p>
          <div className="flex gap-2">
            <div className="relative flex-1">
              {/* Ícone de busca com z-index alto para garantir visibilidade */}
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 z-10" />
              <Input
                type="text"
                placeholder="Pesquisar prestadores"
                className="pl-10 h-12 bg-white text-foreground"
                value={searchText}
                // Chama a função de atualização de texto do componente pai
                onChange={(e) => onSearchTextChange(e.target.value)}
                // Dispara a busca ao pressionar Enter
                onKeyDown={(e) => e.key === "Enter" && onSearch()}
              />
            </div>
            <Button size="lg" onClick={onSearch}>
              Buscar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchHero;
