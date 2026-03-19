"use client";

import Link from "next/link";
import { BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserMenu } from "@/components/auth/user-menu";
import { authClient } from "@/lib/auth-client";

export function HeaderAuth() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return null;
  }

  if (!session) {
    return (
      <>
        <Button asChild variant="ghost" className="hidden sm:inline-flex font-bold uppercase">
          <Link href="/sign-in">Entrar</Link>
        </Button>
        <Button asChild className="font-bold uppercase">
          <Link href="/sign-up">Começar</Link>
        </Button>
      </>
    );
  }

  return (
    <>
      <Button
        asChild
        variant="outline"
        className="hidden sm:inline-flex font-bold uppercase shadow-neo"
      >
        <Link href="/dashboard">
          <BarChart3 className="w-4 h-4 mr-2" />
          Painel
        </Link>
      </Button>
      <UserMenu />
    </>
  );
}
