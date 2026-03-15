"use client";

import { useState } from "react";
import { Check, Zap, Star, Shield, CreditCard } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface BillingPageProps {
  isPro: boolean;
  billingProvider: "stripe" | "mercadopago" | "free";
  stripeCurrentPeriodEnd: string | null;
  isStripeConfigured: boolean;
  isMercadoPagoConfigured: boolean;
}

export default function BillingPage({
  isPro,
  billingProvider,
  stripeCurrentPeriodEnd,
  isStripeConfigured,
  isMercadoPagoConfigured,
}: BillingPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isMercadoPagoLoading, setIsMercadoPagoLoading] = useState(false);

  const renewalDate = stripeCurrentPeriodEnd
    ? new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "medium",
      }).format(new Date(stripeCurrentPeriodEnd))
    : null;

  const onSubscribeStripe = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/stripe/checkout");
      if (!response.ok) {
        throw new Error("stripe_checkout_failed");
      }
      const data = await response.json();

      if (!data.url) {
        throw new Error("stripe_url_missing");
      }

      window.location.href = data.url;
    } catch {
      toast.error("Algo deu errado com Stripe. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubscribeMercadoPago = async () => {
    try {
      setIsMercadoPagoLoading(true);
      const response = await fetch("/api/mercadopago/checkout");
      if (!response.ok) {
        throw new Error("mercadopago_checkout_failed");
      }
      const data = await response.json();

      if (!data.url) {
        throw new Error("mercadopago_url_missing");
      }

      window.location.href = data.url;
    } catch {
      toast.error("Algo deu errado com Mercado Pago. Tente novamente.");
    } finally {
      setIsMercadoPagoLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-12 p-8 lg:p-12 relative">
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
              <div className="font-bold opacity-80 uppercase text-xs">
                {billingProvider === "stripe"
                  ? renewalDate
                    ? `RENOVACAO VIA STRIPE EM ${renewalDate}`
                    : "GESTAO VIA STRIPE"
                  : "ATIVADO VIA MERCADO PAGO"}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-zinc-200 border-4 border-foreground shadow-neo p-6 flex items-center gap-4 -rotate-1">
            <Star className="w-10 h-10 text-foreground" />
            <div>
              <div className="font-black uppercase text-2xl tracking-tighter">PLANO FREE</div>
              <div className="font-bold opacity-80 uppercase text-xs">ATÉ 5 LINKS E BASE ESSENCIAL</div>
            </div>
          </div>
        )}
      </div>

      {!isStripeConfigured && !isMercadoPagoConfigured ? (
        <div className="border-4 border-red-600 bg-red-50 p-6 shadow-neo max-w-4xl">
          <h2 className="text-2xl font-black uppercase tracking-tighter text-red-700 mb-2">
            Billing indisponivel neste ambiente
          </h2>
          <p className="font-bold uppercase text-sm text-red-700/80">
            Nenhum provedor de pagamento esta configurado agora. Configure Stripe ou Mercado Pago para habilitar assinaturas reais.
          </p>
        </div>
      ) : null}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl">
        {/* Basic Card for Free Users or downgrade info */}
        <div className={`border-8 border-foreground p-10 flex flex-col ${!isPro ? "bg-white shadow-neo" : "bg-zinc-100 opacity-60 grayscale"}`}>
          <div className="mb-8">
            <h3 className="text-4xl font-black uppercase tracking-tighter mb-4 italic">GRÁTIS</h3>
            <div className="text-5xl font-black italic">R$ 0<span className="text-lg opacity-40 not-italic">/mês</span></div>
          </div>
          
          <ul className="space-y-4 mb-10 flex-1">
            {["Até 5 links", "Templates Básicos", "Personalização Essencial", "Analytics Essencial", "Marca Unilink Visível"].map((item, i) => (
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
            onClick={() => toast.info("Para cancelar, entre em contato ou gerencie no portal do Stripe.")}
          >
            {isPro ? "CANCELAR ASSINATURA" : "PLANO ATUAL"}
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
              "Links Ilimitados",
              "Templates Premium",
              "Analytics Avançados",
              "Remover Marca Unilink",
              "Mais Recursos de Personalização"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 font-bold text-lg">
                <Zap className={`h-6 w-6 fill-current ${isPro ? "text-yellow-400" : "text-primary"}`} />
                {item}
              </li>
            ))}
          </ul>

          <Button 
            className={`h-16 text-xl font-black uppercase border-4 border-foreground shadow-neo ${isPro ? "bg-white text-primary hover:bg-zinc-200" : "bg-primary text-white hover:bg-primary/90"}`}
            onClick={onSubscribeStripe}
            disabled={isLoading || !isStripeConfigured}
          >
            {!isStripeConfigured
              ? "STRIPE INDISPONIVEL"
              : isLoading
                ? "CARREGANDO..."
                : isPro && billingProvider === "stripe"
                  ? "GERENCIAR NO STRIPE"
                  : "ASSINAR COM STRIPE"}
          </Button>

          {!isPro && (
            <Button
              variant="outline"
              className="mt-4 h-14 text-lg font-black uppercase border-4 border-foreground shadow-neo"
              onClick={onSubscribeMercadoPago}
              disabled={isMercadoPagoLoading || !isMercadoPagoConfigured}
            >
              {!isMercadoPagoConfigured
                ? "MERCADO PAGO INDISPONIVEL"
                : isMercadoPagoLoading
                  ? "ABRINDO MERCADO PAGO..."
                  : "ALTERNATIVA VIA MERCADO PAGO"}
            </Button>
          )}
        </div>
      </div>

      <div className="border-4 border-foreground bg-muted p-6 shadow-neo max-w-4xl">
        <h2 className="text-2xl font-black uppercase tracking-tighter mb-2">
          Como o billing funciona hoje
        </h2>
        <p className="font-bold uppercase text-sm opacity-70 mb-4">
          Stripe e o fluxo principal. Mercado Pago entra como alternativa secundaria.
        </p>
        <ul className="space-y-2 text-sm font-bold uppercase opacity-80">
          <li>Stripe e o caminho padrao para checkout e gestao do plano.</li>
          <li>Mercado Pago pode promover para PRO, mas nao oferece portal equivalente nesta fase.</li>
          <li>O plano PRO libera templates premium, analytics avancados e personalizacao extra.</li>
        </ul>
      </div>

      {/* Trust Badges */}
      <div className="flex flex-wrap gap-8 pt-12">
        <div className="flex items-center gap-3 font-black uppercase text-sm opacity-60">
          <Shield className="w-5 h-5" /> PAGAMENTO 100% SEGURO
        </div>
        <div className="flex items-center gap-3 font-black uppercase text-sm opacity-60">
          <CreditCard className="w-5 h-5" /> STRIPE COMO FLUXO PRINCIPAL
        </div>
      </div>
    </div>
  );
}
