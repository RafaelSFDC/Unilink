import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HomeCta } from "@/components/auth/home-cta";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  Users,
  BarChart3,
  Palette,
  Zap,
  CheckCircle,
  MousePointer,
  Sparkles,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Header />

      <main className="container mx-auto px-4 relative z-10">
        <section className="py-24 lg:py-48 text-left border-b-8 border-foreground">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal animate-stagger-1">
              <Badge className="mb-8 px-6 py-2 bg-yellow-400 text-foreground border-4 border-foreground shadow-neo font-black uppercase tracking-tighter text-sm -rotate-1">
                <Sparkles className="w-4 h-4 mr-2 fill-current" />PRESENCA DIGITAL PARA CRIADORES
              </Badge>

              <h1 className="text-7xl sm:text-8xl lg:text-[10rem] font-black leading-[0.8] mb-10 tracking-tighter uppercase italic">
                PUBLIQUE SUA
                <br />
                <span className="bg-primary text-white px-6 shadow-neo-lg rotate-2 inline-block mt-4 not-italic">
                  PAGINA
                </span>
              </h1>

              <p className="text-2xl lg:text-3xl font-bold mb-14 max-w-2xl leading-[1.1] uppercase tracking-tighter opacity-80">
                Uma pagina de links bonita, personalizavel e pronta para publicar.
                <br />
                Design forte para criadores.
                <br />
                Analytics uteis para acompanhar crescimento.
              </p>

              <div className="flex flex-wrap gap-8 items-center">
                <HomeCta />
              </div>
            </div>

            <div className="hidden lg:block reveal animate-stagger-2 perspective-1000">
              <div className="relative group transition-all duration-500">
                <div className="absolute inset-0 bg-secondary -rotate-6 shadow-neo-lg border-4 border-foreground group-hover:-rotate-3 transition-transform" />
                <div className="absolute inset-0 bg-accent rotate-3 shadow-neo-lg border-4 border-foreground group-hover:rotate-6 transition-transform opacity-50" />
                <div className="relative bg-background p-10 border-4 border-foreground shadow-neo-lg group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform">
                  <div className="w-24 h-24 bg-primary border-4 border-foreground shadow-neo mb-10 mx-auto rounded-full" />
                  <div className="space-y-6">
                    {[
                      { label: "MEU PORTFOLIO", color: "bg-emerald-400" },
                      { label: "ULTIMO VIDEO", color: "bg-red-400" },
                      { label: "AGENDA E CONTATO", color: "bg-yellow-400" },
                    ].map((link, i) => (
                      <div
                        key={i}
                        className={`h-16 border-4 border-foreground flex items-center justify-center font-black text-xl uppercase tracking-tighter ${link.color} shadow-neo hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-pointer`}
                      >
                        {link.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 border-b-8 border-foreground relative">
          <div className="absolute top-0 left-0 -translate-y-1/2 bg-foreground text-background px-8 py-3 font-black text-2xl uppercase tracking-tighter -rotate-1">
            DIFERENCIAIS
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16 pt-12">
            {[
              {
                icon: Palette,
                title: "Templates Premium",
                desc: "Visuais marcantes para criadores que querem uma pagina com mais personalidade e presenca.",
                color: "bg-emerald-400 text-black",
                badge: "PRO",
              },
              {
                icon: BarChart3,
                title: "Analytics Uteis",
                desc: "Acompanhe views, cliques e sinais importantes para entender o desempenho da sua pagina.",
                color: "bg-primary text-white",
                badge: "PRO",
              },
              {
                icon: MousePointer,
                title: "Publicacao Rapida",
                desc: "Configure username, adicione ate 5 links no FREE e publique sua pagina em poucos minutos.",
                color: "bg-accent text-white",
                badge: "FREE",
              },
            ].map((feature, i) => (
              <Card
                key={i}
                className="reveal animate-stagger border-4 border-foreground shadow-neo hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all relative overflow-hidden"
              >
                {feature.badge === "PRO" && (
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-yellow-400 text-black border-2 border-foreground font-black text-[10px] uppercase">
                      PRO
                    </Badge>
                  </div>
                )}
                <CardHeader className="p-8">
                  <div
                    className={`w-20 h-20 ${feature.color} border-4 border-foreground flex items-center justify-center mb-8 shadow-neo -rotate-5`}
                  >
                    <feature.icon className="h-10 w-10 stroke-3" />
                  </div>
                  <CardTitle className="text-3xl font-black uppercase tracking-tighter mb-4 italic">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-xl text-foreground font-bold leading-tight tracking-tight">
                    {feature.desc}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section className="py-32 border-b-8 border-foreground bg-accent/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 translate-y-[-50%] bg-primary text-white px-8 py-3 font-black text-2xl uppercase tracking-tighter rotate-2 z-20">
            PRECOS TRANSPARENTES
          </div>

          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter mb-4 italic">
              ESCOLHA SEU PLANO
            </h2>
            <p className="text-xl font-bold uppercase opacity-60">
              Comece gratis, publique sua pagina e evolua para o PRO quando quiser mais personalizacao e analytics.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto px-4">
            <div className="bg-white border-8 border-foreground shadow-neo p-10 flex flex-col hover:-rotate-1 transition-transform">
              <div className="mb-8">
                <h3 className="text-4xl font-black uppercase tracking-tighter mb-2">
                  GRATIS
                </h3>
                <div className="text-6xl font-black">
                  R$ 0<span className="text-lg opacity-40">/mes</span>
                </div>
              </div>
              <ul className="space-y-4 mb-12 flex-1">
                {[
                  "Ate 5 links",
                  "Templates Basicos",
                  "Personalizacao Essencial",
                  "Analytics Essencial",
                  "Marca Unilink Visivel",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 font-bold text-lg"
                  >
                    <CheckCircle className="w-6 h-6 text-emerald-500 stroke-3" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button
                variant="outline"
                className="h-16 text-xl font-black uppercase border-4 border-foreground shadow-neo group"
                asChild
              >
                <Link href="/sign-up">COMEÇAR GRATIS</Link>
              </Button>
            </div>

            <div className="bg-primary text-white border-8 border-foreground shadow-neo-lg p-10 flex flex-col relative rotate-2 hover:rotate-0 transition-transform">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-yellow-400 text-black px-6 py-2 border-4 border-foreground font-black uppercase text-sm shadow-neo z-10 animate-bounce">
                MAIS POPULAR
              </div>
              <div className="mb-8">
                <h3 className="text-4xl font-black uppercase tracking-tighter mb-2">
                  PRO
                </h3>
                <div className="text-6xl font-black">
                  R$ 10<span className="text-lg opacity-70">/mes</span>
                </div>
              </div>
              <ul className="space-y-4 mb-12 flex-1">
                {[
                  "Tudo do plano Gratis",
                  "Links Ilimitados",
                  "Templates Premium",
                  "Analytics Avancados",
                  "Remover Marca Unilink",
                  "Personalizacao Extra",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 font-bold text-lg"
                  >
                    <Zap className="w-6 h-6 text-yellow-400 fill-current" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button
                className="h-16 bg-white text-primary hover:bg-gray-100 text-xl font-black uppercase border-4 border-foreground shadow-neo"
                asChild
              >
                <Link href="/sign-up">QUERO SER PRO</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-32">
          <div className="flex flex-col md:flex-row items-center justify-between mb-20 gap-8">
            <h2 className="text-5xl lg:text-8xl font-black uppercase tracking-tighter italic">
              VIVA O IMPACTO
            </h2>
            <div className="bg-accent p-6 border-4 border-foreground shadow-neo rotate-3 hidden md:block">
              <Users className="w-12 h-12 text-white" />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                name: "Maria Santos",
                role: "Influencer Digital",
                quote:
                  "O Unilink mudou como apresento meus produtos. A pagina ficou mais bonita e muito mais facil de compartilhar.",
                avatarColor: "bg-emerald-400",
              },
              {
                name: "Carlos Lima",
                role: "Musico e Produtor",
                quote:
                  "Direto ao ponto. Consegui reunir meus principais links em uma pagina com cara de produto profissional.",
                avatarColor: "bg-red-400",
              },
              {
                name: "Ana Costa",
                role: "Content Creator",
                quote:
                  "A personalizacao e o diferencial. Minha pagina ficou com mais identidade sem complicar meu fluxo.",
                avatarColor: "bg-yellow-400",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="p-10 border-4 border-foreground bg-white shadow-neo hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all reveal animate-stagger-1"
              >
                <div
                  className={`w-14 h-14 ${t.avatarColor} border-4 border-foreground shadow-neo-sm mb-6 flex items-center justify-center font-black text-xl uppercase`}
                >
                  {t.name[0]}
                </div>
                <p className="text-xl font-bold italic mb-8 leading-tight">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="border-t-4 border-foreground pt-4">
                  <div className="font-black uppercase tracking-tighter text-xl">
                    {t.name}
                  </div>
                  <div className="text-xs opacity-60 font-black uppercase tracking-widest">
                    {t.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-32">
          <div className="bg-primary p-12 lg:p-32 border-8 border-foreground shadow-neo-lg text-center reveal relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none overflow-hidden">
              <div className="flex flex-wrap gap-4 rotate-12 -translate-x-1/2 -translate-y-1/2">
                {Array.from({ length: 100 }).map((_, i) => (
                  <Zap key={i} className="w-20 h-20 text-white fill-current" />
                ))}
              </div>
            </div>

            <Badge className="bg-white text-primary border-4 border-foreground font-black uppercase text-lg mb-8 px-8 py-2 relative z-10 shadow-neo">
              COMECE GRATIS EM POUCOS PASSOS
            </Badge>

            <h2 className="text-6xl lg:text-[10rem] text-white font-black uppercase leading-[0.8] mb-12 tracking-tighter italic relative z-10">
              PUBLIQUE SUA
              <br />
              PAGINA
            </h2>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 relative z-10">
              <Button
                size="lg"
                className="h-24 bg-yellow-400 text-black hover:bg-yellow-300 border-4 border-foreground shadow-neo-lg px-20 text-3xl font-black uppercase tracking-tighter"
                asChild
              >
                <Link href="/sign-up">CRIAR MEU PERFIL</Link>
              </Button>
              <div className="text-white font-black text-xl uppercase tracking-tighter opacity-80">
                Pronto para sair do zero sem complicacao
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
