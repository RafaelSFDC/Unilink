import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SupportIndex } from "@/components/support-index";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { docsArticles } from "@/lib/support-content";
import { BookOpen, CreditCard, FileText, Zap } from "lucide-react";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-16">
        <section className="text-left mb-16 border-b-8 border-foreground pb-16">
          <Badge className="mb-6 px-6 py-2 bg-blue-400 text-white border-4 border-foreground shadow-neo font-black uppercase tracking-tighter text-sm -rotate-1 w-fit">
            <BookOpen className="w-4 h-4 mr-2" />
            DOCUMENTAÇÃO
          </Badge>

          <h1 className="text-6xl lg:text-[10rem] font-black leading-[0.8] mb-10 tracking-tighter uppercase italic">
            GUIA PARA
            <br />
            <span className="bg-primary text-white px-6 shadow-neo-lg rotate-2 inline-block mt-4 not-italic border-4 border-foreground">
              O PRODUTO
            </span>
          </h1>

          <p className="text-2xl lg:text-3xl font-bold max-w-3xl leading-tight uppercase tracking-tighter opacity-80">
            GUIAS DE PRODUTO, OPERAÇÃO, BILLING, ANALYTICS E CONFIGURAÇÃO PARA
            MANTER O UNILINK ALINHADO E EVOLUINDO SEM CONFUSÃO.
          </p>
        </section>

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
                desc: "FAÇA LOGIN COM EMAIL E SIGA PARA O ONBOARDING.",
                color: "bg-blue-100",
                href: "/docs/getting-started",
              },
              {
                num: "2",
                title: "CONFIGURAR PERFIL",
                desc: "AJUSTE USERNAME, BIO E VISUAL DA SUA PÁGINA.",
                color: "bg-emerald-100",
                href: "/help/configurar-perfil",
              },
              {
                num: "3",
                title: "ADICIONAR LINKS",
                desc: "COMECE A PUBLICAR SEUS DESTINOS PRINCIPAIS.",
                color: "bg-purple-100",
                href: "/help/adicionar-links",
              },
            ].map((step) => (
              <Card
                key={step.title}
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
                  asChild
                  variant="ghost"
                  className="p-0 h-auto font-black uppercase tracking-widest text-primary hover:bg-transparent italic underline decoration-4 underline-offset-4"
                >
                  <Link href={step.href}>VER GUIA</Link>
                </Button>
              </Card>
            ))}
          </div>
        </section>

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

          <SupportIndex
            articles={docsArticles}
            basePath="/docs"
            emptyTitle="Nenhum documento encontrado"
            emptyDescription="Tente outro termo ou abra a área de ajuda para mais contexto."
          />
        </section>

        <section className="mb-24">
          <div className="flex items-center gap-6 mb-12">
            <div className="w-20 h-20 bg-gray-800 border-4 border-foreground shadow-neo flex items-center justify-center -rotate-3">
              <FileText className="w-10 h-10 text-white stroke-3" />
            </div>
            <div>
              <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter italic">
                OPERAÇÃO DO PRODUTO
              </h2>
              <p className="text-xl font-bold uppercase tracking-tight opacity-70 leading-none">
                BILLING, ANALYTICS E SUPORTE
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-4 border-foreground shadow-neo bg-gray-900 text-white rounded-none p-10 hover:rotate-1 transition-transform">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-16 bg-white border-4 border-foreground shadow-neo flex items-center justify-center -rotate-6">
                  <CreditCard className="w-8 h-8 text-gray-900 stroke-3" />
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tighter italic">
                  BILLING PRO
                </h3>
              </div>
              <p className="text-lg font-bold uppercase tracking-tight opacity-70 mb-8 leading-tight">
                ENTENDA O PAPEL DE STRIPE E MERCADO PAGO NA ASSINATURA PRO.
              </p>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-4 border-white bg-transparent text-white font-black hover:bg-white hover:text-gray-900 uppercase tracking-widest h-16 w-full shadow-neo transition-all"
              >
                <Link href="/docs/billing-overview">
                  <CreditCard className="w-6 h-6 mr-3" />
                  VER BILLING
                </Link>
              </Button>
            </Card>

            <Card className="border-4 border-foreground shadow-neo bg-blue-100 rounded-none p-10 hover:-rotate-1 transition-transform">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-16 bg-white border-4 border-foreground shadow-neo flex items-center justify-center rotate-6">
                  <FileText className="w-8 h-8 text-blue-400 stroke-3" />
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tighter italic">
                  ANALYTICS
                </h3>
              </div>
              <p className="text-lg font-bold uppercase tracking-tight opacity-70 mb-8 leading-tight">
                VEJA COMO O PRODUTO SEPARA MÉTRICAS INTERNAS E LEITURA DE TENDÊNCIA.
              </p>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-4 border-foreground bg-white text-foreground font-black hover:bg-foreground hover:text-white uppercase tracking-widest h-16 w-full shadow-neo transition-all"
              >
                <Link href="/docs/analytics-model">
                  <FileText className="w-6 h-6 mr-3" />
                  VER ANALYTICS
                </Link>
              </Button>
            </Card>
          </div>
        </section>

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
                  USE A CENTRAL DE AJUDA OU ENTRE EM CONTATO COM O SUPORTE.
                </p>
              </div>
              <div className="flex flex-col gap-6">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-foreground border-4 border-foreground shadow-neo font-black uppercase tracking-widest text-2xl h-20 -rotate-2 hover:rotate-0 transition-transform"
                >
                  <Link href="/contact">FALAR COM SUPORTE</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-foreground text-background border-4 border-foreground shadow-neo font-black uppercase tracking-widest text-2xl h-20 rotate-1 hover:rotate-0 transition-transform"
                >
                  <Link href="/help">CENTRAL DE AJUDA</Link>
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
