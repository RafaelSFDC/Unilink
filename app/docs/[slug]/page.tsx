import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SupportArticlePage } from "@/components/support-article-page";
import { docsArticles, getDocsArticle } from "@/lib/support-content";

interface DocsArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return docsArticles.map((article) => ({ slug: article.slug }));
}

export default async function DocsArticlePage({ params }: DocsArticlePageProps) {
  const { slug } = await params;
  const article = getDocsArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <SupportArticlePage article={article} indexHref="/docs" indexLabel="docs" />
      </main>
      <Footer />
    </div>
  );
}
