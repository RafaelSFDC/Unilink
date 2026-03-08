"use client";

import { useState } from "react";
import { Check, Zap } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Assinatura</h1>
        <p className="text-muted-foreground">
          Gerencie sua assinatura e plano do Unilink.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
        {/* Plano Grátis */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle>Plano Gratuito</CardTitle>
            <CardDescription>O essencial para começar.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="text-4xl font-bold mb-6">Grátis</div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                Links ilimitados
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Check className="h-4 w-4" />
                Tema padrão
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Check className="h-4 w-4" />
                Analytics básico
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" disabled={!isPro}>
              {isPro ? "Mudar para Grátis" : "Seu plano atual"}
            </Button>
          </CardFooter>
        </Card>

        {/* Plano PRO */}
        <Card
          className={`border-2 relative ${isPro ? "border-primary" : "border-zinc-800"}`}
        >
          {isPro && (
            <Badge className="absolute -top-3 right-4 px-3 py-1 bg-primary text-primary-foreground font-bold">
              ATIVO
            </Badge>
          )}
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                PRO <Zap className="h-4 w-4 fill-primary text-primary" />
              </CardTitle>
            </div>
            <CardDescription>
              Tudo o que você precisa para crescer.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="text-4xl font-bold mb-6">
              R$ 10
              <span className="text-lg font-normal text-muted-foreground">
                /mês
              </span>
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                Tudo do Grátis
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                Analytics detalhado (Fonte, Tempo, Cliques)
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                Temas e Templates Premium
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                Layouts customizados
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                Suporte prioritário
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full font-bold bg-primary hover:bg-primary/90"
              onClick={onSubscribe}
              disabled={isLoading}
            >
              {isPro ? "Gerenciar Assinatura" : "Assinar agora"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
