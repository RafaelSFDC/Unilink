'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, Eye } from 'lucide-react'
import { TEMPLATE_OPTIONS, type TemplateId } from '@/components/profile-templates'

interface TemplateSelectorProps {
  currentTemplate: TemplateId
  onTemplateSelect: (templateId: TemplateId) => void
  onPreview?: (templateId: TemplateId) => void
}

export function TemplateSelector({ 
  currentTemplate, 
  onTemplateSelect, 
  onPreview 
}: TemplateSelectorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>(currentTemplate)

  const handleTemplateClick = (templateId: TemplateId) => {
    setSelectedTemplate(templateId)
    onTemplateSelect(templateId)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Escolha um Template</h3>
        <p className="text-sm text-muted-foreground">
          Selecione um design para seu perfil público
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {TEMPLATE_OPTIONS.map((template) => (
          <Card 
            key={template.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedTemplate === template.id 
                ? 'ring-2 ring-primary border-primary' 
                : 'hover:border-primary/50'
            }`}
            onClick={() => handleTemplateClick(template.id)}
          >
            <CardContent className="p-4">
              {/* Template Preview */}
              <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-3 relative overflow-hidden">
                {/* Preview placeholder - you can replace with actual screenshots */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto mb-2"></div>
                    <div className="w-16 h-2 bg-gray-300 rounded mb-1"></div>
                    <div className="w-12 h-1 bg-gray-300 rounded mb-3"></div>
                    <div className="space-y-1">
                      <div className="w-20 h-3 bg-gray-400 rounded"></div>
                      <div className="w-20 h-3 bg-gray-400 rounded"></div>
                      <div className="w-20 h-3 bg-gray-400 rounded"></div>
                    </div>
                  </div>
                </div>

                {/* Template-specific styling */}
                {template.id === 'minimal' && (
                  <div className="absolute inset-0 bg-white"></div>
                )}
                {template.id === 'modern' && (
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600"></div>
                )}
                {template.id === 'vibrant' && (
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500"></div>
                )}
                {template.id === 'professional' && (
                  <div className="absolute inset-0 bg-gray-50"></div>
                )}
                {template.id === 'creative' && (
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-300 to-purple-300"></div>
                )}

                {/* Selection indicator */}
                {selectedTemplate === template.id && (
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                    <Check className="w-3 h-3" />
                  </div>
                )}
              </div>

              {/* Template Info */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{template.name}</h4>
                  {currentTemplate === template.id && (
                    <Badge variant="secondary" className="text-xs">
                      Atual
                    </Badge>
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground">
                  {template.description}
                </p>

                {/* Preview button */}
                {onPreview && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-2"
                    onClick={(e) => {
                      e.stopPropagation()
                      onPreview(template.id)
                    }}
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    Visualizar
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Template Features */}
      <div className="bg-muted/50 rounded-lg p-4">
        <h4 className="font-medium mb-2">Recursos dos Templates</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Totalmente responsivos para mobile e desktop</li>
          <li>• Personalizáveis com suas cores e fontes</li>
          <li>• Animações suaves e efeitos visuais</li>
          <li>• Otimizados para performance e SEO</li>
        </ul>
      </div>
    </div>
  )
}
