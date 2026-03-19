import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SupportArticlePage } from "@/components/support-article-page";
import { getHelpArticle, helpArticles } from "@/lib/support-content";

interface HelpArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return helpArticles.map((article) => ({ slug: article.slug }));
}

export default async function HelpArticlePage({ params }: HelpArticlePageProps) {
  const { slug } = await params;
  const article = getHelpArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <SupportArticlePage article={article} indexHref="/help" indexLabel="ajuda" />
      </main>
      <Footer />
    </div>
  );
}
