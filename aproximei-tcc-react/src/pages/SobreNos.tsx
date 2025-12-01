import Header from "@/components/Header";
import { Users, Target, Award, GraduationCap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const SobreNos = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Hero Section */}
        <section className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Sobre o <span className="text-primary">APROXI</span>
            <span className="text-secondary">MEI</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Conectando pessoas a profissionais qualificados de forma simples e
            eficiente
          </p>
        </section>

        {/* Mission Section */}
        <section className="mb-12 md:mb-16">
          <Card className="border-2">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-3">Nossa Missão</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    O APROXIMEI é uma plataforma desenvolvida para facilitar a
                    conexão entre clientes e prestadores de serviços. Nosso
                    objetivo é tornar a busca por profissionais qualificados
                    mais acessível, transparente e eficiente, promovendo o
                    crescimento de microempreendedores individuais (MEIs) e
                    facilitando a vida de quem precisa de serviços de qualidade.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Values Grid */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Nossos Valores
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Conexão</h3>
                <p className="text-sm text-muted-foreground">
                  Aproximamos pessoas e profissionais, criando relacionamentos
                  de confiança
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="bg-secondary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Qualidade</h3>
                <p className="text-sm text-muted-foreground">
                  Quando falamos em qualidade, falamos de clareza, compromisso e
                  responsabilidade
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Transparência</h3>
                <p className="text-sm text-muted-foreground">
                  Avaliações reais e informações claras para decisões informadas
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How it Works Section */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Como Funciona
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold mb-4">
                  1
                </div>
                <h3 className="font-semibold text-lg mb-2">Para Clientes</h3>
                <p className="text-sm text-muted-foreground">
                  Busque por serviços, compare prestadores, veja avaliações e
                  contrate profissionais qualificados próximos a você
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="bg-secondary text-secondary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold mb-4">
                  2
                </div>
                <h3 className="font-semibold text-lg mb-2">Para Prestadores</h3>
                <p className="text-sm text-muted-foreground">
                  Cadastre-se, divulgue seus serviços, receba avaliações e
                  expanda sua carteira de clientes
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Academic Project Section */}
        <section className="mb-12 md:mb-16 mt-24">
          <Card className="border-2 border-primary/20 bg-primary/5">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="bg-primary/20 p-3 rounded-lg">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-3">Projeto Acadêmico</h2>

                  <p className="text-muted-foreground leading-relaxed mb-4">
                    O APROXIMEI foi desenvolvido como Trabalho de Conclusão de
                    Curso (TCC) por{" "}
                    <span className="font-semibold text-foreground">
                      Renata Oliveira Schafer
                    </span>
                    , estudante do Instituto Federal Sul-rio-grandense (IFSul) –
                    Campus Charqueadas.
                  </p>

                  <p className="text-muted-foreground leading-relaxed mb-4">
                    A orientação foi realizada pelo professor{" "}
                    <span className="font-semibold text-foreground">
                      Gildemberg Alves dos Santos - Master of Science in
                      Business Administration
                    </span>
                    .
                  </p>

                  <p className="text-muted-foreground leading-relaxed">
                    Este projeto representa a aplicação prática de conhecimentos
                    adquiridos ao longo do curso, unindo tecnologia, design e
                    visão empreendedora para entregar uma solução que beneficia
                    microempreendedores e fortalece a comunidade local.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default SobreNos;
