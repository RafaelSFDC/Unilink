"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

interface SignInFormProps {
  redirectTo?: string;
}

export function SignInForm({ redirectTo = "/dashboard" }: SignInFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const { error } = await authClient.signIn.email({
      email,
      password,
    });

    setIsSubmitting(false);

    if (error) {
      toast.error(error.message || "Nao foi possivel entrar.");
      return;
    }

    router.push(redirectTo);
    router.refresh();
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="email" className="text-xs font-black uppercase tracking-widest">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          className="h-14 border-2 text-lg"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-xs font-black uppercase tracking-widest">
          Senha
        </Label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          className="h-14 border-2 text-lg"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>

      <Button type="submit" className="w-full h-14 text-lg font-black uppercase" disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Entrar"}
      </Button>

      <p className="text-center text-sm font-bold uppercase opacity-70">
        Ainda nao tem conta?{" "}
        <Link href="/sign-up" className="text-primary underline underline-offset-4">
          Criar agora
        </Link>
      </p>
    </form>
  );
}
