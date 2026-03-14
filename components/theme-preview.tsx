"use client";

import { useDeferredValue } from "react";
import dynamic from "next/dynamic";
import { Monitor, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { resolveTheme, type ThemeSettings } from "@/lib/theme";

const ProfilePage = dynamic(
  () => import("@/components/profile-page").then((mod) => mod.ProfilePage),
  { ssr: false },
);

interface PreviewUser {
  id: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string | null;
  bio: string | null;
  title: string | null;
  links: Array<{
    id: string;
    title: string;
    url: string;
    description: string | null;
    icon: string | null;
    order: number;
  }>;
  theme: Partial<ThemeSettings> | Record<string, unknown> | null;
  isPro?: boolean;
}

interface ThemePreviewProps {
  user: PreviewUser;
  theme: ThemeSettings;
}

const FALLBACK_LINKS = [
  {
    id: "preview-portfolio",
    title: "Meu Portfolio",
    url: "#",
    description: "Projeto em destaque",
    icon: "🚀",
    order: 0,
  },
  {
    id: "preview-instagram",
    title: "Instagram",
    url: "#",
    description: "Bastidores e novidades",
    icon: "📸",
    order: 1,
  },
  {
    id: "preview-contact",
    title: "Contato",
    url: "#",
    description: "Vamos conversar",
    icon: "💌",
    order: 2,
  },
];

export function ThemePreview({ user, theme }: ThemePreviewProps) {
  const deferredTheme = useDeferredValue(theme);
  const previewUser = {
    ...user,
    links: user.links.length ? user.links.slice(0, 5) : FALLBACK_LINKS,
    theme: resolveTheme(deferredTheme),
    bio:
      user.bio ||
      "Designer e criador digital. Construindo uma presença forte com personalidade.",
    title: user.title || "Creative Technologist",
  };

  return (
    <>
      <div className="xl:hidden">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              type="button"
              variant="outline"
              className="w-full h-14 text-base font-black uppercase"
            >
              <Smartphone className="mr-2 h-5 w-5" />
              Ver Preview Mobile
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[min(100vw-1rem,28rem)] border-4 border-foreground p-0 shadow-neo-lg">
            <DialogHeader className="border-b-4 border-foreground bg-muted px-6 py-5">
              <DialogTitle className="text-2xl font-black uppercase">
                Preview Mobile
              </DialogTitle>
              <DialogDescription className="text-xs font-bold uppercase opacity-70">
                Veja como o perfil vai ficar no celular.
              </DialogDescription>
            </DialogHeader>
            <div className="bg-background p-4">
              <PreviewFrame user={previewUser} viewport="mobile" />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <aside className="hidden xl:block">
        <div className="sticky top-24 space-y-5">
          <div className="border-4 border-foreground bg-secondary p-5 shadow-neo rotate-[0.5deg]">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center border-4 border-foreground bg-background shadow-neo-sm">
                <Monitor className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-black uppercase tracking-tight">
                  Preview Desktop
                </h3>
                <p className="text-xs font-bold uppercase opacity-70">
                  Atualiza enquanto voce edita.
                </p>
              </div>
            </div>
          </div>
          <PreviewFrame user={previewUser} viewport="desktop" />
        </div>
      </aside>
    </>
  );
}

function PreviewFrame({
  user,
  viewport,
}: {
  user: PreviewUser;
  viewport: "desktop" | "mobile";
}) {
  const isDesktop = viewport === "desktop";

  return (
    <div className="border-4 border-foreground bg-[#d9d4cb] shadow-neo-lg">
      <div className="flex items-center justify-between border-b-4 border-foreground bg-background px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 border-2 border-foreground bg-accent" />
          <span className="h-3 w-3 border-2 border-foreground bg-secondary" />
          <span className="h-3 w-3 border-2 border-foreground bg-primary" />
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">
          unilink.app/{user.username}
        </span>
      </div>

      <div className="bg-[#b7b2aa] p-4">
        <div
          className={`overflow-hidden border-4 border-foreground bg-background shadow-neo ${
            isDesktop ? "aspect-[16/10]" : "aspect-[9/16]"
          }`}
        >
          <div
            className={`origin-top-left ${
              isDesktop ? "h-[900px] w-[1280px] scale-[0.33]" : "h-[812px] w-[375px] scale-[0.78]"
            }`}
          >
            <ProfilePage user={user} preview />
          </div>
        </div>
      </div>
    </div>
  );
}
