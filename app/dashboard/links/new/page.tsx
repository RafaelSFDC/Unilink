import Link from "next/link";
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

export default function NewLinkPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <Button
          variant="outline"
          asChild
          className="mb-8 h-12 px-6 border-2 font-black uppercase shadow-neo-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
        >
          <Link href="/dashboard/links">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Voltar para Links
          </Link>
        </Button>

        <div className="p-8 bg-primary border-4 border-foreground shadow-neo-lg rotate-[-1deg] max-w-2xl">
          <h1 className="text-4xl font-black uppercase tracking-tighter text-white mb-2">
            Adicionar Novo Link
          </h1>
          <p className="text-white/80 font-bold text-lg uppercase tracking-tight">
            Crie um novo link para o seu perfil
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
              Preencha as informações do seu novo link
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LinkForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
