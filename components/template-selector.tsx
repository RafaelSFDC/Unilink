"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Eye, Zap } from "lucide-react";
import { ProModal } from "@/components/pro-modal";
import {
  TEMPLATE_OPTIONS,
  type TemplateId,
} from "@/components/profile-templates";

interface TemplateSelectorProps {
  currentTemplate: TemplateId;
  onTemplateSelect: (templateId: TemplateId) => void;
  onPreview?: (templateId: TemplateId) => void;
  isPro: boolean;
}

const PRO_TEMPLATES: TemplateId[] = [
  "modern",
  "vibrant",
  "professional",
  "creative",
];

export function TemplateSelector({
  currentTemplate,
  onTemplateSelect,
  onPreview,
  isPro,
}: TemplateSelectorProps) {
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateId>(currentTemplate);
  const [isProModalOpen, setIsProModalOpen] = useState(false);

  const handleTemplateClick = (templateId: TemplateId) => {
    const isPremium = PRO_TEMPLATES.includes(templateId);

    if (isPremium && !isPro) {
      setIsProModalOpen(true);
      return;
    }

    setSelectedTemplate(templateId);
    onTemplateSelect(templateId);
  };

  return (
    <div className="space-y-10">
      <div className="border-b-4 border-foreground pb-4">
        <h3 className="text-2xl font-black uppercase tracking-tighter mb-1">
          Escolha um Template
        </h3>
        <p className="text-sm font-bold uppercase opacity-60">
          Selecione um design para seu perfil público
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {TEMPLATE_OPTIONS.map((template) => (
          <Card
            key={template.id}
            className={`cursor-pointer transition-all duration-300 border-4 shadow-neo hover:shadow-none hover:translate-x-1 hover:translate-y-1 ${
              selectedTemplate === template.id
                ? "bg-yellow-100 border-foreground ring-4 ring-primary ring-offset-4"
                : "bg-background hover:bg-muted/50"
            }`}
            onClick={() => handleTemplateClick(template.id)}
          >
            <CardContent className="p-6 relative">
              {PRO_TEMPLATES.includes(template.id) && (
                <div className="absolute top-2 right-2 z-20">
                  <Badge className="bg-yellow-400 text-foreground border-2 border-foreground shadow-neo-sm font-black uppercase text-[8px] flex items-center gap-1">
                    <Zap className="w-2 h-2 fill-current" />
                    PRO
                  </Badge>
                </div>
              )}
              {/* Template Preview */}
              <div className="aspect-3/4 border-4 border-foreground bg-white mb-6 relative overflow-hidden shadow-neo-sm">
                {/* Preview placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary border-4 border-foreground shadow-neo-sm mx-auto mb-4 rotate-[5deg]"></div>
                    <div className="w-24 h-4 bg-foreground mb-2"></div>
                    <div className="w-16 h-2 bg-foreground/30 mb-6 mx-auto"></div>
                    <div className="space-y-3">
                      <div className="w-32 h-6 bg-secondary border-2 border-foreground shadow-neo-sm"></div>
                      <div className="w-32 h-6 bg-accent border-2 border-foreground shadow-neo-sm"></div>
                    </div>
                  </div>
                </div>

                {/* Template-specific styling overlay */}
                {template.id === "minimal" && (
                  <div className="absolute inset-0 bg-white opacity-20 pointer-events-none"></div>
                )}
                {template.id === "modern" && (
                  <div className="absolute inset-0 bg-primary/20 pointer-events-none"></div>
                )}
                {template.id === "vibrant" && (
                  <div className="absolute inset-0 bg-accent/20 pointer-events-none"></div>
                )}

                {/* Selection indicator */}
                {selectedTemplate === template.id && (
                  <div className="absolute top-4 right-4 bg-primary border-4 border-foreground text-white p-1 shadow-neo-sm scale-110">
                    <Check className="w-6 h-6 stroke-4" />
                  </div>
                )}
              </div>

              {/* Template Info */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xl font-black uppercase tracking-tight">
                    {template.name}
                  </h4>
                  {currentTemplate === template.id && (
                    <Badge className="bg-primary text-white border-2 border-foreground shadow-neo-sm font-black uppercase text-[10px]">
                      Atual
                    </Badge>
                  )}
                </div>

                <p className="text-xs font-bold uppercase opacity-70 leading-tight h-8 overflow-hidden">
                  {template.description}
                </p>

                {/* Preview button */}
                {onPreview && (
                  <Button
                    variant="outline"
                    className="w-full h-12 border-2 shadow-neo-sm hover:shadow-none hover:translate-x-px hover:translate-y-px font-black uppercase text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPreview(template.id);
                    }}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Visualizar
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Template Features */}
      <div className="bg-primary border-4 border-foreground p-8 shadow-neo-lg rotate-[-0.5deg]">
        <h4 className="text-2xl font-black uppercase text-white mb-4 tracking-tighter">
          Recursos dos Templates
        </h4>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <li className="flex items-center gap-3 text-white font-bold uppercase text-xs">
            <span className="w-6 h-6 bg-white text-primary border-2 border-white rounded-none flex items-center justify-center font-black">
              1
            </span>
            Totalmente responsivos (Mobile & Desktop)
          </li>
          <li className="flex items-center gap-3 text-white font-bold uppercase text-xs">
            <span className="w-6 h-6 bg-white text-primary border-2 border-white rounded-none flex items-center justify-center font-black">
              2
            </span>
            Personalizáveis com suas cores e fontes
          </li>
          <li className="flex items-center gap-3 text-white font-bold uppercase text-xs">
            <span className="w-6 h-6 bg-white text-primary border-2 border-white rounded-none flex items-center justify-center font-black">
              3
            </span>
            Animações suaves e efeitos visuais
          </li>
          <li className="flex items-center gap-3 text-white font-bold uppercase text-xs">
            <span className="w-6 h-6 bg-white text-primary border-2 border-white rounded-none flex items-center justify-center font-black">
              4
            </span>
            Otimizados para performance e SEO
          </li>
        </ul>
      </div>
      <ProModal
        isOpen={isProModalOpen}
        onClose={() => setIsProModalOpen(false)}
      />
    </div>
  );
}
