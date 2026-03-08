import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { checkSubscription } from "@/lib/subscription";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart3, Eye, MousePointer, TrendingUp, Zap } from "lucide-react";

async function getAnalyticsData(clerkId: string) {
  const user = await prisma.user.findUnique({
    where: { clerkId },
  });

  if (!user) return null;

  // Últimos 30 dias
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const analytics = await prisma.analytics.findMany({
    where: {
      userId: user.id,
      date: {
        gte: thirtyDaysAgo,
      },
    },
    orderBy: {
      date: "desc",
    },
  });

  // Agrupar analytics por data (mesmo dia)
  const groupedAnalytics = analytics.reduce(
    (acc, item) => {
      const dateKey = item.date.toDateString();
      if (!acc[dateKey]) {
        acc[dateKey] = {
          date: item.date,
          totalViews: 0,
          totalClicks: 0,
        };
      }
      acc[dateKey].totalViews += item.totalViews;
      acc[dateKey].totalClicks += item.totalClicks;
      return acc;
    },
    {} as Record<
      string,
      { date: Date; totalViews: number; totalClicks: number }
    >,
  );

  const dailyAnalytics = Object.values(groupedAnalytics).sort(
    (a, b) => b.date.getTime() - a.date.getTime(),
  );

  const totalViews = analytics.reduce((sum, day) => sum + day.totalViews, 0);
  const totalClicks = analytics.reduce((sum, day) => sum + day.totalClicks, 0);

  // Analytics por link
  const linkClicks = await prisma.click.groupBy({
    by: ["linkId"],
    where: {
      link: {
        userId: user.id,
      },
      clickedAt: {
        gte: thirtyDaysAgo,
      },
    },
    _count: {
      id: true,
    },
  });

  const topLinks = await Promise.all(
    linkClicks
      .sort((a, b) => b._count.id - a._count.id)
      .slice(0, 5)
      .map(async (item) => {
        const link = await prisma.link.findUnique({
          where: { id: item.linkId },
          select: { title: true, url: true },
        });
        return {
          title: link?.title || "Link removido",
          url: link?.url || "",
          clicks: item._count.id,
        };
      }),
  );

  return {
    totalViews,
    totalClicks,
    dailyAnalytics,
    topLinks,
  };
}

export default async function AnalyticsPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const data = await getAnalyticsData(userId);

  if (!data) {
    redirect("/onboarding");
  }

  const isPro = await checkSubscription();

  const clickRate =
    data.totalViews > 0
      ? ((data.totalClicks / data.totalViews) * 100).toFixed(1)
      : "0";

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 relative">
        <div className="p-8 bg-accent border-4 border-foreground shadow-neo-lg rotate-[-1deg]">
          <h1 className="text-5xl font-black uppercase tracking-tighter text-white mb-2">
            Analytics
          </h1>
          <p className="text-white font-bold text-lg uppercase tracking-tight">
            Acompanhe o desempenho do seu perfil nos últimos 30 dias
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card className="bg-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-bold uppercase text-white/80 tracking-widest">
              Visualizações
            </CardTitle>
            <Eye className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black text-white">
              {data.totalViews}
            </div>
            <p className="text-xs font-bold text-white/70 uppercase mt-1">
              Visitantes únicos no seu perfil
            </p>
          </CardContent>
        </Card>

        <Card className="bg-secondary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-bold uppercase text-foreground/80 tracking-widest">
              Cliques
            </CardTitle>
            <MousePointer className="h-4 w-4 text-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black text-foreground">
              {data.totalClicks}
            </div>
            <p className="text-xs font-bold text-foreground/70 uppercase mt-1">
              Total de cliques nos links
            </p>
          </CardContent>
        </Card>

        <Card className="bg-background">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-bold uppercase text-foreground/80 tracking-widest">
              Taxa de Clique
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black text-foreground">
              {clickRate}%
            </div>
            <p className="text-xs font-bold text-foreground/70 uppercase mt-1">
              Conversão de visitantes
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Links */}
        <div className="relative group">
          <Card
            className={`border-4 ${!isPro && "opacity-50 blur-[2px] pointer-events-none select-none"}`}
          >
            <CardHeader className="bg-muted border-b-4 border-foreground mb-4">
              <CardTitle className="flex items-center gap-4 text-2xl uppercase font-black">
                <BarChart3 className="h-6 w-6 text-primary" />
                Links Mais Clicados
              </CardTitle>
            </CardHeader>
            <CardContent>
              {data.topLinks.length === 0 ? (
                <div className="text-center py-12">
                  <BarChart3 className="h-20 w-20 mx-auto mb-4 opacity-10" />
                  <p className="font-bold uppercase opacity-50">
                    Nenhum clique registrado ainda
                  </p>
                </div>
              ) : (
                <div className="space-y-6 pt-4">
                  {data.topLinks.map((link, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border-2 border-foreground bg-background shadow-neo"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-black uppercase tracking-tight text-lg truncate">
                          {link.title}
                        </p>
                        <p className="text-xs font-bold opacity-60 truncate">
                          {link.url}
                        </p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <span className="inline-flex items-center px-4 py-1 border-2 border-foreground bg-primary text-white text-xs font-black uppercase shadow-neo">
                          {link.clicks} cliques
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          {!isPro && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center">
              <div className="bg-white border-4 border-foreground p-8 shadow-neo-lg rotate-[2deg]">
                <Zap className="h-12 w-12 text-primary mx-auto mb-4 fill-primary" />
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">
                  Recurso PRO
                </h3>
                <p className="font-bold uppercase text-xs mb-6 opacity-70">
                  Desbloqueie analytics detalhado por link
                </p>
                <a
                  href="/dashboard/billing"
                  className="inline-block bg-primary text-white font-black uppercase px-6 py-3 border-4 border-foreground shadow-neo hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                >
                  Assinar Agora
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="relative group">
          <Card
            className={`border-4 ${!isPro && "opacity-50 blur-[2px] pointer-events-none select-none"}`}
          >
            <CardHeader className="bg-muted border-b-4 border-foreground mb-4">
              <CardTitle className="flex items-center gap-4 text-2xl uppercase font-black">
                <Eye className="h-6 w-6 text-accent" />
                Atividade Recente
              </CardTitle>
            </CardHeader>
            <CardContent>
              {data.dailyAnalytics.length === 0 ? (
                <div className="text-center py-12">
                  <Eye className="h-20 w-20 mx-auto mb-4 opacity-10" />
                  <p className="font-bold uppercase opacity-50">
                    Nenhuma atividade registrada ainda
                  </p>
                </div>
              ) : (
                <div className="space-y-4 pt-4">
                  {data.dailyAnalytics.slice(0, 7).map((day) => (
                    <div
                      key={day.date.toISOString()}
                      className="flex items-center justify-between p-4 border-2 border-foreground bg-background shadow-neo"
                    >
                      <div>
                        <p className="font-black uppercase tracking-widest text-sm">
                          {day.date.toLocaleDateString("pt-BR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "2-digit",
                          })}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4 text-xs font-black uppercase">
                        <span className="bg-secondary border-2 border-foreground px-2 py-1 shadow-neo">
                          {day.totalViews} Vis.
                        </span>
                        <span className="bg-accent border-2 border-foreground px-2 py-1 text-white shadow-neo">
                          {day.totalClicks} Cliques
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          {!isPro && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center">
              <div className="bg-white border-4 border-foreground p-8 shadow-neo-lg rotate-[-2deg]">
                <BarChart3 className="h-12 w-12 text-accent mx-auto mb-4 fill-accent" />
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">
                  Relatórios PRO
                </h3>
                <p className="font-bold uppercase text-xs mb-6 opacity-70">
                  Acompanhe sua evolução diária detalhada
                </p>
                <a
                  href="/dashboard/billing"
                  className="inline-block bg-accent text-white font-black uppercase px-6 py-3 border-4 border-foreground shadow-neo hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                >
                  Ver Planos
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
