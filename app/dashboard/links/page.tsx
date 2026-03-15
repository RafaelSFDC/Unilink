import NextLink from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LinksList } from "@/components/links-list";
import { Plus, Link, Zap } from "lucide-react";
import { checkSubscription } from "@/lib/subscription";

async function getUserLinks(clerkId: string) {
  const user = await prisma.user.findUnique({
    where: { clerkId },
    include: {
      links: {
        orderBy: { order: "asc" },
      },
    },
  });

  return user;
}

export default async function LinksPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await getUserLinks(userId);

  if (!user) {
    redirect("/onboarding");
  }

  const isPro = await checkSubscription();

  const canAddLink = isPro || user.links.length < 5;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 relative">
        <div className="p-8 bg-secondary border-4 border-foreground shadow-neo-lg rotate-1 flex flex-col md:flex-row justify-between items-center gap-6 transition-all duration-100 hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none">
          <div>
            <h1 className="text-5xl font-black uppercase tracking-tighter mb-2">
              Meus Links
            </h1>
            <p className="text-foreground/80 font-bold text-lg uppercase tracking-tight">
              {isPro ? 'Links ilimitados e ordem livre para sua pagina' : `${user.links.length}/5 links utilizados no plano free`}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {!isPro && user.links.length >= 5 && (
              <Button asChild variant="destructive" className="h-14 px-8 text-lg bg-yellow-400 text-black hover:bg-yellow-500 border-4">
                <NextLink href="/dashboard/billing">
                  <Zap className="h-5 w-5 mr-2" />
                  Upgrade PRO
                </NextLink>
              </Button>
            )}
            
            <Button 
              asChild={canAddLink} 
              disabled={!canAddLink}
              className="h-14 px-8 text-lg"
            >
              {canAddLink ? (
                <NextLink href="/dashboard/links/new">
                  <Plus className="h-5 w-5 mr-2" />
                  Adicionar Link
                </NextLink>
              ) : (
                <span className="opacity-50 cursor-not-allowed flex items-center">
                  <Plus className="h-5 w-5 mr-2" />
                  Limite Atingido
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>

      {user.links.length === 0 ? (
        <Card className="text-center p-12 transition-all duration-100 hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none">
          <CardHeader>
            <Link className="h-20 w-20 text-muted-foreground mx-auto mb-6 opacity-20" />
            <CardTitle className="text-3xl font-black uppercase mb-4">
              Nenhum link ainda
            </CardTitle>
            <CardDescription className="text-lg font-bold text-muted-foreground mb-8">
              Comece adicionando seu primeiro link para publicar sua pagina e compartilhar com o mundo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="h-16 px-12 text-xl">
              <NextLink href="/dashboard/links/new">
                <Plus className="h-5 w-5 mr-2" />
                Adicionar Primeiro Link
              </NextLink>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <LinksList links={user.links} />
      )}
    </div>
  );
}
