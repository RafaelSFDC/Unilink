import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Link, BarChart3, Palette, Eye, Zap } from "lucide-react";
import { checkSubscription } from "@/lib/subscription";

async function getUserData(clerkId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { clerkId },
      include: {
        links: {
          orderBy: { order: "asc" },
        },
        theme: true,
        _count: {
          select: {
            links: true,
          },
        },
      },
    });

    return user;
  } catch (error) {
    console.error("Erro ao conectar com o banco de dados:", error);
    return null;
  }
}

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await getUserData(userId);

  if (!user) {
    // Usuário não existe no banco ou erro de conexão, vamos para onboarding
    redirect("/onboarding");
  }

  let totalClicks = 0;
  try {
    totalClicks = await prisma.click.count({
      where: {
        link: {
          userId: user.id,
        },
      },
    });
  } catch (error) {
    console.error("Erro ao buscar cliques:", error);
    // totalClicks permanece 0 se houver erro
  }

  const isPro = await checkSubscription();

  return (
    <div className="container mx-auto px-4 py-12">
      {!isPro && (
        <div className="mb-8 bg-yellow-400 border-4 border-foreground p-6 shadow-neo rotate-[1deg] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-white p-3 border-4 border-foreground shadow-neo rotate-[-5deg]">
              <Zap className="h-8 w-8 text-yellow-500 fill-yellow-400" />
            </div>
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tighter">
                Faça o upgrade para o PRO
              </h2>
              <p className="font-bold text-xs uppercase opacity-80">
                Desbloqueie templates premium, analytics detalhado e muito mais!
              </p>
            </div>
          </div>
          <Button
            asChild
            className="bg-black text-white hover:bg-zinc-800 border-4 border-white shadow-neo-sm h-14 px-8 text-lg font-black uppercase whitespace-nowrap"
          >
            <a href="/dashboard/billing">Assinar por R$ 10</a>
          </Button>
        </div>
      )}

      <div className="mb-12 relative">
        <div className="p-8 bg-primary border-4 border-foreground shadow-neo-lg rotate-[-1deg]">
          <h1 className="text-5xl font-black uppercase tracking-tighter text-primary-foreground mb-2">
            Dashboard
          </h1>
          <p className="text-primary-foreground/90 font-bold text-lg uppercase tracking-tight">
            Gerencie seus links e domine suas estatísticas
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card className="bg-secondary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold opacity-80">
              Total de Links
            </CardTitle>
            <Link className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black">{user._count.links}</div>
          </CardContent>
        </Card>

        <Card className="bg-accent">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold opacity-80">
              Total de Cliques
            </CardTitle>
            <BarChart3 className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black">{totalClicks}</div>
          </CardContent>
        </Card>

        <Card className="bg-background">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold opacity-80">
              Perfil Público
            </CardTitle>
            <Eye className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black uppercase">
              {user.isPublic ? "Ativo" : "Inativo"}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <Card className="hover:translate-x-1 hover:translate-y-1 hover:shadow-neo transition-all duration-75">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Plus className="h-6 w-6 text-primary" />
              Adicionar Link
            </CardTitle>
            <CardDescription className="font-bold text-foreground/70 uppercase text-xs">
              Adicione um novo link ao seu perfil
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full h-14 text-xl">
              <a href="/dashboard/links/new">Criar Link</a>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:translate-x-1 hover:translate-y-1 hover:shadow-neo transition-all duration-75">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Palette className="h-6 w-6 text-secondary-foreground" />
              Customizar
            </CardTitle>
            <CardDescription className="font-bold text-foreground/70 uppercase text-xs">
              Customize o visual do seu perfil
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full h-14 text-xl">
              <a href="/dashboard/theme">Editar Tema</a>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:translate-x-1 hover:translate-y-1 hover:shadow-neo transition-all duration-75">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Eye className="h-6 w-6 text-accent" />
              Ver Perfil
            </CardTitle>
            <CardDescription className="font-bold text-foreground/70 uppercase text-xs">
              Veja como os outros visualizam você
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full h-14 text-xl">
              <a href={`/${user.username}`} target="_blank">
                Perfil Público
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Links */}
      <Card className="border-4">
        <CardHeader className="border-b-4 border-foreground mb-6 bg-muted">
          <CardTitle className="flex items-center gap-4 text-3xl">
            <Link className="h-8 w-8 text-primary" />
            Links Recentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          {user.links.length === 0 ? (
            <div className="text-center py-12">
              <Link className="h-20 w-20 text-muted-foreground mx-auto mb-6 opacity-20" />
              <h3 className="text-2xl font-black uppercase mb-4">
                Nenhum link ainda
              </h3>
              <p className="text-lg font-bold text-muted-foreground mb-8">
                COMECE ADICIONANDO SEU PRIMEIRO LINK
              </p>
              <Button asChild className="h-16 px-10 text-xl">
                <a href="/dashboard/links/new">Adicionar Primeiro Link</a>
              </Button>
            </div>
          ) : (
            <div className="space-y-6 pt-4">
              {user.links.slice(0, 5).map((link) => (
                <div
                  key={link.id}
                  className="flex items-center justify-between p-6 border-4 border-foreground bg-background shadow-neo"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-secondary border-2 border-foreground flex items-center justify-center shadow-neo">
                      <Link className="h-7 w-7 text-foreground" />
                    </div>
                    <div>
                      <h4 className="text-xl font-black uppercase tracking-tight">
                        {link.title}
                      </h4>
                      <p className="text-sm font-bold opacity-60">{link.url}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span
                      className={`px-4 py-1 text-sm font-black uppercase border-2 border-foreground shadow-neo ${
                        link.isActive
                          ? "bg-green-400 text-black"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {link.isActive ? "Ativo" : "Inativo"}
                    </span>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="h-10 px-6"
                    >
                      <a href={`/dashboard/links/${link.id}`}>Editar</a>
                    </Button>
                  </div>
                </div>
              ))}

              {user.links.length > 5 && (
                <div className="text-center pt-8 border-t-4 border-foreground mt-8">
                  <Button
                    asChild
                    variant="outline"
                    className="h-14 px-10 text-lg"
                  >
                    <a href="/dashboard/links">Ver Todos os Links</a>
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
