"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { SupportArticle } from "@/lib/support-content";

interface SupportIndexProps {
  articles: SupportArticle[];
  basePath: "/help" | "/docs";
  emptyTitle: string;
  emptyDescription: string;
}

export function SupportIndex({
  articles,
  basePath,
  emptyTitle,
  emptyDescription,
}: SupportIndexProps) {
  const [query, setQuery] = useState("");

  const filteredArticles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return articles;
    }

    return articles.filter((article) =>
      [article.title, article.description, article.category, article.audienceLabel]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [articles, query]);

  return (
    <div className="space-y-12">
      <div className="max-w-xl relative">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-foreground w-6 h-6 z-10 stroke-3" />
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="PESQUISAR..."
          className="pl-16 py-8 text-xl border-4 border-foreground shadow-neo rounded-none bg-white font-black uppercase tracking-tighter placeholder:text-foreground/30 focus:ring-0 focus:border-primary transition-all pr-8"
        />
      </div>

      {filteredArticles.length === 0 ? (
        <Card className="border-4 border-foreground shadow-neo bg-white rounded-none">
          <CardContent className="p-10">
            <h3 className="text-3xl font-black uppercase tracking-tighter italic mb-3">
              {emptyTitle}
            </h3>
            <p className="text-sm font-bold uppercase tracking-tight opacity-70">
              {emptyDescription}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {filteredArticles.map((article) => (
            <Card
              key={article.slug}
              className="border-4 border-foreground shadow-neo bg-white rounded-none hover:translate-x-1 hover:-translate-y-1 transition-transform"
            >
              <CardHeader className="p-8 border-b-4 border-foreground bg-gray-50">
                <div className="flex items-center justify-between gap-4">
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">
                    {article.category}
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] bg-yellow-200 border-2 border-foreground px-2 py-1 shadow-neo-sm">
                    {article.audienceLabel}
                  </div>
                </div>
                <CardTitle className="text-2xl font-black uppercase tracking-tighter italic">
                  {article.title}
                </CardTitle>
                <CardDescription className="text-sm font-bold uppercase tracking-tight opacity-70">
                  {article.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <Link
                  href={`${basePath}/${article.slug}`}
                  className="inline-flex items-center font-black uppercase tracking-widest text-primary italic underline decoration-4 underline-offset-4"
                >
                  Ler agora
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
