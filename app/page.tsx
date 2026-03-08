import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  Link as LinkIcon,
  Users,
  BarChart3,
  Palette,
  Zap,
  Shield,
  Smartphone,
  Globe,
  Star,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Eye,
  MousePointer,
  Sparkles,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Header />

      {/* Hero Section */}
      <main className="container mx-auto px-4 relative z-10">
        <section className="py-20 lg:py-40 text-left border-b-4 border-foreground">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="reveal animate-stagger-1">
              <Badge variant="secondary" className="mb-6 px-4 py-2">
                <Star className="w-4 h-4 mr-2 fill-foreground" />
                10K+ CRIADORES CONFIAM
              </Badge>

              <h1 className="text-6xl sm:text-8xl lg:text-[8rem] leading-[0.9] mb-8">
                UNILINK
                <br />
                <span className="bg-primary text-primary-foreground px-4 shadow-neo-lg rotate-[-2deg] inline-block mt-4">
                  TUDO
                </span>
              </h1>

              <p className="text-2xl lg:text-3xl font-medium mb-12 max-w-2xl leading-tight">
                Crie sua página única. <br />
                Compartilhe sua identidade. <br />
                Domine suas estatísticas.
              </p>

              <div className="flex flex-wrap gap-6 items-center">
                <SignedOut>
                  <SignInButton mode="modal">
                    <Button size="lg" className="h-16 px-10 text-xl">
                      Começar Agora
                      <ArrowRight className="w-6 h-6 ml-2" />
                    </Button>
                  </SignInButton>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="h-16 px-10 text-xl"
                  >
                    <a href="/demo">
                      <Eye className="w-6 h-6 mr-2" />
                      Demo
                    </a>
                  </Button>
                </SignedOut>

                <SignedIn>
                  <Button size="lg" className="h-16 px-10 text-xl" asChild>
                    <a href="/dashboard">
                      Ir ao Painel
                      <ArrowRight className="w-6 h-6 ml-2" />
                    </a>
                  </Button>
                </SignedIn>
              </div>
            </div>

            <div className="hidden lg:block reveal animate-stagger-2">
              <div className="relative">
                <div className="absolute inset-0 bg-accent -rotate-6 shadow-neo-lg border-4 border-foreground" />
                <div className="relative bg-background p-8 border-4 border-foreground shadow-neo-lg">
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-12 border-2 border-foreground flex items-center px-4 font-bold bg-white shadow-neo"
                      >
                        Link Exemplo #{i}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-32 border-b-4 border-foreground">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                icon: LinkIcon,
                title: "Links Organizados",
                desc: "Gestão brutal de todos os seus destinos em um só lugar.",
                color: "bg-secondary",
              },
              {
                icon: Palette,
                title: "Personalização",
                desc: "Design sem regras. Cores, fontes e formas que gritam sua marca.",
                color: "bg-primary text-white",
              },
              {
                icon: BarChart3,
                title: "Analytics",
                desc: "Dados reais para decisões frias. Acompanhe cada clique.",
                color: "bg-accent",
              },
            ].map((feature, i) => (
              <Card key={i} className="reveal animate-stagger">
                <CardHeader>
                  <div
                    className={`w-16 h-16 ${feature.color} border-4 border-foreground flex items-center justify-center mb-6 shadow-neo`}
                  >
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription className="text-lg text-foreground/80">
                    {feature.desc}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-32">
          <h2 className="text-5xl lg:text-7xl mb-16 text-center">
            VOZES REAIS
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                name: "Maria Santos",
                role: "Influencer",
                quote:
                  "O Unilink é puro impacto. Minha audiência notou a mudança.",
              },
              {
                name: "Carlos Lima",
                role: "Músico",
                quote:
                  "Rápido, cru e eficiente. Exatamente o que eu precisava.",
              },
              {
                name: "Ana Costa",
                role: "Creator",
                quote: "O melhor analytics que já usei. Direto ao ponto.",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="p-8 border-4 border-foreground bg-white shadow-neo reveal animate-stagger-1"
              >
                <p className="text-xl italic mb-6 font-medium">"{t.quote}"</p>
                <div className="font-bold uppercase tracking-tighter">
                  {t.name}
                </div>
                <div className="text-sm opacity-60 font-bold">{t.role}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-32">
          <div className="bg-primary p-20 border-4 border-foreground shadow-neo-lg text-center reveal">
            <h2 className="text-6xl lg:text-9xl text-white mb-8">
              DOMINE AGORA
            </h2>
            <p className="text-2xl text-white/90 mb-12 max-w-2xl mx-auto font-bold">
              Não seja apenas mais um. Tenha um Unilink.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="h-20 px-16 text-2xl"
              asChild
            >
              <a href="/onboarding">CRIAR MEU PERFIL</a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
