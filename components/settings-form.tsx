"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { updateUser, toggleUserVisibility } from "@/app/actions/user";
import { toast } from "sonner";
import { Check, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface User {
  id: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  bio: string | null;
  title: string | null;
  isPublic: boolean;
}

interface SettingsFormProps {
  user: User;
}

export function SettingsForm({ user }: SettingsFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPublic, setIsPublic] = useState(user.isPublic);
  const [isTogglingVisibility, setIsTogglingVisibility] = useState(false);
  const [username, setUsername] = useState(user.username);
  const [usernameStatus, setUsernameStatus] = useState<{
    checking: boolean;
    available: boolean | null;
    message: string;
  }>({
    checking: false,
    available: null,
    message: "",
  });

  const checkUsername = useCallback(
    async (usernameToCheck: string) => {
      if (!usernameToCheck.trim() || usernameToCheck === user.username) {
        setUsernameStatus({
          checking: false,
          available: null,
          message: "",
        });
        return;
      }

      setUsernameStatus((prev) => ({ ...prev, checking: true }));

      try {
        const response = await fetch(
          `/api/check-username?username=${encodeURIComponent(usernameToCheck)}`,
        );
        const data = await response.json();

        setUsernameStatus({
          checking: false,
          available: data.available,
          message: data.message,
        });
      } catch (error) {
        setUsernameStatus({
          checking: false,
          available: false,
          message: "Erro ao verificar disponibilidade",
        });
      }
    },
    [user.username],
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      checkUsername(username);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [username, checkUsername]);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);

    try {
      const data = {
        username: formData.get("username") as string,
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        bio: formData.get("bio") as string,
        title: formData.get("title") as string,
      };

      // Validação básica
      if (!data.username.trim()) {
        toast.error("Nome de usuário é obrigatório");
        return;
      }

      if (!data.firstName.trim()) {
        toast.error("Nome é obrigatório");
        return;
      }

      const result = await updateUser(user.id, data);

      if (result.success) {
        toast.success("Perfil atualizado com sucesso!");
      } else {
        toast.error(result.error || "Erro ao atualizar perfil");
      }
    } catch (error) {
      toast.error("Erro inesperado ao atualizar perfil");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleToggleVisibility() {
    setIsTogglingVisibility(true);
    try {
      const result = await toggleUserVisibility(user.id);

      if (result.success) {
        setIsPublic(!isPublic);
        toast.success(
          !isPublic ? "Perfil tornado público" : "Perfil tornado privado",
        );
      } else {
        toast.error(result.error || "Erro ao alterar visibilidade");
      }
    } catch (error) {
      toast.error("Erro inesperado");
    } finally {
      setIsTogglingVisibility(false);
    }
  }

  return (
    <div className="space-y-10">
      <form action={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label
              htmlFor="firstName"
              className="text-xs font-black uppercase tracking-widest mb-2 block"
            >
              Nome *
            </Label>
            <Input
              id="firstName"
              name="firstName"
              defaultValue={user.firstName || ""}
              required
              className="h-14 text-lg border-2"
            />
          </div>

          <div>
            <Label
              htmlFor="lastName"
              className="text-xs font-black uppercase tracking-widest mb-2 block"
            >
              Sobrenome
            </Label>
            <Input
              id="lastName"
              name="lastName"
              defaultValue={user.lastName || ""}
              className="h-14 text-lg border-2"
            />
          </div>
        </div>

        <div>
          <Label
            htmlFor="username"
            className="text-xs font-black uppercase tracking-widest mb-2 block"
          >
            Nome de usuário *
          </Label>
          <div className="relative">
            <Input
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className={cn(
                "h-14 text-lg border-2 pr-24 transition-all duration-300",
                usernameStatus.checking && "border-blue-500 bg-blue-50",
                usernameStatus.available === true &&
                  "border-green-500 bg-green-50",
                usernameStatus.available === false &&
                  "border-red-500 bg-red-50",
              )}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              {usernameStatus.checking && (
                <div className="flex items-center gap-1.5 bg-blue-500 border-2 border-foreground px-2 py-1 shadow-neo-sm">
                  <Loader2 className="h-3 w-3 animate-spin text-white" />
                  <span className="text-[10px] text-white font-black uppercase">
                    Check
                  </span>
                </div>
              )}
              {!usernameStatus.checking &&
                usernameStatus.available === true && (
                  <div className="flex items-center gap-1.5 bg-green-500 border-2 border-foreground px-2 py-1 shadow-neo-sm">
                    <Check className="h-3 w-3 text-white" />
                    <span className="text-[10px] text-white font-black uppercase">
                      Ok
                    </span>
                  </div>
                )}
              {!usernameStatus.checking &&
                usernameStatus.available === false && (
                  <div className="flex items-center gap-1.5 bg-red-500 border-2 border-foreground px-2 py-1 shadow-neo-sm">
                    <X className="h-3 w-3 text-white" />
                    <span className="text-[10px] text-white font-black uppercase">
                      Busy
                    </span>
                  </div>
                )}
            </div>
          </div>
          <div className="mt-4 space-y-3">
            <div
              className={cn(
                "text-sm p-4 border-2 shadow-neo-sm transition-all duration-300 rotate-[-0.5deg]",
                usernameStatus.checking && "bg-blue-100 border-blue-500",
                usernameStatus.available === true &&
                  "bg-green-100 border-green-500",
                usernameStatus.available === false &&
                  "bg-red-100 border-red-500",
                usernameStatus.available === null &&
                  "bg-muted border-foreground/20",
              )}
            >
              <p
                className={cn(
                  "font-black uppercase tracking-tight",
                  usernameStatus.checking && "text-blue-700",
                  usernameStatus.available === true && "text-green-700",
                  usernameStatus.available === false && "text-red-700",
                  usernameStatus.available === null && "text-foreground/60",
                )}
              >
                Seu link:{" "}
                {process.env.NODE_ENV === "production"
                  ? `unilink.com/${username}`
                  : `localhost:3000/${username}`}
              </p>
            </div>
            {usernameStatus.message && (
              <div
                className={cn(
                  "text-[10px] font-black uppercase px-3 py-1 border-2 w-fit shadow-neo-sm",
                  usernameStatus.available === true &&
                    "bg-green-500 border-foreground text-white",
                  usernameStatus.available === false &&
                    "bg-red-500 border-foreground text-white",
                )}
              >
                {usernameStatus.message}
              </div>
            )}
          </div>
        </div>

        <div>
          <Label
            htmlFor="title"
            className="text-xs font-black uppercase tracking-widest mb-2 block"
          >
            Título/Profissão
          </Label>
          <Input
            id="title"
            name="title"
            placeholder="Desenvolvedor, Designer, etc."
            defaultValue={user.title || ""}
            className="h-14 text-lg border-2"
          />
        </div>

        <div>
          <Label
            htmlFor="bio"
            className="text-xs font-black uppercase tracking-widest mb-2 block"
          >
            Bio
          </Label>
          <Textarea
            id="bio"
            name="bio"
            placeholder="Conte um pouco sobre você..."
            defaultValue={user.bio || ""}
            rows={3}
            className="text-lg border-2 resize-none"
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-14 text-xl uppercase font-black"
        >
          {isLoading ? "Salvando..." : "Salvar Alterações"}
        </Button>
      </form>

      <div className="pt-8 border-t-4 border-foreground border-dashed">
        <div className="bg-muted border-4 border-foreground p-8 shadow-neo-lg rotate-[0.5deg]">
          <div className="flex items-center justify-between gap-8">
            <div className="flex-1">
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">
                Perfil Público
              </h3>
              <p className="text-sm font-bold opacity-70 uppercase leading-tight">
                QUANDO ATIVO, SEU PERFIL FICARÁ VISÍVEL PARA TODO O MUNDO
              </p>
            </div>
            <div className="flex items-center gap-4 bg-background border-2 border-foreground p-3 shadow-neo">
              <span className="text-xs font-black uppercase tracking-widest">
                {isPublic ? "ATIVO" : "PRIVADO"}
              </span>
              <Switch
                checked={isPublic}
                onCheckedChange={handleToggleVisibility}
                disabled={isTogglingVisibility || isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
