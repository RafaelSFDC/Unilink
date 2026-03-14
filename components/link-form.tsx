"use client";

import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { TextField, TextareaField } from "@/components/ui/form-fields";
import { IconSelector } from "@/components/icon-selector";
import { createLink, updateLink } from "@/app/actions/links";
import { isValidHttpUrl, validateRequired } from "@/lib/form-utils";
import { toast } from "sonner";

interface LinkFormProps {
  link?: {
    id: string;
    title: string;
    url: string;
    description: string | null;
    icon: string | null;
  };
}

export function LinkForm({ link }: LinkFormProps) {
  const router = useRouter();
  const isEditing = !!link;

  const form = useForm({
    defaultValues: {
      title: link?.title || "",
      url: link?.url || "",
      description: link?.description || "",
      icon: link?.icon || "",
    },
    onSubmit: async ({ value }) => {
      const payload = {
        title: value.title.trim(),
        url: value.url.trim(),
        description: value.description.trim(),
        icon: value.icon.trim(),
      };

      const result = isEditing
        ? await updateLink(link.id, payload)
        : await createLink(payload);

      if (result.success) {
        toast.success(
          isEditing
            ? "Link atualizado com sucesso!"
            : "Link criado com sucesso!",
        );
        router.push("/dashboard/links");
        return;
      }

      toast.error(result.error || "Erro ao salvar link");
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
        name="title"
        validators={{
          onChange: ({ value }) => validateRequired(value, "Título é obrigatório"),
          onBlur: ({ value }) => validateRequired(value, "Título é obrigatório"),
        }}
      >
        {(field) => (
          <TextField
            field={field}
            label="Título"
            placeholder="Ex: Meu Portfolio"
          />
        )}
      </form.Field>

      <form.Field
        name="url"
        validators={{
          onChange: ({ value }) => {
            const requiredError = validateRequired(value, "URL é obrigatória");
            if (requiredError) {
              return requiredError;
            }

            return isValidHttpUrl(value) ? undefined : "URL inválida";
          },
          onBlur: ({ value }) => {
            const requiredError = validateRequired(value, "URL é obrigatória");
            if (requiredError) {
              return requiredError;
            }

            return isValidHttpUrl(value) ? undefined : "URL inválida";
          },
        }}
      >
        {(field) => (
          <TextField
            field={field}
            label="URL"
            type="url"
            placeholder="https://exemplo.com"
            autoComplete="url"
          />
        )}
      </form.Field>

      <form.Field name="icon">
        {(field) => (
          <div className="space-y-2">
            <p className="text-xs font-black uppercase tracking-widest">
              Ícone do link
            </p>
            <IconSelector
              value={field.state.value}
              onChange={field.handleChange}
              name={field.name}
            />
          </div>
        )}
      </form.Field>

      <form.Field name="description">
        {(field) => (
          <TextareaField
            field={field}
            label="Descrição"
            placeholder="Descrição opcional do link..."
            rows={3}
          />
        )}
      </form.Field>

      <div className="flex gap-4 pt-4">
        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 h-14 text-xl uppercase font-black"
              >
                {isSubmitting
                  ? isEditing
                    ? "Atualizando..."
                    : "Criando..."
                  : isEditing
                    ? "Atualizar Link"
                    : "Criar Link"}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/dashboard/links")}
                disabled={isSubmitting}
                className="h-14 px-8 border-2 font-black uppercase"
              >
                Cancelar
              </Button>
            </>
          )}
        </form.Subscribe>
      </div>
    </form>
  );
}
