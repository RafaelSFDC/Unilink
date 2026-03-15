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

const FREE_TEMPLATE_IDS: TemplateId[] = ["default", "minimal"];

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
    const isPremium = !FREE_TEMPLATE_IDS.includes(templateId);

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
          Escolha o visual que melhor representa sua página pública
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
              {template.tier === "PRO" && (
                <div className="absolute top-2 right-2 z-20">
                  <Badge className="bg-yellow-400 text-foreground border-2 border-foreground shadow-neo-sm font-black uppercase text-[8px] flex items-center gap-1">
                    <Zap className="w-2 h-2 fill-current" />
                    PRO
                  </Badge>
                </div>
              )}
              <div
                className={`aspect-3/4 border-4 border-foreground mb-6 relative overflow-hidden shadow-neo-sm ${template.surface}`}
              >
                <div className="absolute inset-0 flex items-center justify-center p-5">
                  <div className="w-full h-full border-2 border-foreground/20 bg-white/60 backdrop-blur-[1px] p-4 flex flex-col justify-between">
                    <div className="flex items-center justify-between gap-3">
                      <div className={`w-10 h-10 border-2 border-foreground shadow-neo-sm rotate-[4deg] ${template.accent}`} />
                      <Badge className="bg-background text-foreground border border-foreground font-black uppercase text-[8px] shadow-none">
                        {template.tier}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <div className="w-24 h-3 bg-foreground" />
                      <div className="w-16 h-2 bg-foreground/30" />
                    </div>

                    <div className="space-y-2">
                      <div className={`h-8 border-2 border-foreground shadow-neo-sm ${template.accent}`} />
                      <div className="h-8 border-2 border-foreground bg-white/80 shadow-neo-sm" />
                      <div className="h-8 border-2 border-foreground bg-white/80 shadow-neo-sm opacity-80" />
                    </div>
                  </div>
                </div>

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

                <p className="text-[10px] font-black uppercase tracking-wide text-foreground/50 h-8">
                  {template.vibe}
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
      <div className="bg-primary border-4 border-foreground p-8 shadow-neo-lg rotate-[-0.5deg] transition-all duration-100 hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none">
        <h4 className="text-2xl font-black uppercase text-white mb-4 tracking-tighter">
          Recursos dos Templates
        </h4>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <li className="flex items-center gap-3 text-white font-bold uppercase text-xs">
            <span className="w-6 h-6 bg-white text-primary border-2 border-white rounded-none flex items-center justify-center font-black">
              1
            </span>
            FREE com default e minimal
          </li>
          <li className="flex items-center gap-3 text-white font-bold uppercase text-xs">
            <span className="w-6 h-6 bg-white text-primary border-2 border-white rounded-none flex items-center justify-center font-black">
              2
            </span>
            PRO com modern, vibrant, professional e creative
          </li>
          <li className="flex items-center gap-3 text-white font-bold uppercase text-xs">
            <span className="w-6 h-6 bg-white text-primary border-2 border-white rounded-none flex items-center justify-center font-black">
              3
            </span>
            Personalizaveis com cores, fontes e presets
          </li>
          <li className="flex items-center gap-3 text-white font-bold uppercase text-xs">
            <span className="w-6 h-6 bg-white text-primary border-2 border-white rounded-none flex items-center justify-center font-black">
              4
            </span>
            Preview deve refletir o visual publico final
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
