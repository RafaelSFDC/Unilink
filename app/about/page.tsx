import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  Target,
  Heart,
  Zap,
  Shield,
  Globe,
  Star,
  TrendingUp,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="text-left mb-20 border-b-8 border-foreground pb-20">
          <Badge className="mb-8 px-6 py-2 bg-primary text-white border-4 border-foreground shadow-neo font-black uppercase tracking-tighter text-sm -rotate-1 w-fit">
            <Heart className="w-4 h-4 mr-2 fill-current" />
            NOSSA HISTÓRIA
          </Badge>

          <h1 className="text-6xl sm:text-8xl lg:text-[10rem] font-black leading-[0.8] mb-10 tracking-tighter uppercase italic">
            SOBRE O
            <br />
            <span className="bg-secondary text-foreground px-6 shadow-neo-lg rotate-2 inline-block mt-4 not-italic border-4 border-foreground">
              UNILINK
            </span>
          </h1>

          <p className="text-2xl lg:text-3xl font-bold max-w-4xl leading-tight uppercase tracking-tighter opacity-80">
            CRIAMOS O UNILINK COM UMA MISSÃO SIMPLES: FACILITAR A VIDA DOS
            CRIADORES DE CONTEÚDO, OFERECENDO UMA PLATAFORMA BRUTAL, SEGURA E
            INTUITIVA PARA ORGANIZAR TUDO QUE IMPORTA.
          </p>
        </section>

        {/* Mission & Vision */}
        <section className="grid md:grid-cols-2 gap-12 mb-20">
          <Card className="border-4 border-foreground shadow-neo bg-accent rounded-none overflow-hidden">
            <CardHeader className="bg-foreground text-background p-8 border-b-4 border-foreground">
              <div className="w-16 h-16 bg-primary border-4 border-background flex items-center justify-center mb-6 shadow-neo-sm rotate-[-5deg]">
                <Target className="h-10 w-10 text-white stroke-3" />
              </div>
              <CardTitle className="text-4xl font-black uppercase tracking-tighter italic">
                Nossa Missão
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <p className="text-xl font-bold uppercase tracking-tight leading-none">
                EMPODERAR CRIADORES COM FERRAMENTAS IMPACTANTES PARA CONECTAR
                SUA AUDIÊNCIA AO QUE IMPORTA, DE FORMA ORGANIZADA E
                PROFISSIONAL.
              </p>
            </CardContent>
          </Card>

          <Card className="border-4 border-foreground shadow-neo bg-secondary rounded-none overflow-hidden">
            <CardHeader className="bg-foreground text-background p-8 border-b-4 border-foreground">
              <div className="w-16 h-16 bg-accent border-4 border-background flex items-center justify-center mb-6 shadow-neo-sm rotate-[5deg]">
                <Globe className="h-10 w-10 text-white stroke-3" />
              </div>
              <CardTitle className="text-4xl font-black uppercase tracking-tighter italic">
                Nossa Visão
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <p className="text-xl font-bold uppercase tracking-tight leading-none">
                SER A REFERÊNCIA MUNDIAL PARA CRIADORES QUE BUSCAM PRESENÇA
                ONLINE BRUTAL, ANALYTICS PODEROSOS E PERSONALIZAÇÃO SEM LIMITES.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Values */}
        <section className="mb-20 pb-20 border-b-8 border-foreground">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
            <h2 className="text-5xl lg:text-8xl font-black uppercase tracking-tighter italic">
              NOSSOS VALORES
            </h2>
            <div className="bg-primary p-6 border-4 border-foreground shadow-neo -rotate-3 hidden md:block">
              <Star className="w-12 h-12 text-white fill-current" />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: Zap,
                title: "Simplicidade",
                desc: "Acreditamos que ferramentas poderosas devem ser diretas. Cada funcionalidade é pensada para ser brutalmente intuitiva.",
                color: "bg-emerald-400",
              },
              {
                icon: Shield,
                title: "Segurança",
                desc: "Seus dados são sagrados. Utilizamos blindagem de elite para proteger cada informação sua.",
                color: "bg-primary",
              },
              {
                icon: Users,
                title: "Comunidade",
                desc: "Construímos o Unilink ouvindo quem importa. Seu feedback molda nossa evolução constante.",
                color: "bg-accent",
              },
            ].map((value, i) => (
              <div
                key={i}
                className="p-10 border-4 border-foreground bg-white shadow-neo hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all"
              >
                <div
                  className={`w-20 h-20 ${value.color} border-4 border-foreground flex items-center justify-center mb-8 shadow-neo rotate-[5deg]`}
                >
                  <value.icon className="h-10 w-10 text-white stroke-3" />
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 italic">
                  {value.title}
                </h3>
                <p className="text-lg font-bold uppercase tracking-tight opacity-80 leading-tight">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="mb-32">
          <div className="bg-foreground text-background p-12 lg:p-24 border-8 border-foreground shadow-neo-lg text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
              <div className="grid grid-cols-6 gap-8 rotate-12 -translate-y-1/2">
                {Array.from({ length: 30 }).map((_, i) => (
                  <TrendingUp key={i} className="w-24 h-24 text-white" />
                ))}
              </div>
            </div>

            <h3 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter mb-16 italic relative z-10">
              UNILINK EM NÚMEROS
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 relative z-10">
              {[
                { label: "Usuários Ativos", value: "10K+" },
                { label: "Links Criados", value: "50K+" },
                { label: "Cliques", value: "1M+" },
                { label: "Uptime", value: "99.9%" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-background text-foreground p-8 border-4 border-foreground shadow-neo rotate-2"
                >
                  <div className="text-4xl lg:text-6xl font-black mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm font-black uppercase tracking-widest opacity-60">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 text-center">
          <Badge className="bg-yellow-400 text-black border-4 border-foreground font-black uppercase text-lg mb-8 px-8 py-2 shadow-neo rotate-1">
            JUNTE-SE À REVOLUÇÃO
          </Badge>
          <h2 className="text-5xl lg:text-9xl font-black uppercase tracking-tighter mb-12 italic">
            PRONTO PARA
            <br />
            SER BRUTAL?
          </h2>
          <Button
            size="lg"
            className="h-24 bg-primary text-white border-4 border-foreground shadow-neo-lg px-20 text-3xl font-black uppercase tracking-tighter hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all"
            asChild
          >
            <Link href="/onboarding">CRIAR MEU PERFIL</Link>
          </Button>
        </section>
      </main>

      <Footer />
    </div>
  );
}
