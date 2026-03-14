import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSubscription } from "@/lib/subscription";
import { getPostHogAnalytics } from "@/lib/posthog-api";
import { PostHogChart } from "@/components/analytics-chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, BarChart3, TrendingUp, Users, MousePointer, ExternalLink } from "lucide-react";

async function getInternalAnalytics(clerkId: string) {
  const user = await prisma.user.findUnique({
    where: { clerkId },
  });

  if (!user) return null;

  const totalViews = await prisma.analytics.aggregate({
    where: { userId: user.id },
    _sum: { totalViews: true },
  });

  const totalClicks = await prisma.click.count({
    where: { link: { userId: user.id } },
  });

  return {
    views: totalViews._sum.totalViews || 0,
    clicks: totalClicks,
  };
}

export default async function AnalyticsPage() {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    redirect("/sign-in");
  }

  const subscription = await getSubscription();
  const isPro = subscription?.isPro;

  const user = await prisma.user.findUnique({
    where: { clerkId },
    select: { username: true, id: true },
  });

  if (!user) {
    redirect("/onboarding");
  }

  const internalStats = await getInternalAnalytics(clerkId);

  // Se não for PRO, mostramos o bloqueador
  if (!isPro) {
    return (
      <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center">
        <div className="max-w-2xl w-full bg-yellow-400 border-8 border-foreground p-12 shadow-neo-lg text-center rotate-1">
          <div className="bg-white p-6 border-4 border-foreground shadow-neo w-fit mx-auto mb-8 -rotate-3">
            <Zap className="h-16 w-16 text-yellow-500 fill-yellow-400" />
          </div>
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-6">
            Recurso Exclusivo PRO
          </h1>
          <p className="text-xl font-bold mb-10 opacity-90 uppercase">
            Desbloqueie estatísticas detalhadas do PostHog, gráficos de tendências e veja exatamente como seu público interage com seu perfil.
          </p>
          <Button
            asChild
            className="h-20 px-12 text-2xl font-black uppercase bg-black text-white hover:bg-zinc-800 border-4 border-white shadow-neo"
          >
            <a href="/dashboard/billing">Assinar Agora por R$ 10/mês</a>
          </Button>
        </div>
      </div>
    );
  }

  const analyticsData = await getPostHogAnalytics(user.username);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 relative">
        <div className="p-8 bg-accent border-4 border-foreground shadow-neo-lg -rotate-1">
          <h1 className="text-5xl font-black uppercase tracking-tighter text-foreground mb-2 flex items-center gap-4">
            <BarChart3 className="h-12 w-12" />
            Analytics PRO
          </h1>
          <p className="text-foreground/90 font-bold text-lg uppercase tracking-tight">
            Dados em tempo real via PostHog para seu perfil: unilink.com/{user.username}
          </p>
        </div>
      </div>

      {/* Stats Cards (Misto de local e PostHog) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card className="bg-primary text-primary-foreground border-4 shadow-neo">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <Users className="h-4 w-4" />
              Total de Visualizações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-black tracking-tighter">
              {analyticsData?.totalViews || internalStats?.views || 0}
            </div>
            <p className="text-xs font-bold opacity-70 uppercase mt-2">
              Últimos 7 dias (PostHog)
            </p>
          </CardContent>
        </Card>

        <Card className="bg-secondary border-4 shadow-neo">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <MousePointer className="h-4 w-4" />
              Total de Cliques
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-black tracking-tighter">
              {internalStats?.clicks || 0}
            </div>
            <p className="text-xs font-bold opacity-70 uppercase mt-2">
              Acumulado no banco
            </p>
          </CardContent>
        </Card>

        <Card className="bg-background border-4 shadow-neo">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Taxa de Conversão
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-black tracking-tighter">
              {internalStats && internalStats.views > 0 
                ? `${((internalStats.clicks / internalStats.views) * 100).toFixed(1)}%`
                : "0%"}
            </div>
            <p className="text-xs font-bold opacity-70 uppercase mt-2">
              Conversão média
            </p>
          </CardContent>
        </Card>
      </div>

      {!analyticsData || analyticsData.views.length === 0 ? (
        <Card className="border-4 p-12 text-center bg-muted">
          <TrendingUp className="h-24 w-24 mx-auto mb-6 opacity-20" />
          <h2 className="text-3xl font-black uppercase mb-4">Sem dados de tendência</h2>
          <p className="text-lg font-bold opacity-60 uppercase">
            Aguardando primeiras interações via PostHog para gerar o gráfico de visualizações.
          </p>
        </Card>
      ) : (
        <div className="space-y-12">
          {/* Chart Section */}
          <div className="p-8 border-4 border-foreground bg-white shadow-neo">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 flex items-center justify-between">
              Visualizações Diárias (7 dias)
              <span className="text-xs p-2 bg-accent text-white border-2 border-foreground shadow-neo-sm">LIVES DATA</span>
            </h2>
            <PostHogChart data={analyticsData.views} />
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
             <Card className="flex-1 border-4 shadow-neo">
                <CardHeader>
                   <CardTitle className="uppercase font-black">Configuração do PostHog</CardTitle>
                   <CardDescription className="font-bold">Sua conta está integrada e recebendo eventos.</CardDescription>
                </CardHeader>
                <CardContent>
                   <p className="text-sm opacity-70 mb-4 font-medium italic">
                     * Os dados de clique por link continuam sendo processados localmente para garantir performance extrema em links curtos.
                   </p>
                   <Button variant="outline" className="border-2 font-black uppercase">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Ver no Painel PostHog
                   </Button>
                </CardContent>
             </Card>
          </div>
        </div>
      )}
    </div>
  );
}
