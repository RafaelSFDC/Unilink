import { auth } from "@clerk/nextjs/server";
import { checkSubscription } from "@/lib/subscription";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ThemeForm } from "@/components/theme-form";
import { Palette } from "lucide-react";

async function getUserData(clerkId: string) {
  const user = await prisma.user.findUnique({
    where: { clerkId },
    include: {
      theme: true,
      links: {
        where: { isActive: true },
        orderBy: { order: "asc" },
      },
    },
  });

  return user;
}

export default async function ThemePage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await getUserData(userId);

  if (!user) {
    redirect("/onboarding");
  }

  const isPro = await checkSubscription();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 relative">
        <div className="p-8 bg-accent border-4 border-foreground shadow-neo-lg -rotate-1 text-white">
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-2">
            Personalizar Tema
          </h1>
          <p className="font-bold text-lg uppercase tracking-tight opacity-90">
            Escolha o visual da sua pagina e refine sua identidade com templates e presets
          </p>
        </div>
      </div>

      <div className="max-w-7xl">
        <Card className="border-4 pt-0">
          <CardHeader className="bg-muted border-b-4 border-foreground mb-6 p-6">
            <CardTitle className="flex items-center gap-4 text-2xl uppercase font-black">
              <Palette className="h-6 w-6 text-primary" />
              Configurações de Tema
            </CardTitle>
            <CardDescription className="text-xs font-black uppercase opacity-60">
              Default e minimal ficam no free. Modern, vibrant, professional e creative fazem parte do pro.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ThemeForm user={user} isPro={isPro} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
