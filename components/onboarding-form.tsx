"use client";

import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { TextField, TextareaField } from "@/components/ui/form-fields";
import { createUser } from "@/app/actions/user";
import { validateUsername } from "@/lib/form-utils";
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

  const form = useForm({
    defaultValues: {
      username: "",
      title: "",
      bio: "",
    },
    onSubmit: async ({ value }) => {
      const result = await createUser({
        clerkId,
        email,
        firstName,
        lastName,
        imageUrl,
        username: value.username.trim(),
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
          <TextField
            field={field}
            label="Nome de usuário"
            placeholder="seunome"
            description="Seu link será: unilink.com/seunome"
            autoComplete="username"
          />
        )}
      </form.Field>

      <form.Field name="title">
        {(field) => (
          <TextField
            field={field}
            label="Título/Profissão"
            placeholder="Desenvolvedor, Designer, etc."
            autoComplete="organization-title"
          />
        )}
      </form.Field>

      <form.Field name="bio">
        {(field) => (
          <TextareaField
            field={field}
            label="Bio"
            placeholder="Conte um pouco sobre você..."
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
            {isSubmitting ? "Criando perfil..." : "Criar meu perfil"}
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
}
