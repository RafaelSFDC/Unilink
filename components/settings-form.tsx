"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Check, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TextField, TextareaField } from "@/components/ui/form-fields";
import { Switch } from "@/components/ui/switch";
import { toggleUserVisibility, updateUser } from "@/app/actions/user";
import { validateRequired, validateUsername } from "@/lib/form-utils";
import { useUsernameAvailability } from "@/hooks/use-username-availability";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

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
  const [isPublic, setIsPublic] = useState(user.isPublic);
  const [isTogglingVisibility, setIsTogglingVisibility] = useState(false);
  const [usernameToCheck, setUsernameToCheck] = useState(user.username);
  const usernameStatus = useUsernameAvailability(usernameToCheck, {
    currentUsername: user.username,
  });

  const form = useForm({
    defaultValues: {
      username: user.username,
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      title: user.title || "",
      bio: user.bio || "",
    },
    onSubmit: async ({ value }) => {
      if (usernameStatus.available === false) {
        toast.error(usernameStatus.message || "Escolha outro username para continuar.");
        return;
      }

      const result = await updateUser(user.id, {
        username: value.username.trim(),
        firstName: value.firstName.trim(),
        lastName: value.lastName.trim(),
        title: value.title.trim(),
        bio: value.bio.trim(),
      });

      if (result.success) {
        toast.success("Perfil atualizado com sucesso!");
        return;
      }

      toast.error(result.error || "Erro ao atualizar perfil");
    },
  });

  async function handleToggleVisibility() {
    setIsTogglingVisibility(true);

    try {
      const result = await toggleUserVisibility(user.id);

      if (result.success) {
        setIsPublic(!isPublic);
        toast.success(
          !isPublic
            ? "Perfil publico ativado. Sua pagina ja pode ser acessada."
            : "Perfil privado. Sua pagina deixou de aparecer publicamente.",
        );
        return;
      }

      toast.error(result.error || "Erro ao alterar visibilidade");
    } catch {
      toast.error("Erro inesperado");
    } finally {
      setIsTogglingVisibility(false);
    }
  }

  const usernameStatusBadge = usernameStatus.checking ? (
    <div className="flex items-center gap-1.5 bg-blue-500 border-2 border-foreground px-2 py-1 shadow-neo-sm">
      <Loader2 className="h-3 w-3 animate-spin text-white" />
      <span className="text-[10px] text-white font-black uppercase">Check</span>
    </div>
  ) : usernameStatus.available === true ? (
    <div className="flex items-center gap-1.5 bg-green-500 border-2 border-foreground px-2 py-1 shadow-neo-sm">
      <Check className="h-3 w-3 text-white" />
      <span className="text-[10px] text-white font-black uppercase">Livre</span>
    </div>
  ) : usernameStatus.available === false ? (
    <div className="flex items-center gap-1.5 bg-red-500 border-2 border-foreground px-2 py-1 shadow-neo-sm">
      <X className="h-3 w-3 text-white" />
      <span className="text-[10px] text-white font-black uppercase">Rever</span>
    </div>
  ) : null;

  return (
    <div className="space-y-10">
      <form
        className="space-y-8"
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          void form.handleSubmit();
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <form.Field
            name="firstName"
            validators={{
              onChange: ({ value }) => validateRequired(value, "Nome é obrigatório"),
              onBlur: ({ value }) => validateRequired(value, "Nome é obrigatório"),
            }}
          >
            {(field) => (
              <TextField
                field={field}
                label="Nome"
                autoComplete="given-name"
              />
            )}
          </form.Field>

          <form.Field name="lastName">
            {(field) => (
              <TextField
                field={field}
                label="Sobrenome"
                autoComplete="family-name"
              />
            )}
          </form.Field>
        </div>

        <form.Field
          name="username"
          validators={{
            onChange: ({ value }) => validateUsername(value),
            onBlur: ({ value }) => validateUsername(value),
          }}
        >
          {(field) => (
            <div className="space-y-4">
              <TextField
                field={field}
                label="Nome de usuário"
                trailing={usernameStatusBadge}
                onValueChange={setUsernameToCheck}
                inputClassName={cn(
                  usernameStatus.checking && "border-blue-500 bg-blue-50",
                  usernameStatus.available === true &&
                    "border-green-500 bg-green-50",
                  usernameStatus.available === false &&
                    "border-red-500 bg-red-50",
                )}
              />

              <div className="space-y-3">
                <div
                  className={cn(
                    "text-sm p-4 border-2 shadow-neo-sm transition-all duration-150 rotate-[-0.5deg] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none",
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
                      ? `unilink.com/${field.state.value}`
                      : `localhost:3000/${field.state.value}`}
                  </p>
                </div>
                {usernameStatus.message ? (
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
                ) : null}
              </div>
            </div>
          )}
        </form.Field>

        <form.Field name="title">
          {(field) => (
            <TextField
              field={field}
              label="Título/Profissão"
              placeholder="Criador, designer, musico, etc."
              autoComplete="organization-title"
            />
          )}
        </form.Field>

        <form.Field name="bio">
          {(field) => (
            <TextareaField
              field={field}
              label="Bio"
              placeholder="Conte em poucas linhas quem voce e, o que cria e o que as pessoas vao encontrar no seu perfil."
              rows={3}
            />
          )}
        </form.Field>

        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 text-xl uppercase font-black"
            >
              {isSubmitting ? "Salvando..." : "Salvar Alterações"}
            </Button>
          )}
        </form.Subscribe>
      </form>

      <div className="pt-8 border-t-4 border-foreground border-dashed">
        <div className="bg-muted border-4 border-foreground p-8 shadow-neo-lg rotate-[0.5deg] transition-all duration-100 hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none">
          <div className="flex items-center justify-between gap-8">
            <div className="flex-1">
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">
                Perfil Público
              </h3>
              <p className="text-sm font-bold opacity-70 uppercase leading-tight">
                QUANDO ATIVO, SEU PERFIL FICARÁ VISÍVEL PARA TODO O MUNDO
              </p>
            </div>
            <div className="flex items-center gap-4 bg-background border-2 border-foreground p-3 shadow-neo transition-all duration-100 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none">
              <span className="text-xs font-black uppercase tracking-widest">
                {isPublic ? "ATIVO" : "PRIVADO"}
              </span>
              <Switch
                checked={isPublic}
                onCheckedChange={handleToggleVisibility}
                disabled={isTogglingVisibility}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
