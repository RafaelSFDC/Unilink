"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateTheme } from "@/app/actions/theme";
import { toast } from "sonner";
import { TemplateSelector } from "@/components/template-selector";
import { type TemplateId } from "@/components/profile-templates";

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

export function ThemeForm({ user, isPro }: ThemeFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>(
    (user.theme?.template as TemplateId) || "default",
  );

  const theme = user.theme || {
    template: "default",
    backgroundColor: "#ffffff",
    textColor: "#000000",
    linkColor: "#1a73e8",
    buttonStyle: "rounded",
    fontFamily: "Inter",
    backgroundType: "solid",
    backgroundImage: null,
    gradientFrom: null,
    gradientTo: null,
  };

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);

    try {
      const data = {
        template: selectedTemplate,
        backgroundColor: formData.get("backgroundColor") as string,
        textColor: formData.get("textColor") as string,
        linkColor: formData.get("linkColor") as string,
        buttonStyle: formData.get("buttonStyle") as string,
        fontFamily: formData.get("fontFamily") as string,
        backgroundType: formData.get("backgroundType") as string,
        gradientFrom: formData.get("gradientFrom") as string,
        gradientTo: formData.get("gradientTo") as string,
      };

      const result = await updateTheme(user.id, data);

      if (result.success) {
        toast.success("Tema atualizado com sucesso!");
      } else {
        toast.error(result.error || "Erro ao atualizar tema");
      }
    } catch (error) {
      toast.error("Erro inesperado ao atualizar tema");
    } finally {
      setIsLoading(false);
    }
  }

  const handleTemplateSelect = (templateId: TemplateId) => {
    setSelectedTemplate(templateId);
  };

  const handlePreview = (templateId: TemplateId) => {
    // Open preview in new tab
    window.open(`/${user.username}?preview=${templateId}`, "_blank");
  };

  return (
    <div className="space-y-12">
      {/* Template Selector */}
      <TemplateSelector
        currentTemplate={selectedTemplate}
        onTemplateSelect={handleTemplateSelect}
        onPreview={handlePreview}
        isPro={isPro}
      />

      {/* Theme Customization Form */}
      <form action={handleSubmit} className="space-y-8">
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
            <div>
              <Label
                htmlFor="backgroundType"
                className="text-xs font-black uppercase tracking-widest mb-2 block"
              >
                Tipo de Fundo
              </Label>
              <Select name="backgroundType" defaultValue={theme.backgroundType}>
                <SelectTrigger className="h-12 border-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    value="solid"
                    className="font-bold uppercase text-xs"
                  >
                    Cor Sólida
                  </SelectItem>
                  <SelectItem
                    value="gradient"
                    className="font-bold uppercase text-xs"
                  >
                    Gradiente
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label
                htmlFor="backgroundColor"
                className="text-xs font-black uppercase tracking-widest mb-2 block"
              >
                Cor de Fundo
              </Label>
              <div className="flex items-center space-x-3">
                <Input
                  id="backgroundColor"
                  name="backgroundColor"
                  type="color"
                  defaultValue={theme.backgroundColor}
                  className="w-16 h-12 p-1 border-2"
                />
                <Input
                  type="text"
                  defaultValue={theme.backgroundColor}
                  className="flex-1 h-12 border-2 uppercase font-mono"
                  placeholder="#ffffff"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="gradientFrom"
                  className="text-xs font-black uppercase tracking-widest mb-2 block"
                >
                  Gradiente (Início)
                </Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="gradientFrom"
                    name="gradientFrom"
                    type="color"
                    defaultValue={theme.gradientFrom || "#3b82f6"}
                    className="w-12 h-12 p-1 border-2"
                  />
                  <Input
                    type="text"
                    defaultValue={theme.gradientFrom || "#3b82f6"}
                    className="flex-1 h-12 border-2 uppercase font-mono text-xs"
                    placeholder="#3b82f6"
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor="gradientTo"
                  className="text-xs font-black uppercase tracking-widest mb-2 block"
                >
                  Gradiente (Fim)
                </Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="gradientTo"
                    name="gradientTo"
                    type="color"
                    defaultValue={theme.gradientTo || "#8b5cf6"}
                    className="w-12 h-12 p-1 border-2"
                  />
                  <Input
                    type="text"
                    defaultValue={theme.gradientTo || "#8b5cf6"}
                    className="flex-1 h-12 border-2 uppercase font-mono text-xs"
                    placeholder="#8b5cf6"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <Label
                htmlFor="textColor"
                className="text-xs font-black uppercase tracking-widest mb-2 block"
              >
                Cor do Texto
              </Label>
              <div className="flex items-center space-x-3">
                <Input
                  id="textColor"
                  name="textColor"
                  type="color"
                  defaultValue={theme.textColor}
                  className="w-16 h-12 p-1 border-2"
                />
                <Input
                  type="text"
                  defaultValue={theme.textColor}
                  className="flex-1 h-12 border-2 uppercase font-mono"
                  placeholder="#000000"
                />
              </div>
            </div>

            <div>
              <Label
                htmlFor="linkColor"
                className="text-xs font-black uppercase tracking-widest mb-2 block"
              >
                Cor dos Elementos
              </Label>
              <div className="flex items-center space-x-3">
                <Input
                  id="linkColor"
                  name="linkColor"
                  type="color"
                  defaultValue={theme.linkColor}
                  className="w-16 h-12 p-1 border-2"
                />
                <Input
                  type="text"
                  defaultValue={theme.linkColor}
                  className="flex-1 h-12 border-2 uppercase font-mono"
                  placeholder="#1a73e8"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="buttonStyle"
                  className="text-xs font-black uppercase tracking-widest mb-2 block"
                >
                  Estilo
                </Label>
                <Select name="buttonStyle" defaultValue={theme.buttonStyle}>
                  <SelectTrigger className="h-12 border-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      value="rounded"
                      className="font-bold uppercase text-xs"
                    >
                      Arredondado
                    </SelectItem>
                    <SelectItem
                      value="square"
                      className="font-bold uppercase text-xs"
                    >
                      Quadrado
                    </SelectItem>
                    <SelectItem
                      value="pill"
                      className="font-bold uppercase text-xs"
                    >
                      Pílula
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label
                  htmlFor="fontFamily"
                  className="text-xs font-black uppercase tracking-widest mb-2 block"
                >
                  Fonte
                </Label>
                <Select name="fontFamily" defaultValue={theme.fontFamily}>
                  <SelectTrigger className="h-12 border-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Inter" className="font-bold text-xs">
                      Inter
                    </SelectItem>
                    <SelectItem value="Roboto" className="font-bold text-xs">
                      Roboto
                    </SelectItem>
                    <SelectItem value="Open Sans" className="font-bold text-xs">
                      Open Sans
                    </SelectItem>
                    <SelectItem value="Poppins" className="font-bold text-xs">
                      Poppins
                    </SelectItem>
                    <SelectItem
                      value="Montserrat"
                      className="font-bold text-xs"
                    >
                      Montserrat
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-16 text-2xl uppercase font-black tracking-tighter mt-8"
        >
          {isLoading ? "Salvando..." : "Salvar Tema"}
        </Button>
      </form>
    </div>
  );
}
