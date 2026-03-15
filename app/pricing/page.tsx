import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, Zap, Star, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-24 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="text-center max-w-3xl mx-auto mb-24 relative z-10">
          <Badge className="mb-6 bg-yellow-400 text-black border-4 border-foreground shadow-neo font-black uppercase text-sm -rotate-2">
            PLANOS E PREÇOS
          </Badge>
          <h1 className="text-6xl lg:text-8xl font-black uppercase tracking-tighter italic mb-8 leading-[0.9]">
            SUA PÁGINA DE <br />
            <span className="bg-primary text-white px-4 shadow-neo-lg inline-block rotate-1 mt-2">CRIADOR</span>
          </h1>
          <p className="text-2xl font-bold uppercase opacity-70 tracking-tighter">
            Comece grátis, publique sua presença digital e evolua para o PRO quando quiser mais design, personalização e analytics.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-24">
          {/* Free Plan */}
          <div className="bg-white border-8 border-foreground shadow-neo p-12 flex flex-col group hover:-rotate-1 transition-all">
            <div className="mb-12">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-4xl font-black uppercase tracking-tighter">GRÁTIS</h3>
                <Star className="w-8 h-8 text-foreground" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-7xl font-black italic">R$ 0</span>
                <span className="text-xl font-bold opacity-40 uppercase">/mês</span>
              </div>
              <p className="mt-4 font-bold text-lg opacity-60">Ideal para tirar sua página do papel e publicar seus links com rapidez.</p>
            </div>
            
            <ul className="space-y-6 mb-12 flex-1">
              {[
                "Até 5 links",
                "Templates Básicos",
                "Personalização Essencial",
                "Analytics Essencial",
                "Perfil Público por Username",
                "Marca Unilink Visível"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-xl font-bold">
                  <CheckCircle className="w-7 h-7 text-emerald-500 stroke-3 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <Button size="lg" className="h-20 text-2xl font-black uppercase border-4 border-foreground shadow-neo hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all" variant="outline" asChild>
              <Link href="/onboarding">COMEÇAR AGORA</Link>
            </Button>
          </div>

          {/* PRO Plan */}
          <div className="bg-primary text-white border-8 border-foreground shadow-neo-lg p-12 flex flex-col relative rotate-2 group hover:rotate-0 transition-all">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-yellow-400 text-black px-8 py-3 border-4 border-foreground font-black uppercase text-lg shadow-neo z-20 animate-pulse">
              RECOMENDADO
            </div>
            
            <div className="mb-12">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-4xl font-black uppercase tracking-tighter italic">PRO</h3>
                <Zap className="w-10 h-10 text-yellow-400 fill-current" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-7xl font-black italic">R$ 10</span>
                <span className="text-xl font-bold opacity-70 uppercase">/mês</span>
              </div>
              <p className="mt-4 font-bold text-lg opacity-80">Para criadores que querem mais controle visual, mais dados e uma presença mais premium.</p>
            </div>
            
            <ul className="space-y-6 mb-12 flex-1">
              {[
                "Tudo do plano Grátis",
                "Links Ilimitados",
                "Templates Premium",
                "Analytics Avançados",
                "Remover Marca Unilink",
                "Mais Recursos de Personalização"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-xl font-bold">
                  <Zap className="w-7 h-7 text-yellow-400 fill-current flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <Button size="lg" className="h-20 bg-white text-primary hover:bg-zinc-100 text-2xl font-black uppercase border-4 border-foreground shadow-neo hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all" asChild>
              <Link href="/onboarding">QUERO SER PRO</Link>
            </Button>
          </div>
        </div>

        {/* Feature Comparison or FAQ teaser */}
        <div className="max-w-4xl mx-auto text-center border-t-8 border-foreground pt-24">
          <h2 className="text-4xl font-black uppercase tracking-tighter italic mb-12">FICOU COM DÚVIDA?</h2>
          <div className="grid sm:grid-cols-2 gap-8 text-left">
            <div className="p-8 border-4 border-foreground shadow-neo bg-accent/5">
              <Shield className="w-10 h-10 mb-4 text-primary" />
              <h4 className="text-xl font-black uppercase mb-2">POSSO CANCELAR?</h4>
              <p className="font-bold opacity-70">Sim, a qualquer momento sem pegadinhas. Você mantém o PRO até o fim do período pago.</p>
            </div>
            <div className="p-8 border-4 border-foreground shadow-neo bg-accent/5 -rotate-2">
              <CheckCircle className="w-10 h-10 mb-4 text-emerald-500" />
              <h4 className="text-xl font-black uppercase mb-2">PAGAMENTO SEGURO?</h4>
              <p className="font-bold opacity-70">Usamos o Stripe, a mesma tecnologia de pagamento do Facebook e Amazon. Seus dados estão 100% seguros.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
