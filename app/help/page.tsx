import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  BookOpen,
  MessageCircle,
  Video,
  FileText,
  Users,
  Zap,
  Settings,
  BarChart3,
  Palette,
  Link as LinkIcon,
  ArrowRight,
} from "lucide-react";

const helpCategories = [
  {
    title: "Primeiros Passos",
    description: "Aprenda o básico para começar",
    icon: Zap,
    articles: [
      "Como criar sua primeira página",
      "Configurando seu perfil",
      "Adicionando seus primeiros links",
      "Personalizando sua página",
    ],
  },
  {
    title: "Gerenciamento de Links",
    description: "Organize e otimize seus links",
    icon: LinkIcon,
    articles: [
      "Como adicionar novos links",
      "Organizando links por categoria",
      "Editando e removendo links",
      "Links com ícones personalizados",
    ],
  },
  {
    title: "Personalização",
    description: "Customize sua página",
    icon: Palette,
    articles: [
      "Escolhendo cores e temas",
      "Personalizando fontes",
      "Adicionando sua foto de perfil",
      "Configurando layout",
    ],
  },
  {
    title: "Analytics",
    description: "Entenda suas métricas",
    icon: BarChart3,
    articles: [
      "Interpretando seus analytics",
      "Rastreamento de cliques",
      "Métricas de visualização",
      "Relatórios mensais",
    ],
  },
  {
    title: "Configurações",
    description: "Gerencie sua conta",
    icon: Settings,
    articles: [
      "Configurações de privacidade",
      "Alterando seu username",
      "Configurações de notificação",
      "Excluindo sua conta",
    ],
  },
  {
    title: "Solução de Problemas",
    description: "Resolva problemas comuns",
    icon: MessageCircle,
    articles: [
      "Problemas de login",
      "Links não funcionando",
      "Página não carregando",
      "Problemas de performance",
    ],
  },
];

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="text-left mb-16 border-b-8 border-foreground pb-16">
          <Badge className="mb-6 px-6 py-2 bg-blue-400 text-white border-4 border-foreground shadow-neo font-black uppercase tracking-tighter text-sm -rotate-1 w-fit">
            <BookOpen className="w-4 h-4 mr-2" />
            CENTRAL DE AJUDA
          </Badge>

          <h1 className="text-6xl lg:text-[10rem] font-black leading-[0.8] mb-10 tracking-tighter uppercase italic">
            COMO PODEMOS
            <br />
            <span className="bg-primary text-white px-6 shadow-neo-lg rotate-2 inline-block mt-4 not-italic border-4 border-foreground">
              AJUDAR?
            </span>
          </h1>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <p className="text-2xl lg:text-3xl font-bold max-w-3xl leading-tight uppercase tracking-tighter opacity-80">
              ENCONTRE RESPOSTAS PARA SUAS DÚVIDAS, TUTORIAIS PASSO A PASSO E
              DICAS PARA APROVEITAR AO MÁXIMO O UNILINK.
            </p>

            {/* Search Bar */}
            <div className="max-w-xl w-full relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-foreground w-6 h-6 z-10 stroke-3" />
              <Input
                placeholder="PESQUISAR NA CENTRAL DE AJUDA..."
                className="pl-16 py-8 text-xl border-4 border-foreground shadow-neo rounded-none bg-white font-black uppercase tracking-tighter placeholder:text-foreground/30 focus:ring-0 focus:border-primary transition-all pr-8"
              />
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-16">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "TUTORIAIS EM VÍDEO",
                desc: "APRENDA VISUALMENTE COM NOSSOS TUTORIAIS PASSO A PASSO.",
                icon: Video,
                color: "bg-blue-100",
                hoverColor: "hover:bg-blue-200",
              },
              {
                title: "FALAR COM SUPORTE",
                desc: "ENTRE EM CONTATO DIRETO COM NOSSA EQUIPE DE SUPORTE.",
                icon: MessageCircle,
                color: "bg-emerald-100",
                hoverColor: "hover:bg-emerald-200",
              },
              {
                title: "COMUNIDADE",
                desc: "CONECTE-SE COM OUTROS USUÁRIOS E COMPARTILHE DICAS.",
                icon: Users,
                color: "bg-purple-100",
                hoverColor: "hover:bg-purple-200",
              },
            ].map((action, idx) => (
              <Card
                key={idx}
                className={`border-4 border-foreground shadow-neo ${action.color} ${action.hoverColor} rounded-none transition-all cursor-pointer group`}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-white border-4 border-foreground shadow-neo flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform">
                    <action.icon className="h-10 w-10 text-foreground stroke-3" />
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter mb-2 italic">
                    {action.title}
                  </h3>
                  <p className="text-sm font-bold uppercase tracking-tight opacity-70 leading-tight">
                    {action.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Help Categories */}
        <section className="mb-16">
          <div className="flex items-center gap-6 mb-12">
            <div className="w-20 h-20 bg-pink-400 border-4 border-foreground shadow-neo flex items-center justify-center -rotate-3">
              <BookOpen className="w-10 h-10 text-white stroke-3" />
            </div>
            <div>
              <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter italic">
                CATEGORIAS
              </h2>
              <p className="text-xl font-bold uppercase tracking-tight opacity-70 leading-none">
                NAVEGUE PELOS TÓPICOS ORGANIZADOS
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {helpCategories.map((category, index) => (
              <Card
                key={index}
                className="border-4 border-foreground shadow-neo bg-white rounded-none hover:translate-x-1 hover:-translate-y-1 transition-transform"
              >
                <CardHeader className="p-8 border-b-4 border-foreground bg-gray-50">
                  <div className="w-14 h-14 bg-primary text-white border-4 border-foreground shadow-neo flex items-center justify-center mb-4 rotate-2">
                    <category.icon className="h-8 w-8 stroke-3" />
                  </div>
                  <CardTitle className="text-2xl font-black uppercase tracking-tighter italic">
                    {category.title}
                  </CardTitle>
                  <CardDescription className="text-xs font-black uppercase tracking-widest opacity-60 mt-1">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <ul className="space-y-4">
                    {category.articles.map((article, articleIndex) => (
                      <li key={articleIndex}>
                        <a
                          href="#"
                          className="text-base font-bold uppercase tracking-tight text-foreground/70 hover:text-primary transition-colors flex items-center group leading-none"
                        >
                          <ArrowRight className="w-4 h-4 mr-3 text-primary group-hover:translate-x-1 transition-transform stroke-4" />
                          {article}
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Popular Articles */}
        <section className="mb-16">
          <div className="flex items-center gap-6 mb-12 flex-row-reverse text-right">
            <div className="w-20 h-20 bg-blue-400 border-4 border-foreground shadow-neo flex items-center justify-center rotate-3">
              <FileText className="w-10 h-10 text-white stroke-3" />
            </div>
            <div>
              <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter italic">
                ARTIGOS POPULARES
              </h2>
              <p className="text-xl font-bold uppercase tracking-tight opacity-70 leading-none">
                OS GUIAS MAIS ACESSADOS PELOS USUÁRIOS
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "GUIA COMPLETO: CRIANDO SUA PRIMEIRA PÁGINA",
                desc: "PASSO A PASSO COMPLETO PARA CRIAR E CONFIGURAR SUA PÁGINA DO ZERO.",
                color: "bg-blue-400",
              },
              {
                title: "COMO PERSONALIZAR CORES E TEMAS",
                desc: "APRENDA A CUSTOMIZAR SUA PÁGINA PARA COMBINAR COM SUA MARCA.",
                color: "bg-emerald-400",
              },
              {
                title: "ENTENDENDO SEUS ANALYTICS",
                desc: "COMO INTERPRETAR E USAR OS DADOS PARA MELHORAR SUA PERFORMANCE.",
                color: "bg-purple-400",
              },
              {
                title: "DICAS PARA AUMENTAR CLIQUES",
                desc: "ESTRATÉGIAS COMPROVADAS PARA MELHORAR O ENGAJAMENTO.",
                color: "bg-pink-400",
              },
            ].map((article, i) => (
              <Card
                key={i}
                className="border-4 border-foreground shadow-neo bg-white rounded-none p-8 hover:rotate-1 transition-transform"
              >
                <div className="flex items-start gap-6">
                  <div
                    className={`w-16 h-16 ${article.color} border-4 border-foreground shadow-neo flex items-center justify-center shrink-0 -rotate-2`}
                  >
                    <FileText className="h-8 w-8 text-white stroke-3" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter mb-3 leading-[0.9] italic">
                      {article.title}
                    </h3>
                    <p className="text-sm font-bold uppercase tracking-tight opacity-60 mb-6 leading-tight">
                      {article.desc}
                    </p>
                    <Button
                      variant="ghost"
                      className="p-0 h-auto font-black uppercase tracking-widest text-primary hover:bg-transparent group italic underline decoration-4 underline-offset-4"
                    >
                      LER ARTIGO{" "}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform stroke-4" />
                    </Button>
                  </div>
                </div>
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
                  NÃO ACHOU O<br />
                  QUE PRECISA?
                </h3>
                <p className="text-2xl font-bold uppercase tracking-tight max-w-xl leading-tight">
                  NOSSO TIME DE SUPORTE ESTÁ PRONTO PARA AJUDAR VOCÊ A DECOLAR
                  COM O UNILINK.
                </p>
              </div>
              <div className="flex flex-col gap-6">
                <Button
                  size="lg"
                  className="bg-white text-foreground border-4 border-foreground shadow-neo font-black uppercase tracking-widest text-2xl h-20 -rotate-2 hover:rotate-0 transition-transform"
                >
                  <MessageCircle className="w-8 h-8 mr-4 stroke-3" />
                  FALAR COM SUPORTE
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-foreground text-background border-4 border-foreground shadow-neo font-black uppercase tracking-widest text-2xl h-20 rotate-1 hover:rotate-0 transition-transform"
                >
                  <Users className="w-8 h-8 mr-4 stroke-3" />
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
