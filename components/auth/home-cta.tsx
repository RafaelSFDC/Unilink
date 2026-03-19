"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export function HomeCta() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return null;
  }

  if (session) {
    return (
      <Button
        size="lg"
        className="h-20 px-12 text-2xl font-black uppercase tracking-tighter border-4 border-foreground shadow-neo hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
        asChild
      >
        <Link href="/dashboard">
          MEU PAINEL
          <ArrowRight className="w-8 h-8 ml-3 stroke-3" />
        </Link>
      </Button>
    );
  }

  return (
    <Button
      size="lg"
      className="h-20 px-12 text-2xl font-black uppercase tracking-tighter border-4 border-foreground shadow-neo hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
      asChild
    >
      <Link href="/sign-up">
        COMEÇAR AGORA
        <ArrowRight className="w-8 h-8 ml-3 stroke-3" />
      </Link>
    </Button>
  );
}
