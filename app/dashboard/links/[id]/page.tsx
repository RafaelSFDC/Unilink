import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LinkForm } from "@/components/link-form";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EditLinkPageProps {
  params: Promise<{ id: string }>;
}

async function getLink(linkId: string, clerkId: string) {
  const user = await prisma.user.findUnique({
    where: { clerkId },
  });

  if (!user) return null;

  const link = await prisma.link.findFirst({
    where: {
      id: linkId,
      userId: user.id,
    },
  });

  return link;
}

export default async function EditLinkPage({ params }: EditLinkPageProps) {
  const { userId } = await auth();
  const { id } = await params;

  if (!userId) {
    redirect("/sign-in");
  }

  const link = await getLink(id, userId);

  if (!link) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <Button
          variant="outline"
          asChild
          className="mb-8 h-12 px-6 border-2 font-black uppercase shadow-neo-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
        >
          <a href="/dashboard/links">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Voltar para Links
          </a>
        </Button>

        <div className="p-8 bg-secondary border-4 border-foreground shadow-neo-lg rotate-[1deg] max-w-2xl">
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">
            Editar Link
          </h1>
          <p className="text-foreground/80 font-bold text-lg uppercase tracking-tight">
            Atualize as informações do seu link
          </p>
        </div>
      </div>

      <div className="max-w-2xl">
        <Card className="border-4 pt-0">
          <CardHeader className="bg-muted border-b-4 border-foreground mb-6 p-6">
            <CardTitle className="text-2xl font-black uppercase">
              Informações do Link
            </CardTitle>
            <CardDescription className="text-xs font-black uppercase opacity-60">
              Edite as informações do seu link
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LinkForm link={link} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
