import Link from "next/link";
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

  const last30Days = new Date();
  last30Days.setDate(last30Days.getDate() - 30);

  const totalViews = await prisma.analytics.aggregate({
    where: { userId: user.id },
    _sum: { totalViews: true },
  });

  const totalClicks = await prisma.click.count({
    where: { link: { userId: user.id } },
  });

  const viewsLast30Days = await prisma.analytics.aggregate({
    where: {
      userId: user.id,
      date: {
        gte: last30Days,
      },
    },
    _sum: { totalViews: true },
  });

  const clicksLast30Days = await prisma.click.count({
    where: {
      link: { userId: user.id },
      clickedAt: {
        gte: last30Days,
      },
    },
  });

  return {
    allTimeViews: totalViews._sum.totalViews || 0,
    allTimeClicks: totalClicks,
    viewsLast30Days: viewsLast30Days._sum.totalViews || 0,
    clicksLast30Days,
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
        <div className="max-w-2xl w-full bg-yellow-400 border-8 border-foreground p-12 shadow-neo-lg text-center rotate-1 transition-all duration-100 hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none">
          <div className="bg-white p-6 border-4 border-foreground shadow-neo w-fit mx-auto mb-8 -rotate-3 transition-transform duration-100 hover:rotate-0">
            <Zap className="h-16 w-16 text-yellow-500 fill-yellow-400" />
          </div>
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-6">
            Recurso Exclusivo PRO
          </h1>
          <p className="text-xl font-bold mb-10 opacity-90 uppercase">
            Desbloqueie analytics avançados, tendências de visualização e uma leitura mais clara de como seu público interage com seu perfil.
          </p>
          <Button
            asChild
            className="h-20 px-12 text-2xl font-black uppercase bg-black text-white hover:bg-zinc-800 border-4 border-white shadow-neo"
          >
            <Link href="/dashboard/billing">Assinar Agora por R$ 10/mês</Link>
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
            Leitura clara da sua performance separando tendencias do PostHog e metricas internas: unilink.com/{user.username}
          </p>
        </div>
      </div>

      <div className="space-y-12">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="bg-primary text-white border-4 border-foreground shadow-neo px-4 py-2 font-black uppercase text-sm">
              Tendencias via PostHog
            </div>
            <p className="text-sm font-bold uppercase opacity-60">
              Janela de 7 dias para entender ritmo de visualizacao
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="group bg-primary text-primary-foreground border-4 shadow-neo transition-all duration-100 hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                  <Users className="h-4 w-4 transition-transform duration-100 group-hover:scale-110" />
                  Views de Tendencia
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-black tracking-tighter">
                  {analyticsData?.totalViews || 0}
                </div>
                <p className="text-xs font-bold opacity-70 uppercase mt-2">
                  Fonte: PostHog | Periodo: ultimos 7 dias
                </p>
              </CardContent>
            </Card>

            <Card className="border-4 shadow-neo transition-all duration-100 hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none">
              <CardHeader>
                <CardTitle className="uppercase font-black">
                  Resumo Interpretativo
                </CardTitle>
                <CardDescription className="font-bold">
                  Use este bloco para ler tendencia e volume sem confundir com a base local.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium leading-relaxed opacity-80">
                  O PostHog mostra como seu perfil evoluiu em visualizacoes recentes. Ele serve para leitura de tendencia, nao para comparar diretamente com cliques acumulados do banco local.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="bg-secondary border-4 border-foreground shadow-neo px-4 py-2 font-black uppercase text-sm">
              Metricas internas
            </div>
            <p className="text-sm font-bold uppercase opacity-60">
              Dados locais para cliques, views agregadas e conversao compativel
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="group bg-secondary border-4 shadow-neo transition-all duration-100 hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                  <Users className="h-4 w-4 transition-transform duration-100 group-hover:scale-110" />
                  Views Internas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-black tracking-tighter">
                  {internalStats?.viewsLast30Days || 0}
                </div>
                <p className="text-xs font-bold opacity-70 uppercase mt-2">
                  Fonte: banco local | Periodo: ultimos 30 dias
                </p>
              </CardContent>
            </Card>

            <Card className="group bg-background border-4 shadow-neo transition-all duration-100 hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                  <MousePointer className="h-4 w-4 transition-transform duration-100 group-hover:scale-110" />
                  Cliques 30d
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-black tracking-tighter">
                  {internalStats?.clicksLast30Days || 0}
                </div>
                <p className="text-xs font-bold opacity-70 uppercase mt-2">
                  Fonte: banco local | Periodo: ultimos 30 dias
                </p>
              </CardContent>
            </Card>

            <Card className="group bg-background border-4 shadow-neo transition-all duration-100 hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                  <MousePointer className="h-4 w-4 transition-transform duration-100 group-hover:scale-110" />
                  Cliques Totais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-black tracking-tighter">
                  {internalStats?.allTimeClicks || 0}
                </div>
                <p className="text-xs font-bold opacity-70 uppercase mt-2">
                  Fonte: banco local | Periodo: acumulado
                </p>
              </CardContent>
            </Card>

            <Card className="group bg-background border-4 shadow-neo transition-all duration-100 hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 transition-transform duration-100 group-hover:-rotate-6" />
                  Conversao 30d
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-black tracking-tighter">
                  {internalStats && internalStats.viewsLast30Days > 0
                    ? `${((internalStats.clicksLast30Days / internalStats.viewsLast30Days) * 100).toFixed(1)}%`
                    : "N/D"}
                </div>
                <p className="text-xs font-bold opacity-70 uppercase mt-2">
                  Fonte: banco local | Base: views e cliques dos ultimos 30 dias
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {!analyticsData || analyticsData.views.length === 0 ? (
        <Card className="border-4 p-12 text-center bg-muted">
          <TrendingUp className="h-24 w-24 mx-auto mb-6 opacity-20" />
          <h2 className="text-3xl font-black uppercase mb-4">Sem dados de tendência</h2>
          <p className="text-lg font-bold opacity-60 uppercase">
            Aguardando primeiras interacoes via PostHog para gerar o grafico de tendencias.
          </p>
        </Card>
      ) : (
        <div className="space-y-12">
          {/* Chart Section */}
          <div className="p-8 border-4 border-foreground bg-white shadow-neo transition-all duration-100 hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 flex items-center justify-between">
              Visualizações Diárias (7 dias)
              <span className="text-xs p-2 bg-accent text-white border-2 border-foreground shadow-neo-sm">LIVES DATA</span>
            </h2>
            <PostHogChart data={analyticsData.views} />
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
             <Card className="flex-1 border-4 shadow-neo transition-all duration-100 hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none">
                <CardHeader>
                   <CardTitle className="uppercase font-black">Configuração do PostHog</CardTitle>
                   <CardDescription className="font-bold">Sua conta esta integrada e esta tela separa o que vem do PostHog do que vem do banco local.</CardDescription>
                </CardHeader>
                <CardContent>
                   <p className="text-sm opacity-70 mb-4 font-medium italic">
                     * Tendencia de views vem do PostHog em 7 dias. Cliques, views internas agregadas e conversao usam apenas a base local compativel.
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
