import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Header = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        
        <div className="flex items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl md:text-3xl font-bold">
              <span className="text-aproximei-blue">APROXI</span>
              <span className="text-aproximei-orange">MEI</span>
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/") ? "text-primary" : "text-foreground"
              }`}
            >
              Início
            </Link>

            <Link
              to="/servicos"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/servicos") ? "text-primary" : "text-foreground"
              }`}
            >
              Serviços
            </Link>

            <Link
              to="#"
              className="text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              Sobre nós
            </Link>
          </nav>

          {/* DESKTOP USER AREA */}
          <div className="hidden md:flex items-center gap-3">
            {!isAuthenticated && (
              <>
                <Button variant="outline" asChild>
                  <Link to="/entrar">Entrar</Link>
                </Button>

                <Button asChild>
                  <Link to="/cadastrar">Cadastrar-se</Link>
                </Button>
              </>
            )}

            {isAuthenticated && (
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border border-border">
                    <AvatarImage src={user?.fotoPerfilBase64} alt={user?.nome || "Usuário"} />
                    <AvatarFallback className="bg-aproximei-blue text-white text-base">
                      {user?.nome?.substring(0, 2).toUpperCase() || "US"} 
                    </AvatarFallback>
                  </Avatar>
                <Button variant="outline" onClick={logout}>
                  Sair
                </Button>
              </div>
            )}
          </div>

          {/* BOTÃO MOBILE (HAMBURGER) */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>

              {/* MOBILE MENU CONTENT */}
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-6 mt-8">

                  <Link
                    to="/"
                    className={`text-base font-medium transition-colors hover:text-primary ${
                      isActive("/") ? "text-primary" : "text-foreground"
                    }`}
                  >
                    Início
                  </Link>

                  <Link
                    to="/servicos"
                    className={`text-base font-medium transition-colors hover:text-primary ${
                      isActive("/servicos") ? "text-primary" : "text-foreground"
                    }`}
                  >
                    Serviços
                  </Link>

                  <Link
                    to="#"
                    className="text-base font-medium text-foreground transition-colors hover:text-primary"
                  >
                    Sobre nós
                  </Link>

                  {/* USER AREA - MOBILE */}
                  {!isAuthenticated && (
                    <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-border">
                      <Button variant="outline" asChild className="w-full">
                        <Link to="/entrar">Entrar</Link>
                      </Button>

                      <Button asChild className="w-full">
                        <Link to="/cadastrar">Cadastrar-se</Link>
                      </Button>
                    </div>
                  )}

                  {isAuthenticated && (
                    <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-border">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border border-border">
                          <AvatarImage src={user?.fotoPerfilBase64} alt={user?.nome || "Usuário"} />
                          <AvatarFallback className="bg-aproximei-blue text-white text-base">
                            {user?.nome?.substring(0, 2).toUpperCase() || "US"} 
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-base font-medium">
                          Usuário
                        </span>
                      </div>

                      <Button onClick={logout}>
                        Sair
                      </Button>
                    </div>
                  )}

                </nav>
              </SheetContent>
            </Sheet>
          </div>

        </div>

      </div>
    </header>
  );
};

export default Header;
