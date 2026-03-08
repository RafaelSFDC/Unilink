"use client";

import { useState } from "react";
import { Check, Zap, Star, Shield, CreditCard } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface BillingPageProps {
  isPro: boolean;
}

export default function BillingPage({ isPro }: BillingPageProps) {
  const [isLoading, setIsLoading] = useState(false);

  const onSubscribe = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/stripe/checkout");
      const data = await response.json();

      window.location.href = data.url;
    } catch (error) {
      toast.error("Algo deu errado. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-12 p-8 lg:p-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-8 border-foreground pb-12">
        <div>
          <Badge className="mb-4 bg-primary text-white border-4 border-foreground shadow-neo font-black uppercase text-sm">
            ASSINATURA E PLANOS
          </Badge>
          <h1 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter italic">
            GERENCIE SEU <br />
            <span className="bg-yellow-400 text-black px-4 shadow-neo-lg inline-block -rotate-1 mt-2">STATUS</span>
          </h1>
        </div>
        
        {isPro ? (
          <div className="bg-emerald-400 border-4 border-foreground shadow-neo p-6 flex items-center gap-4 rotate-2">
            <Zap className="w-10 h-10 text-white fill-current" />
            <div>
              <div className="font-black uppercase text-2xl tracking-tighter">PLANO PRO ATIVO</div>
              <div className="font-bold opacity-80 uppercase text-xs">STATUS: EM DIA</div>
            </div>
          </div>
        ) : (
          <div className="bg-zinc-200 border-4 border-foreground shadow-neo p-6 flex items-center gap-4 -rotate-1">
            <Star className="w-10 h-10 text-foreground" />
            <div>
              <div className="font-black uppercase text-2xl tracking-tighter">PLANO FREE</div>
              <div className="font-bold opacity-80 uppercase text-xs">LIMITE DE 5 LINKS</div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl">
        {/* Basic Card for Free Users or downgrade info */}
        <div className={`border-8 border-foreground p-10 flex flex-col ${!isPro ? "bg-white shadow-neo" : "bg-zinc-100 opacity-60 grayscale"}`}>
          <div className="mb-8">
            <h3 className="text-4xl font-black uppercase tracking-tighter mb-4 italic">GRÁTIS</h3>
            <div className="text-5xl font-black italic">R$ 0<span className="text-lg opacity-40 not-italic">/mês</span></div>
          </div>
          
          <ul className="space-y-4 mb-10 flex-1">
            {["Links Ilimitados", "Temas Básicos", "Analytics Essencial", "QR Code Unilink"].map((item, i) => (
              <li key={i} className="flex items-center gap-3 font-bold text-lg">
                <Check className="h-6 w-6 text-emerald-500 stroke-[4px]" />
                {item}
              </li>
            ))}
          </ul>

          <Button 
            variant="outline" 
            className="h-16 text-xl font-black uppercase border-4 border-foreground shadow-neo"
            disabled={!isPro}
            onClick={isPro ? onSubscribe : undefined}
          >
            {isPro ? "MUDAR PARA GRÁTIS" : "PLANO ATUAL"}
          </Button>
        </div>

        {/* PRO Card */}
        <div className={`border-8 border-foreground p-10 flex flex-col relative ${isPro ? "bg-primary text-white shadow-neo-lg rotate-1" : "bg-white shadow-neo hover:rotate-1 transition-transform"}`}>
          {!isPro && (
             <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-yellow-400 text-black px-6 py-2 border-4 border-foreground font-black uppercase text-sm shadow-neo z-10 animate-bounce">
                MAIS POPULAR
             </div>
          )}
          
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <h3 className="text-4xl font-black uppercase tracking-tighter mb-4 italic">UNILINK PRO</h3>
              <Zap className={`h-10 w-10 fill-current ${isPro ? "text-yellow-400" : "text-primary"}`} />
            </div>
            <div className="text-5xl font-black italic">R$ 10<span className={`text-lg opacity-60 not-italic ${isPro ? "text-white" : "text-black"}`}>/mês</span></div>
          </div>
          
          <ul className="space-y-4 mb-10 flex-1">
            {[
              "Templates de Elite (PRO)",
              "Deep Analytics (Fontes & Cliques)",
              "Remover Marca Unilink",
              "SEO Otimizado & Pixels",
              "Suporte Prioritário VIP"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 font-bold text-lg">
                <Zap className={`h-6 w-6 fill-current ${isPro ? "text-yellow-400" : "text-primary"}`} />
                {item}
              </li>
            ))}
          </ul>

          <Button 
            className={`h-16 text-xl font-black uppercase border-4 border-foreground shadow-neo ${isPro ? "bg-white text-primary hover:bg-zinc-200" : "bg-primary text-white hover:bg-primary/90"}`}
            onClick={onSubscribe}
            disabled={isLoading}
          >
            {isLoading ? "CARREGANDO..." : isPro ? "GERENCIAR ASSINATURA" : "ASSINE AGORA"}
          </Button>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="flex flex-wrap gap-8 pt-12">
        <div className="flex items-center gap-3 font-black uppercase text-sm opacity-60">
          <Shield className="w-5 h-5" /> PAGAMENTO 100% SEGURO
        </div>
        <div className="flex items-center gap-3 font-black uppercase text-sm opacity-60">
          <CreditCard className="w-5 h-5" /> CANCELAMENTO INSTANTÂNEO
        </div>
      </div>
    </div>
  );
}
