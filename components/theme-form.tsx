"use client";

import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import {
  ColorField,
  SelectField,
} from "@/components/ui/form-fields";
import { updateTheme } from "@/app/actions/theme";
import { TemplateSelector } from "@/components/template-selector";
import { type TemplateId } from "@/components/profile-templates";
import { validateRequired } from "@/lib/form-utils";
import { toast } from "sonner";

interface User {
  id: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
  title: string | null;
  theme: {
    id: string;
    template: string;
    backgroundColor: string;
    textColor: string;
    linkColor: string;
    buttonStyle: string;
    fontFamily: string;
    backgroundType: string;
    backgroundImage: string | null;
    gradientFrom: string | null;
    gradientTo: string | null;
  } | null;
}

interface ThemeFormProps {
  user: User;
  isPro: boolean;
}

const backgroundTypeOptions = [
  { label: "Cor Sólida", value: "solid" },
  { label: "Gradiente", value: "gradient" },
];

const buttonStyleOptions = [
  { label: "Arredondado", value: "rounded" },
  { label: "Quadrado", value: "square" },
  { label: "Pílula", value: "pill" },
];

const fontFamilyOptions = [
  { label: "Inter", value: "Inter" },
  { label: "Roboto", value: "Roboto" },
  { label: "Open Sans", value: "Open Sans" },
  { label: "Poppins", value: "Poppins" },
  { label: "Montserrat", value: "Montserrat" },
];

export function ThemeForm({ user, isPro }: ThemeFormProps) {
  const theme = user.theme || {
    template: "default",
    backgroundColor: "#ffffff",
    textColor: "#000000",
    linkColor: "#1a73e8",
    buttonStyle: "rounded",
    fontFamily: "Inter",
    backgroundType: "solid",
    backgroundImage: null,
    gradientFrom: "#3b82f6",
    gradientTo: "#8b5cf6",
  };

  const form = useForm({
    defaultValues: {
      template: (theme.template as TemplateId) || "default",
      backgroundColor: theme.backgroundColor,
      textColor: theme.textColor,
      linkColor: theme.linkColor,
      buttonStyle: theme.buttonStyle,
      fontFamily: theme.fontFamily,
      backgroundType: theme.backgroundType,
      gradientFrom: theme.gradientFrom || "#3b82f6",
      gradientTo: theme.gradientTo || "#8b5cf6",
    },
    onSubmit: async ({ value }) => {
      const result = await updateTheme(user.id, {
        template: value.template,
        backgroundColor: value.backgroundColor,
        textColor: value.textColor,
        linkColor: value.linkColor,
        buttonStyle: value.buttonStyle,
        fontFamily: value.fontFamily,
        backgroundType: value.backgroundType,
        gradientFrom: value.gradientFrom,
        gradientTo: value.gradientTo,
      });

      if (result.success) {
        toast.success("Tema atualizado com sucesso!");
        return;
      }

      toast.error(result.error || "Erro ao atualizar tema");
    },
  });

  const handlePreview = (templateId: TemplateId) => {
    window.open(`/${user.username}?preview=${templateId}`, "_blank");
  };

  return (
    <div className="space-y-12">
      <form.Field
        name="template"
        validators={{
          onChange: ({ value }) => validateRequired(value, "Template é obrigatório"),
        }}
      >
        {(field) => (
          <TemplateSelector
            currentTemplate={field.state.value as TemplateId}
            onTemplateSelect={field.handleChange as (value: TemplateId) => void}
            onPreview={handlePreview}
            isPro={isPro}
          />
        )}
      </form.Field>

      <form
        className="space-y-8"
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          void form.handleSubmit();
        }}
      >
        <div className="p-6 bg-muted border-4 border-foreground shadow-neo rotate-[0.5deg]">
          <h3 className="text-2xl font-black uppercase tracking-tighter mb-1">
            Personalização Avançada
          </h3>
          <p className="text-xs font-bold uppercase opacity-60">
            Customize cores, fontes e outros detalhes do template selecionado
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <form.Field name="backgroundType">
              {(field) => (
                <SelectField
                  field={field}
                  label="Tipo de Fundo"
                  options={backgroundTypeOptions}
                />
              )}
            </form.Field>

            <form.Field name="backgroundColor">
              {(field) => (
                <ColorField
                  field={field}
                  label="Cor de Fundo"
                  placeholder="#ffffff"
                />
              )}
            </form.Field>

            <div className="grid grid-cols-2 gap-4">
              <form.Field name="gradientFrom">
                {(field) => (
                  <ColorField
                    field={field}
                    label="Gradiente (Início)"
                    placeholder="#3b82f6"
                    textInputClassName="text-xs"
                  />
                )}
              </form.Field>

              <form.Field name="gradientTo">
                {(field) => (
                  <ColorField
                    field={field}
                    label="Gradiente (Fim)"
                    placeholder="#8b5cf6"
                    textInputClassName="text-xs"
                  />
                )}
              </form.Field>
            </div>
          </div>

          <div className="space-y-6">
            <form.Field name="textColor">
              {(field) => (
                <ColorField
                  field={field}
                  label="Cor do Texto"
                  placeholder="#000000"
                />
              )}
            </form.Field>

            <form.Field name="linkColor">
              {(field) => (
                <ColorField
                  field={field}
                  label="Cor dos Elementos"
                  placeholder="#1a73e8"
                />
              )}
            </form.Field>

            <div className="grid grid-cols-2 gap-4">
              <form.Field name="buttonStyle">
                {(field) => (
                  <SelectField
                    field={field}
                    label="Estilo"
                    options={buttonStyleOptions}
                  />
                )}
              </form.Field>

              <form.Field name="fontFamily">
                {(field) => (
                  <SelectField
                    field={field}
                    label="Fonte"
                    options={fontFamilyOptions}
                  />
                )}
              </form.Field>
            </div>
          </div>
        </div>

        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-16 text-2xl uppercase font-black tracking-tighter mt-8"
            >
              {isSubmitting ? "Salvando..." : "Salvar Tema"}
            </Button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
}
