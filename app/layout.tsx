import type { Metadata } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ptBR } from "@clerk/localizations";
import { Toaster } from "@/components/ui/sonner";
import { PostHogProvider } from "@/components/providers/posthog-provider";
import PostHogPageView from "@/components/providers/posthog-pageview";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Unilink - Seu link único para tudo",
  description: "Crie sua página de links personalizada com Unilink",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={ptBR}>
      <html lang="pt-BR">
        <body
          className={`${bricolage.variable} ${plusJakarta.variable} font-jakarta antialiased`}
        >
          <PostHogProvider>
            <PostHogPageView />
            {children}
            <Toaster />
          </PostHogProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
