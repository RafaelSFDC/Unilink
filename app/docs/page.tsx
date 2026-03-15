import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Code,
  Database,
  Zap,
  ArrowRight,
  ExternalLink,
  FileText,
  Settings,
  Palette,
  BarChart3,
} from "lucide-react";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="text-left mb-16 border-b-8 border-foreground pb-16">
          <Badge className="mb-6 px-6 py-2 bg-blue-400 text-white border-4 border-foreground shadow-neo font-black uppercase tracking-tighter text-sm -rotate-1 w-fit">
            <BookOpen className="w-4 h-4 mr-2" />
            DOCUMENTAÇÃO
          </Badge>

          <h1 className="text-6xl lg:text-[10rem] font-black leading-[0.8] mb-10 tracking-tighter uppercase italic">
            GUIA PARA
            <br />
            <span className="bg-primary text-white px-6 shadow-neo-lg rotate-2 inline-block mt-4 not-italic border-4 border-foreground">
              DEVELOPERS
            </span>
          </h1>

          <p className="text-2xl lg:text-3xl font-bold max-w-3xl leading-tight uppercase tracking-tighter opacity-80">
            GUIAS COMPLETOS, REFERÊNCIAS DE API E TUTORIAIS PARA DESENVOLVEDORES
            E USUÁRIOS AVANÇADOS.
          </p>
        </section>

        {/* Quick Start */}
        <section className="mb-24">
          <div className="flex items-center gap-6 mb-12">
            <div className="w-20 h-20 bg-emerald-400 border-4 border-foreground shadow-neo flex items-center justify-center -rotate-3">
              <Zap className="w-10 h-10 text-white stroke-3" />
            </div>
            <div>
              <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter italic">
                INÍCIO RÁPIDO
              </h2>
              <p className="text-xl font-bold uppercase tracking-tight opacity-70 leading-none">
                COMECE A USAR O UNILINK EM MINUTOS
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                num: "1",
                title: "CRIAR CONTA",
                desc: "FAÇA LOGIN COM SUA CONTA GOOGLE, GITHUB OU EMAIL.",
                color: "bg-blue-100",
              },
              {
                num: "2",
                title: "CONFIGURAR PERFIL",
                desc: "COMPLETE O ONBOARDING E PERSONALIZE SUA PÁGINA.",
                color: "bg-emerald-100",
              },
              {
                num: "3",
                title: "ADICIONAR LINKS",
                desc: "COMECE ADICIONANDO SEUS LINKS MAIS IMPORTANTES.",
                color: "bg-purple-100",
              },
            ].map((step, idx) => (
              <Card
                key={idx}
                className={`border-4 border-foreground shadow-neo ${step.color} rounded-none p-8 hover:translate-x-1 hover:-translate-y-1 transition-transform`}
              >
                <div className="w-16 h-16 bg-white border-4 border-foreground shadow-neo flex items-center justify-center mb-6 rotate-6">
                  <span className="text-3xl font-black italic">{step.num}</span>
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-2 italic">
                  {step.title}
                </h3>
                <p className="font-bold uppercase tracking-tight opacity-70 leading-tight mb-6">
                  {step.desc}
                </p>
                <Button
                  variant="ghost"
                  className="p-0 h-auto font-black uppercase tracking-widest text-primary hover:bg-transparent group italic underline decoration-4 underline-offset-4"
                >
                  VER TUTORIAL{" "}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform stroke-4" />
                </Button>
              </Card>
            ))}
          </div>
        </section>

        {/* Documentation Sections */}
        <section className="mb-24">
          <div className="flex items-center gap-6 mb-12 flex-row-reverse text-right">
            <div className="w-20 h-20 bg-purple-400 border-4 border-foreground shadow-neo flex items-center justify-center rotate-3">
              <FileText className="w-10 h-10 text-white stroke-3" />
            </div>
            <div>
              <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter italic">
                SEÇÕES DA DOC
              </h2>
              <p className="text-xl font-bold uppercase tracking-tight opacity-70 leading-none">
                NAVEGUE PELO NOSSO CONHECIMENTO
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "CONFIGURAÇÃO BÁSICA",
                desc: "SETUP INICIAL E CONFIGURAÇÕES ESSENCIAIS.",
                icon: Settings,
                color: "bg-blue-400",
                items: [
                  "CRIANDO SUA CONTA",
                  "CONFIGURAÇÕES DE PERFIL",
                  "PRIVACIDADE",
                ],
              },
              {
                title: "GERENCIAMENTO DE LINKS",
                desc: "COMO ADICIONAR, EDITAR E ORGANIZAR LINKS.",
                icon: Zap,
                color: "bg-emerald-400",
                items: [
                  "ADICIONANDO LINKS",
                  "ORGANIZANDO ORDEM",
                  "ÍCONES CUSTOM",
                ],
              },
              {
                title: "PERSONALIZAÇÃO",
                desc: "CUSTOMIZE CORES, FONTES E LAYOUT.",
                icon: Palette,
                color: "bg-purple-400",
                items: ["TEMAS E CORES", "FONTES", "LAYOUT DA PÁGINA"],
              },
              {
                title: "ANALYTICS",
                desc: "ENTENDA SUAS MÉTRICAS E RELATÓRIOS.",
                icon: BarChart3,
                color: "bg-pink-400",
                items: ["VISUALIZAÇÕES", "CLIQUES", "RELATÓRIOS MENSAIS"],
              },
            ].map((section, idx) => (
              <Card
                key={idx}
                className="border-4 border-foreground shadow-neo bg-white rounded-none p-8 hover:translate-x-1 hover:-translate-y-1 transition-transform overflow-hidden relative"
              >
                <div
                  className={`absolute top-0 right-0 w-32 h-32 ${section.color} opacity-10 -mr-16 -mt-16 rounded-full`}
                />
                <div className="flex items-center gap-6 mb-8 relative z-10">
                  <div
                    className={`w-16 h-16 ${section.color} border-4 border-foreground shadow-neo flex items-center justify-center -rotate-2`}
                  >
                    <section.icon className="w-8 h-8 text-white stroke-3" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter italic leading-none">
                      {section.title}
                    </h3>
                    <p className="text-xs font-black uppercase tracking-widest opacity-60 mt-2">
                      {section.desc}
                    </p>
                  </div>
                </div>
                <div className="space-y-4 relative z-10">
                  {section.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 bg-gray-50 border-2 border-foreground hover:bg-white transition-colors cursor-pointer group"
                    >
                      <span className="font-bold uppercase tracking-tight group-hover:text-primary transition-colors">
                        {item}
                      </span>
                      <ExternalLink className="w-4 h-4 text-foreground/30 group-hover:text-primary transition-colors stroke-3" />
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* API documentation */}
        <section className="mb-24">
          <div className="flex items-center gap-6 mb-12">
            <div className="w-20 h-20 bg-gray-800 border-4 border-foreground shadow-neo flex items-center justify-center -rotate-3">
              <Code className="w-10 h-10 text-white stroke-3" />
            </div>
            <div>
              <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter italic">
                API & INTEGRAÇÕES
              </h2>
              <p className="text-xl font-bold uppercase tracking-tight opacity-70 leading-none">
                PARA INTEGRAÇÕES MAIS COMPLEXAS
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-4 border-foreground shadow-neo bg-gray-900 text-white rounded-none p-10 hover:rotate-1 transition-transform">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-16 bg-white border-4 border-foreground shadow-neo flex items-center justify-center -rotate-6">
                  <Code className="w-8 h-8 text-gray-900 stroke-3" />
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tighter italic">
                  REST API
                </h3>
              </div>
              <p className="text-lg font-bold uppercase tracking-tight opacity-70 mb-8 leading-tight">
                ACESSE E GERENCIE SEUS DADOS PROGRAMATICAMENTE COM NOSSA API
                REST COMPLETA.
              </p>
              <Button
                variant="outline"
                size="lg"
                className="border-4 border-white bg-transparent text-white font-black hover:bg-white hover:text-gray-900 uppercase tracking-widest h-16 w-full shadow-neo transition-all"
              >
                <Code className="w-6 h-6 mr-3" />
                VER DOCS DE API
              </Button>
            </Card>

            <Card className="border-4 border-foreground shadow-neo bg-blue-100 rounded-none p-10 hover:-rotate-1 transition-transform">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-16 bg-white border-4 border-foreground shadow-neo flex items-center justify-center rotate-6">
                  <Database className="w-8 h-8 text-blue-400 stroke-3" />
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tighter italic">
                  WEBHOOKS
                </h3>
              </div>
              <p className="text-lg font-bold uppercase tracking-tight opacity-70 mb-8 leading-tight">
                RECEBA NOTIFICAÇÕES EM TEMPO REAL SOBRE CLIQUES E VISUALIZAÇÕES
                DIRETAMENTE NO SEU SERVIDOR.
              </p>
              <Button
                variant="outline"
                size="lg"
                className="border-4 border-foreground bg-white text-foreground font-black hover:bg-foreground hover:text-white uppercase tracking-widest h-16 w-full shadow-neo transition-all"
              >
                <Database className="w-6 h-6 mr-3" />
                CONFIGURAR WEBHOOKS
              </Button>
            </Card>
          </div>
        </section>

        {/* Resources */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black uppercase tracking-tighter italic underline decoration-primary decoration-8 underline-offset-8">
              RECURSOS EXTRAS
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "CHANGELOG",
                desc: "ACOMPANHE TODAS AS ATUALIZAÇÕES.",
                icon: FileText,
                color: "text-blue-500",
              },
              {
                title: "EXEMPLOS",
                desc: "SNIPPETS PRÁTICOS DE CÓDIGO.",
                icon: Code,
                color: "text-emerald-500",
              },
              {
                title: "GUIAS AVANÇADOS",
                desc: "TUTORIAIS PARA CASOS COMPLEXOS.",
                icon: BookOpen,
                color: "text-purple-500",
              },
            ].map((resource, i) => (
              <Card
                key={i}
                className="border-4 border-foreground shadow-neo bg-white rounded-none p-8 text-center group hover:bg-gray-50 transition-colors"
              >
                <resource.icon
                  className={`w-16 h-16 ${resource.color} mx-auto mb-6 stroke-3 group-hover:scale-110 transition-transform`}
                />
                <h3 className="text-2xl font-black uppercase tracking-tighter italic mb-2">
                  {resource.title}
                </h3>
                <p className="text-sm font-bold uppercase tracking-tight opacity-50 mb-8">
                  {resource.desc}
                </p>
                <Button
                  variant="ghost"
                  className="font-black uppercase tracking-widest text-primary italic underline decoration-2 underline-offset-4"
                >
                  VER AGORA
                </Button>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-24">
          <Card className="border-8 border-foreground shadow-neo bg-primary text-white rounded-none p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-white/10 to-transparent" />
            <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
              <div className="text-left">
                <h3 className="text-6xl font-black uppercase tracking-tighter underline decoration-white/30 decoration-8 underline-offset-8 mb-6 italic">
                  PRECISA DE
                  <br />
                  MAIS AJUDA?
                </h3>
                <p className="text-2xl font-bold uppercase tracking-tight max-w-xl leading-tight">
                  NOSSA EQUIPE ESTÁ SEMPRE DISPONÍVEL PARA AJUDAR VOCÊ A
                  CONSTRUIR COISAS INCRÍVEIS.
                </p>
              </div>
              <div className="flex flex-col gap-6">
                <Button
                  size="lg"
                  className="bg-white text-foreground border-4 border-foreground shadow-neo font-black uppercase tracking-widest text-2xl h-20 -rotate-2 hover:rotate-0 transition-transform"
                >
                  FALAR COM SUPORTE
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-foreground text-background border-4 border-foreground shadow-neo font-black uppercase tracking-widest text-2xl h-20 rotate-1 hover:rotate-0 transition-transform"
                >
                  COMUNIDADE
                </Button>
              </div>
            </div>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
}
