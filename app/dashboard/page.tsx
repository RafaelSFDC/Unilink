import NextLink from "next/link";
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
        <div className="mb-8 bg-yellow-400 border-4 border-foreground p-6 shadow-neo rotate-1 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-100 hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none">
          <div className="flex items-center gap-4">
            <div className="bg-white p-3 border-4 border-foreground shadow-neo rotate-[-5deg] transition-transform duration-100 hover:rotate-0">
              <Zap className="h-8 w-8 text-yellow-500 fill-yellow-400" />
            </div>
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tighter">
                Faça o upgrade para o PRO
              </h2>
              <p className="font-bold text-xs uppercase opacity-80">
                Desbloqueie links ilimitados, templates premium e analytics avancados.
              </p>
            </div>
          </div>
          <Button
            asChild
            className="bg-black text-white hover:bg-zinc-800 border-4 border-white shadow-neo-sm h-14 px-8 text-lg font-black uppercase whitespace-nowrap"
          >
            <NextLink href="/dashboard/billing">Assinar por R$ 10/mês</NextLink>
          </Button>
        </div>
      )}

      <div className="mb-12 relative">
        <div className="p-8 bg-primary border-4 border-foreground shadow-neo-lg -rotate-1">
          <h1 className="text-5xl font-black uppercase tracking-tighter text-primary-foreground mb-2">
            Dashboard
          </h1>
          <p className="text-primary-foreground/90 font-bold text-lg uppercase tracking-tight">
            Gerencie seus links, publique sua pagina e acompanhe seu crescimento
          </p>
          <p className="mt-4 text-sm font-bold uppercase tracking-wide text-primary-foreground/70 break-all">
            Perfil publico: /{user.username}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card className="group bg-secondary transition-all duration-100 hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold opacity-80">
              Total de Links
            </CardTitle>
            <Link className="h-4 w-4 transition-transform duration-100 group-hover:rotate-6" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black">{user._count.links}</div>
          </CardContent>
        </Card>

        <Card className="group bg-accent transition-all duration-100 hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold opacity-80">
              Total de Cliques
            </CardTitle>
            <BarChart3 className="h-4 w-4 transition-transform duration-100 group-hover:scale-110" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black">{totalClicks}</div>
          </CardContent>
        </Card>

        <Card className="group bg-background transition-all duration-100 hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold opacity-80">
              Perfil Público
            </CardTitle>
            <Eye className="h-4 w-4 transition-transform duration-100 group-hover:scale-110" />
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
        <Card className="group hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-75">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Plus className="h-6 w-6 text-primary transition-transform duration-100 group-hover:rotate-90" />
              Adicionar Link
            </CardTitle>
            <CardDescription className="font-bold text-foreground/70 uppercase text-xs">
              Adicione seus destinos principais e coloque a pagina no ar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full h-14 text-xl">
              <NextLink href="/dashboard/links/new">Criar Link</NextLink>
            </Button>
          </CardContent>
        </Card>

        <Card className="group hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-75">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Palette className="h-6 w-6 text-secondary-foreground transition-transform duration-100 group-hover:rotate-12" />
              Customizar
            </CardTitle>
            <CardDescription className="font-bold text-foreground/70 uppercase text-xs">
              Escolha o visual da pagina e refine sua identidade
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full h-14 text-xl">
              <NextLink href="/dashboard/theme">Editar Tema</NextLink>
            </Button>
          </CardContent>
        </Card>

        <Card className="group hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-75">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Eye className="h-6 w-6 text-accent transition-transform duration-100 group-hover:scale-110" />
              Ver Perfil
            </CardTitle>
            <CardDescription className="font-bold text-foreground/70 uppercase text-xs">
              Abra sua pagina publica e confira o resultado final
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full h-14 text-xl">
              <NextLink href={`/${user.username}`} target="_blank">
                Perfil Público
              </NextLink>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Links */}
      <Card className="border-4 pt-0">
        <CardHeader className="border-b-4 border-foreground mb-6 bg-muted p-6">
          <CardTitle className="flex items-center gap-4 text-3xl">
            <Link className="h-8 w-8 text-primary" />
            Links Recentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          {user.links.length === 0 ? (
            <div className="text-center py-12 space-y-6">
              <Link className="h-20 w-20 text-muted-foreground mx-auto mb-6 opacity-20" />
              <h3 className="text-2xl font-black uppercase mb-4">
                Nenhum link ainda
              </h3>
              <p className="text-lg font-bold text-muted-foreground mb-8">
                ADICIONE SEU PRIMEIRO LINK PARA COLOCAR SUA PAGINA NO AR
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild className="h-16 px-10 text-xl">
                  <NextLink href="/dashboard/links/new">Adicionar Primeiro Link</NextLink>
                </Button>
                <Button asChild variant="outline" className="h-16 px-10 text-xl">
                  <NextLink href="/dashboard/theme">Escolher Visual</NextLink>
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6 pt-4">
              {user.links.slice(0, 5).map((link) => (
                <div
                  key={link.id}
                  className="group flex items-center justify-between p-6 border-4 border-foreground bg-background shadow-neo transition-all duration-100 hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-secondary border-2 border-foreground flex items-center justify-center shadow-neo transition-transform duration-100 group-hover:-rotate-3">
                      <Link className="h-7 w-7 text-foreground transition-transform duration-100 group-hover:scale-110" />
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
                      <NextLink href={`/dashboard/links/${link.id}`}>Editar</NextLink>
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
                    <NextLink href="/dashboard/links">Ver Todos os Links</NextLink>
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
