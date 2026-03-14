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
import { ThemePreview } from "@/components/theme-preview";
import { DEFAULT_THEME, resolveTheme, type ThemeSettings } from "@/lib/theme";
import { toast } from "sonner";

interface User {
  id: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string | null;
  bio: string | null;
  title: string | null;
  links: Array<{
    id: string;
    title: string;
    url: string;
    description: string | null;
    icon: string | null;
    order: number;
  }>;
  theme: ((Partial<ThemeSettings> | Record<string, unknown>) & { id: string }) | null;
}

interface ThemeFormProps {
  user: User;
  isPro: boolean;
}

const backgroundTypeOptions = [
  { label: "Base do Template", value: "template" },
  { label: "Cor Sólida", value: "solid" },
  { label: "Gradiente", value: "gradient" },
];

const buttonStyleOptions = [
  { label: "Arredondado", value: "rounded" },
  { label: "Quadrado", value: "square" },
  { label: "Pílula", value: "pill" },
];

const fontFamilyOptions = [
  { label: "Plus Jakarta", value: "jakarta" },
  { label: "Bricolage", value: "bricolage" },
  { label: "Space Grotesk", value: "space" },
  { label: "Playfair", value: "playfair" },
];

const motionPresetOptions = [
  { label: "Steady", value: "steady" },
  { label: "Smooth", value: "smooth" },
  { label: "Energetic", value: "energetic" },
];

const interactionPresetOptions = [
  { label: "Press", value: "press" },
  { label: "Lift", value: "lift" },
  { label: "Glide", value: "glide" },
];

export function ThemeForm({ user, isPro }: ThemeFormProps) {
  const theme = resolveTheme(user.theme as Partial<ThemeSettings> | null);

  const form = useForm({
    defaultValues: {
      template: (theme.template as TemplateId) || "default",
      backgroundColor: theme.backgroundColor,
      textColor: theme.textColor,
      linkColor: theme.linkColor,
      buttonStyle: theme.buttonStyle,
      fontFamily: theme.fontFamily,
      backgroundType: theme.backgroundType,
      gradientFrom: theme.gradientFrom || DEFAULT_THEME.gradientFrom || "#ff4fa3",
      gradientTo: theme.gradientTo || DEFAULT_THEME.gradientTo || "#6d5efc",
      motionPreset: theme.motionPreset,
      interactionPreset: theme.interactionPreset,
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
        motionPreset: value.motionPreset,
        interactionPreset: value.interactionPreset,
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
    <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_28rem]">
      <div className="space-y-12">
        <form.Field
          name="template"
          validators={{
            onChange: ({ value }) =>
              validateRequired(value, "Template é obrigatório"),
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
          <div className="p-6 bg-muted border-4 border-foreground shadow-neo rotate-[0.5deg] transition-all duration-100 hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none">
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-1">
              Personalização Avançada
            </h3>
            <p className="text-xs font-bold uppercase opacity-60">
              Ajuste o comportamento visual do perfil e veja o resultado em
              tempo real.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
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

              <form.Subscribe selector={(state) => state.values.backgroundType}>
                {(backgroundType) =>
                  backgroundType === "gradient" ? (
                    <div className="grid grid-cols-2 gap-4">
                      <form.Field name="gradientFrom">
                        {(field) => (
                          <ColorField
                            field={field}
                            label="Gradiente (Início)"
                            placeholder="#ff4fa3"
                            textInputClassName="text-xs"
                          />
                        )}
                      </form.Field>

                      <form.Field name="gradientTo">
                        {(field) => (
                          <ColorField
                            field={field}
                            label="Gradiente (Fim)"
                            placeholder="#6d5efc"
                            textInputClassName="text-xs"
                          />
                        )}
                      </form.Field>
                    </div>
                  ) : null
                }
              </form.Subscribe>

              <form.Field name="textColor">
                {(field) => (
                  <ColorField
                    field={field}
                    label="Cor do Texto"
                    placeholder="#111111"
                  />
                )}
              </form.Field>

              <form.Field name="linkColor">
                {(field) => (
                  <ColorField
                    field={field}
                    label="Cor de Destaque"
                    placeholder="#ff4fa3"
                  />
                )}
              </form.Field>
            </div>

            <div className="space-y-6">
              <form.Field name="buttonStyle">
                {(field) => (
                  <SelectField
                    field={field}
                    label="Forma dos Botões"
                    options={buttonStyleOptions}
                  />
                )}
              </form.Field>

              <form.Field name="fontFamily">
                {(field) => (
                  <SelectField
                    field={field}
                    label="Fonte Principal"
                    options={fontFamilyOptions}
                  />
                )}
              </form.Field>

              <form.Field name="interactionPreset">
                {(field) => (
                  <SelectField
                    field={field}
                    label="Interações"
                    options={interactionPresetOptions}
                    description="Controla como links e botões reagem ao hover."
                  />
                )}
              </form.Field>

              <form.Field name="motionPreset">
                {(field) => (
                  <SelectField
                    field={field}
                    label="Animações"
                    options={motionPresetOptions}
                    description="Define a intensidade dos movimentos do template."
                  />
                )}
              </form.Field>
            </div>
          </div>

          <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
              <Button
                type="submit"
                disabled={isSubmitting}
                className="mt-8 h-16 w-full text-2xl font-black uppercase tracking-tighter"
              >
                {isSubmitting ? "Salvando..." : "Salvar Tema"}
              </Button>
            )}
          </form.Subscribe>
        </form>
      </div>

      <form.Subscribe selector={(state) => state.values}>
        {(values) => (
          <ThemePreview
            user={user}
            theme={resolveTheme({
              ...values,
              template: values.template as string,
            })}
          />
        )}
      </form.Subscribe>
    </div>
  );
}
