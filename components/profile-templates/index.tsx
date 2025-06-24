export { DefaultTemplate } from './default-template'
export { MinimalTemplate } from './minimal-template'
export { ModernTemplate } from './modern-template'
export { VibrantTemplate } from './vibrant-template'
export { ProfessionalTemplate } from './professional-template'
export { CreativeTemplate } from './creative-template'

export const TEMPLATE_OPTIONS = [
  {
    id: 'default',
    name: 'Padrão',
    description: 'Template clássico e versátil',
    preview: '/templates/default-preview.jpg'
  },
  {
    id: 'minimal',
    name: 'Minimalista',
    description: 'Design limpo e elegante',
    preview: '/templates/minimal-preview.jpg'
  },
  {
    id: 'modern',
    name: 'Moderno',
    description: 'Glassmorphism com efeitos visuais',
    preview: '/templates/modern-preview.jpg'
  },
  {
    id: 'vibrant',
    name: 'Vibrante',
    description: 'Cores vivas e animações dinâmicas',
    preview: '/templates/vibrant-preview.jpg'
  },
  {
    id: 'professional',
    name: 'Profissional',
    description: 'Layout corporativo e formal',
    preview: '/templates/professional-preview.jpg'
  },
  {
    id: 'creative',
    name: 'Criativo',
    description: 'Artístico com elementos decorativos',
    preview: '/templates/creative-preview.jpg'
  }
] as const

export type TemplateId = typeof TEMPLATE_OPTIONS[number]['id']
