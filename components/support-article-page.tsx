import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { SupportArticle } from "@/lib/support-content";

interface SupportArticlePageProps {
  article: SupportArticle;
  indexHref: "/help" | "/docs";
  indexLabel: string;
}

export function SupportArticlePage({
  article,
  indexHref,
  indexLabel,
}: SupportArticlePageProps) {
  return (
    <div className="space-y-12">
      <Button
        variant="outline"
        asChild
        className="h-12 px-6 border-2 font-black uppercase shadow-neo-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
      >
        <Link href={indexHref}>
          <ArrowLeft className="h-5 w-5 mr-2" />
          Voltar para {indexLabel}
        </Link>
      </Button>

      <section className="border-b-8 border-foreground pb-12">
        <div className="flex flex-wrap gap-4 items-center mb-6">
          <Badge className="bg-blue-400 text-white border-4 border-foreground shadow-neo font-black uppercase tracking-tighter text-sm">
            {article.category}
          </Badge>
          <div className="text-xs font-black uppercase tracking-[0.3em] opacity-60">
            {article.audienceLabel}
          </div>
        </div>
        <h1 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter italic mb-6">
          {article.title}
        </h1>
        <p className="text-xl font-bold uppercase tracking-tight opacity-75 max-w-4xl">
          {article.description}
        </p>
      </section>

      <Card className="border-4 border-foreground shadow-neo bg-white rounded-none">
        <CardContent className="p-10 space-y-8">
          {article.body.map((paragraph) => (
            <p
              key={paragraph}
              className="text-lg font-medium leading-relaxed text-foreground/85"
            >
              {paragraph}
            </p>
          ))}

          {article.bullets?.length ? (
            <div className="space-y-4">
              {article.bullets.map((bullet) => (
                <div
                  key={bullet}
                  className="flex items-center gap-4 border-2 border-foreground p-4 shadow-neo-sm"
                >
                  <div className="w-3 h-3 bg-primary rotate-45 shrink-0" />
                  <span className="font-black uppercase tracking-tight">
                    {bullet}
                  </span>
                </div>
              ))}
            </div>
          ) : null}
        </CardContent>
      </Card>

      {article.relatedLinks?.length ? (
        <section className="space-y-6">
          <h2 className="text-3xl font-black uppercase tracking-tighter italic">
            Links Relacionados
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {article.relatedLinks.map((item) => (
              <Button
                key={item.href}
                asChild
                variant="outline"
                className="justify-between h-16 px-6 border-4 border-foreground shadow-neo bg-white font-black uppercase tracking-tight"
              >
                <Link href={item.href}>
                  {item.label}
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
