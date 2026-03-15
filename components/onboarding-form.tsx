"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { Check, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TextField, TextareaField } from "@/components/ui/form-fields";
import { createUser } from "@/app/actions/user";
import { validateUsername } from "@/lib/form-utils";
import { useUsernameAvailability } from "@/hooks/use-username-availability";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface OnboardingFormProps {
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
}

export function OnboardingForm({
  clerkId,
  email,
  firstName,
  lastName,
  imageUrl,
}: OnboardingFormProps) {
  const router = useRouter();
  const [usernameToCheck, setUsernameToCheck] = useState("");

  const form = useForm({
    defaultValues: {
      username: "",
      title: "",
      bio: "",
    },
    onSubmit: async ({ value }) => {
      const normalizedUsername = value.username.trim().toLowerCase();

      if (usernameStatus.available === false) {
        toast.error(usernameStatus.message || "Escolha outro username para continuar.");
        return;
      }

      const result = await createUser({
        clerkId,
        email,
        firstName,
        lastName,
        imageUrl,
        username: normalizedUsername,
        bio: value.bio.trim(),
        title: value.title.trim(),
      });

      if (result.success) {
        toast.success("Perfil criado com sucesso!");
        router.push("/dashboard");
        return;
      }

      toast.error(result.error || "Erro ao criar perfil");
    },
  });
  const usernameStatus = useUsernameAvailability(usernameToCheck, {
    enabled: true,
  });

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
    <form
      className="space-y-8"
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        void form.handleSubmit();
      }}
    >
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
              placeholder="seunome"
              description="Sua página pública ficará em: unilink.com/seunome"
              autoComplete="username"
              trailing={usernameStatusBadge}
              onValueChange={setUsernameToCheck}
              inputClassName={cn(
                usernameStatus.checking && "border-blue-500 bg-blue-50",
                usernameStatus.available === true && "border-green-500 bg-green-50",
                usernameStatus.available === false && "border-red-500 bg-red-50",
              )}
            />

            {field.state.value.trim() ? (
              <div className="space-y-3">
                <div
                  className={cn(
                    "text-sm p-4 border-2 shadow-neo-sm transition-all duration-150 rotate-[-0.5deg]",
                    usernameStatus.checking && "bg-blue-100 border-blue-500",
                    usernameStatus.available === true && "bg-green-100 border-green-500",
                    usernameStatus.available === false && "bg-red-100 border-red-500",
                    !usernameStatus.checking &&
                      usernameStatus.available === null &&
                      "bg-muted border-foreground/20",
                  )}
                >
                  <p className="font-black uppercase tracking-tight">
                    Sua pagina: unilink.com/{field.state.value.trim().toLowerCase()}
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
            ) : null}
          </div>
        )}
      </form.Field>

      <form.Field name="title">
        {(field) => (
          <TextField
            field={field}
            label="Título/Profissão"
            placeholder="Criador, designer, músico, etc."
            autoComplete="organization-title"
          />
        )}
      </form.Field>

      <form.Field name="bio">
        {(field) => (
          <TextareaField
            field={field}
            label="Bio"
            placeholder="Conte em poucas linhas quem você é, o que cria e o que as pessoas vão encontrar na sua página."
            rows={3}
          />
        )}
      </form.Field>

      <form.Subscribe selector={(state) => state.isSubmitting}>
        {(isSubmitting) => (
          <Button
            type="submit"
            className="w-full h-14 text-lg uppercase font-black"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Criando perfil..." : "Publicar meu perfil"}
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
}
