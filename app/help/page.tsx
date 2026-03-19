import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SupportIndex } from "@/components/support-index";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { helpArticles } from "@/lib/support-content";
import { BookOpen, MessageCircle, Video, Users } from "lucide-react";

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-16">
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

          <p className="text-2xl lg:text-3xl font-bold max-w-3xl leading-tight uppercase tracking-tighter opacity-80">
            ENCONTRE RESPOSTAS PARA SUAS DÚVIDAS, TUTORIAIS PASSO A PASSO E DICAS
            PARA APROVEITAR AO MÁXIMO O UNILINK.
          </p>
        </section>

        <section className="mb-16">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "TUTORIAIS",
                desc: "GUIAS PRÁTICOS PARA ONBOARDING, LINKS E TEMA.",
                icon: Video,
                color: "bg-blue-100",
                href: "/docs",
              },
              {
                title: "FALAR COM SUPORTE",
                desc: "ENTRE EM CONTATO DIRETO COM NOSSA EQUIPE.",
                icon: MessageCircle,
                color: "bg-emerald-100",
                href: "/contact",
              },
              {
                title: "SOBRE O PRODUTO",
                desc: "ENTENDA A PROPOSTA E O POSICIONAMENTO DO UNILINK.",
                icon: Users,
                color: "bg-purple-100",
                href: "/about",
              },
            ].map((action) => (
              <Card
                key={action.title}
                className={`border-4 border-foreground shadow-neo ${action.color} rounded-none transition-all group`}
              >
                <CardContent className="p-0">
                  <Link href={action.href} className="block p-8 text-center">
                    <div className="w-20 h-20 bg-white border-4 border-foreground shadow-neo flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform">
                      <action.icon className="h-10 w-10 text-foreground stroke-3" />
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter mb-2 italic">
                      {action.title}
                    </h3>
                    <p className="text-sm font-bold uppercase tracking-tight opacity-70 leading-tight">
                      {action.desc}
                    </p>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="flex items-center gap-6 mb-12">
            <div className="w-20 h-20 bg-pink-400 border-4 border-foreground shadow-neo flex items-center justify-center -rotate-3">
              <BookOpen className="w-10 h-10 text-white stroke-3" />
            </div>
            <div>
              <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter italic">
                CONTEÚDO DISPONÍVEL
              </h2>
              <p className="text-xl font-bold uppercase tracking-tight opacity-70 leading-none">
                BUSQUE E ABRA ARTIGOS REAIS
              </p>
            </div>
          </div>

          <SupportIndex
            articles={helpArticles}
            basePath="/help"
            emptyTitle="Nenhum artigo encontrado"
            emptyDescription="Tente outro termo ou fale com o suporte para continuar."
          />
        </section>

        <section className="mt-24">
          <Card className="border-8 border-foreground shadow-neo bg-primary text-white rounded-none p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-white/10 to-transparent" />
            <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
              <div className="text-left">
                <h3 className="text-6xl font-black uppercase tracking-tighter underline decoration-white/30 decoration-8 underline-offset-8 mb-6 italic">
                  NÃO ACHOU O
                  <br />
                  QUE PRECISA?
                </h3>
                <p className="text-2xl font-bold uppercase tracking-tight max-w-xl leading-tight">
                  NOSSO TIME DE SUPORTE ESTÁ PRONTO PARA AJUDAR VOCÊ A DECOLAR
                  COM O UNILINK.
                </p>
              </div>
              <div className="flex flex-col gap-6">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-foreground border-4 border-foreground shadow-neo font-black uppercase tracking-widest text-2xl h-20 -rotate-2 hover:rotate-0 transition-transform"
                >
                  <Link href="/contact">
                    <MessageCircle className="w-8 h-8 mr-4 stroke-3" />
                    FALAR COM SUPORTE
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-foreground text-background border-4 border-foreground shadow-neo font-black uppercase tracking-widest text-2xl h-20 rotate-1 hover:rotate-0 transition-transform"
                >
                  <Link href="/docs">
                    <BookOpen className="w-8 h-8 mr-4 stroke-3" />
                    VER DOCUMENTAÇÃO
                  </Link>
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
