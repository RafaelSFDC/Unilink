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
import { SettingsForm } from "@/components/settings-form";
import { Settings, Link } from "lucide-react";

async function getUserData(clerkId: string) {
  const user = await prisma.user.findUnique({
    where: { clerkId },
  });

  return user;
}

export default async function SettingsPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await getUserData(userId);

  if (!user) {
    redirect("/onboarding");
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 relative">
        <div className="p-8 bg-secondary border-4 border-foreground shadow-neo-lg rotate-[1deg]">
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-2">
            Configurações
          </h1>
          <p className="text-foreground/80 font-bold text-lg uppercase tracking-tight">
            Gerencie as configurações do seu perfil
          </p>
        </div>
      </div>

      <div className="max-w-2xl space-y-10">
        <Card className="border-4">
          <CardHeader className="bg-muted border-b-4 border-foreground mb-6">
            <CardTitle className="flex items-center gap-4 text-2xl uppercase font-black">
              <Settings className="h-6 w-6 text-primary" />
              Informações do Perfil
            </CardTitle>
            <CardDescription className="text-xs font-black uppercase opacity-60">
              Atualize suas informações pessoais
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SettingsForm user={user} />
          </CardContent>
        </Card>

        <Card className="border-4">
          <CardHeader className="bg-muted border-b-4 border-foreground mb-6">
            <CardTitle className="flex items-center gap-4 text-2xl uppercase font-black">
              <Link className="h-6 w-6 text-accent" />
              Link do Perfil
            </CardTitle>
            <CardDescription className="text-xs font-black uppercase opacity-60">
              Seu perfil público está disponível em:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-background border-4 border-foreground shadow-neo p-6 mb-8 rotate-[-1deg]">
              <code className="text-lg font-black break-all text-primary uppercase">
                {process.env.NODE_ENV === "production"
                  ? `unilink.com/${user.username}`
                  : `localhost:3000/${user.username}`}
              </code>
            </div>
            <div className="space-y-4 bg-muted border-2 border-dashed border-foreground p-6">
              <p className="text-sm font-black uppercase flex justify-between items-center border-b border-foreground/10 pb-2">
                <span className="opacity-50">Nome exibido:</span>
                <span>
                  {user.firstName} {user.lastName}
                </span>
              </p>
              {user.title && (
                <p className="text-sm font-black uppercase flex justify-between items-center">
                  <span className="opacity-50">Título:</span>
                  <span>{user.title}</span>
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
