"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { IconSelector } from "@/components/icon-selector";
import { createLink, updateLink } from "@/app/actions/links";
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
  const [isLoading, setIsLoading] = useState(false);
  const [iconValue, setIconValue] = useState(link?.icon || "");
  const router = useRouter();
  const isEditing = !!link;

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);

    try {
      const data = {
        title: formData.get("title") as string,
        url: formData.get("url") as string,
        description: formData.get("description") as string,
        icon: formData.get("icon") as string,
      };

      // Validação básica
      if (!data.title.trim()) {
        toast.error("Título é obrigatório");
        return;
      }

      if (!data.url.trim()) {
        toast.error("URL é obrigatória");
        return;
      }

      // Validar URL
      try {
        new URL(data.url);
      } catch {
        toast.error("URL inválida");
        return;
      }

      const result = isEditing
        ? await updateLink(link.id, data)
        : await createLink(data);

      if (result.success) {
        toast.success(
          isEditing
            ? "Link atualizado com sucesso!"
            : "Link criado com sucesso!",
        );
        router.push("/dashboard/links");
      } else {
        toast.error(result.error || "Erro ao salvar link");
      }
    } catch (error) {
      toast.error("Erro inesperado ao salvar link");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-8">
      <div>
        <Label
          htmlFor="title"
          className="text-xs font-black uppercase tracking-widest mb-2 block"
        >
          Título *
        </Label>
        <Input
          id="title"
          name="title"
          placeholder="Ex: Meu Portfolio"
          defaultValue={link?.title || ""}
          required
          className="h-14 text-lg border-2"
        />
      </div>

      <div>
        <Label
          htmlFor="url"
          className="text-xs font-black uppercase tracking-widest mb-2 block"
        >
          URL *
        </Label>
        <Input
          id="url"
          name="url"
          type="url"
          placeholder="https://exemplo.com"
          defaultValue={link?.url || ""}
          required
          className="h-14 text-lg border-2"
        />
      </div>

      <div>
        <Label className="text-xs font-black uppercase tracking-widest mb-2 block">
          Ícone do Link
        </Label>
        <div className="mt-1">
          <IconSelector value={iconValue} onChange={setIconValue} name="icon" />
        </div>
      </div>

      <div>
        <Label
          htmlFor="description"
          className="text-xs font-black uppercase tracking-widest mb-2 block"
        >
          Descrição
        </Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Descrição opcional do link..."
          defaultValue={link?.description || ""}
          rows={3}
          className="text-lg border-2 resize-none"
        />
      </div>

      <div className="flex gap-4 pt-4">
        <Button
          type="submit"
          disabled={isLoading}
          className="flex-1 h-14 text-xl uppercase font-black"
        >
          {isLoading
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
          disabled={isLoading}
          className="h-14 px-8 border-2 font-black uppercase"
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}
