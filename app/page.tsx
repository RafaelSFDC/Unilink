import Link from "next/link";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  Users,
  BarChart3,
  Palette,
  Zap,
  ArrowRight,
  CheckCircle,
  MousePointer,
  Sparkles,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Header />

      {/* Hero Section */}
      <main className="container mx-auto px-4 relative z-10">
        <section className="py-24 lg:py-48 text-left border-b-8 border-foreground">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal animate-stagger-1">
              <Badge className="mb-8 px-6 py-2 bg-yellow-400 text-foreground border-4 border-foreground shadow-neo font-black uppercase tracking-tighter text-sm -rotate-1">
                <Sparkles className="w-4 h-4 mr-2 fill-current" />A PLATAFORMA
                #1 PARA CRIADORES BRUTAIS
              </Badge>

              <h1 className="text-7xl sm:text-8xl lg:text-[10rem] font-black leading-[0.8] mb-10 tracking-tighter uppercase italic">
                CRIE SEU
                <br />
                <span className="bg-primary text-white px-6 shadow-neo-lg rotate-2 inline-block mt-4 not-italic">
                  IMPÉRIO
                </span>
              </h1>

              <p className="text-2xl lg:text-3xl font-bold mb-14 max-w-2xl leading-[1.1] uppercase tracking-tighter opacity-80">
                Uma página única de alta performance. <br />
                Design Neo-Brutalista impactante. <br />
                Analytics real para quem quer crescer.
              </p>

              <div className="flex flex-wrap gap-8 items-center">
                <SignedOut>
                  <SignInButton mode="modal">
                    <Button
                      size="lg"
                      className="h-20 px-12 text-2xl font-black uppercase tracking-tighter border-4 border-foreground shadow-neo hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                    >
                      COMEÇAR AGORA
                      <ArrowRight className="w-8 h-8 ml-3 stroke-3" />
                    </Button>
                  </SignInButton>
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-accent border-4 border-foreground shadow-neo-sm flex items-center justify-center group-hover:rotate-12 transition-transform">
                      <Zap className="w-6 h-6 text-white fill-current" />
                    </div>
                    <span className="font-black uppercase tracking-tighter text-lg underline underline-offset-8 decoration-4 decoration-primary">
                      VER DEMO AO VIVO
                    </span>
                  </div>
                </SignedOut>

                <SignedIn>
                  <Button
                    size="lg"
                    className="h-20 px-12 text-2xl font-black uppercase tracking-tighter border-4 border-foreground shadow-neo hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                    asChild
                  >
                    <Link href="/dashboard">
                      MEU PAINEL
                      <ArrowRight className="w-8 h-8 ml-3 stroke-3" />
                    </Link>
                  </Button>
                </SignedIn>
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
                      { label: "MEUS CURSOS", color: "bg-emerald-400" },
                      { label: "YOUTUBE CHANNEL", color: "bg-red-400" },
                      { label: "NEWSLETTER PRO", color: "bg-yellow-400" },
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

        {/* Features Grid */}
        <section className="py-32 border-b-8 border-foreground relative">
          <div className="absolute top-0 left-0 -translate-y-1/2 bg-foreground text-background px-8 py-3 font-black text-2xl uppercase tracking-tighter -rotate-1">
            FEATURES BRUTAIS
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16 pt-12">
            {[
              {
                icon: Palette,
                title: "Templates Elite",
                desc: "Esqueça o básico. Nossos templates Neo-Brutalistas são desenhados para capturar atenção imediata.",
                color: "bg-emerald-400 text-black",
                badge: "PRO",
              },
              {
                icon: BarChart3,
                title: "Deep Analytics",
                desc: "De onde vêm? Quanto tempo ficam? Qual link converte mais? Dados crus para quem joga sério.",
                color: "bg-primary text-white",
                badge: "PRO",
              },
              {
                icon: MousePointer,
                title: "Links Sem Limite",
                desc: "Adicione quantos destinos quiser. Organize com drag-and-drop intuitivo em segundos.",
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

        {/* Pricing Section */}
        <section className="py-32 border-b-8 border-foreground bg-accent/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 translate-y-[-50%] bg-primary text-white px-8 py-3 font-black text-2xl uppercase tracking-tighter rotate-2 z-20">
            PREÇOS TRANSPARENTES
          </div>

          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter mb-4 italic">
              ESCOLHA SEU PLANO
            </h2>
            <p className="text-xl font-bold uppercase opacity-60">
              Sem taxas escondidas. Comece grátis ou voe com o PRO.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto px-4">
            {/* Free Plan */}
            <div className="bg-white border-8 border-foreground shadow-neo p-10 flex flex-col hover:-rotate-1 transition-transform">
              <div className="mb-8">
                <h3 className="text-4xl font-black uppercase tracking-tighter mb-2">
                  GRÁTIS
                </h3>
                <div className="text-6xl font-black">
                  R$ 0<span className="text-lg opacity-40">/mês</span>
                </div>
              </div>
              <ul className="space-y-4 mb-12 flex-1">
                {[
                  "Até 5 links",
                  "Templates Básicos",
                  "Analytics Essencial",
                  "QR Code Unilink",
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
                <Link href="/onboarding">COMEÇAR GRÁTIS</Link>
              </Button>
            </div>

            {/* PRO Plan */}
            <div className="bg-primary text-white border-8 border-foreground shadow-neo-lg p-10 flex flex-col relative rotate-2 hover:rotate-0 transition-transform">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-yellow-400 text-black px-6 py-2 border-4 border-foreground font-black uppercase text-sm shadow-neo z-10 animate-bounce">
                MAIS POPULAR
              </div>
              <div className="mb-8">
                <h3 className="text-4xl font-black uppercase tracking-tighter mb-2">
                  PRO
                </h3>
                <div className="text-6xl font-black">
                  R$ 10<span className="text-lg opacity-70">/mês</span>
                </div>
              </div>
              <ul className="space-y-4 mb-12 flex-1">
                {[
                  "Tudo do plano Grátis",
                  "Templates de Elite (PRO)",
                  "Deep Analytics Completo",
                  "Remover Logo Unilink",
                  "Suporte Prioritário",
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
                <Link href="/onboarding">QUERO SER PRO</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials */}
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
                  "O Unilink mudou como apresento meus produtos. O design brutalista converte muito mais que os antigos link-in-bios.",
                avatarColor: "bg-emerald-400",
              },
              {
                name: "Carlos Lima",
                role: "Músico & Produtor",
                quote:
                  "Direto ao ponto. Meus fãs amam a facilidade e eu amo ver de onde eles vêm com o Deep Analytics.",
                avatarColor: "bg-red-400",
              },
              {
                name: "Ana Costa",
                role: "Content Creator",
                quote:
                  "A personalização é o diferencial. Todo mundo pergunta onde fiz minha página. Sou PRO e recomendo!",
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

        {/* Final CTA */}
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
              COMECE GRÁTIS EM 30 SEGUNDOS
            </Badge>

            <h2 className="text-6xl lg:text-[10rem] text-white font-black uppercase leading-[0.8] mb-12 tracking-tighter italic relative z-10">
              DOMINE SEU
              <br />
              ESPAÇO
            </h2>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 relative z-10">
              <Button
                size="lg"
                className="h-24 bg-yellow-400 text-black hover:bg-yellow-300 border-4 border-foreground shadow-neo-lg px-20 text-3xl font-black uppercase tracking-tighter"
                asChild
              >
                <Link href="/onboarding">CRIAR MEU PERFIL</Link>
              </Button>
              <div className="text-white font-black text-xl uppercase tracking-tighter opacity-80">
                Junte-se a +10k criadores
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
