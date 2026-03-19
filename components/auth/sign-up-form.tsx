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

export function SignUpForm() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const fullName = [firstName.trim(), lastName.trim()].filter(Boolean).join(" ");
    const { error } = await authClient.signUp.email({
      email,
      password,
      name: fullName,
    });

    setIsSubmitting(false);

    if (error) {
      toast.error(error.message || "Nao foi possivel criar a conta.");
      return;
    }

    router.push("/onboarding");
    router.refresh();
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-xs font-black uppercase tracking-widest">
            Nome
          </Label>
          <Input
            id="firstName"
            autoComplete="given-name"
            className="h-14 border-2 text-lg"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-xs font-black uppercase tracking-widest">
            Sobrenome
          </Label>
          <Input
            id="lastName"
            autoComplete="family-name"
            className="h-14 border-2 text-lg"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </div>
      </div>

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
          autoComplete="new-password"
          className="h-14 border-2 text-lg"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          minLength={8}
          required
        />
      </div>

      <Button type="submit" className="w-full h-14 text-lg font-black uppercase" disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Criar conta"}
      </Button>

      <p className="text-center text-sm font-bold uppercase opacity-70">
        Ja tem conta?{" "}
        <Link href="/sign-in" className="text-primary underline underline-offset-4">
          Entrar
        </Link>
      </p>
    </form>
  );
}
