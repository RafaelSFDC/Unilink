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
    description: 'Neo-brutalista direto ao ponto para publicar rápido',
    preview: '/templates/default-preview.jpg',
    tier: 'FREE',
    accent: 'bg-primary',
    surface: 'bg-white',
    vibe: 'Estrutura forte e leitura imediata',
  },
  {
    id: 'minimal',
    name: 'Minimalista',
    description: 'Leve, editorial e elegante para marcas pessoais',
    preview: '/templates/minimal-preview.jpg',
    tier: 'FREE',
    accent: 'bg-zinc-200',
    surface: 'bg-white',
    vibe: 'Silêncio visual com foco no conteúdo',
  },
  {
    id: 'modern',
    name: 'Moderno',
    description: 'Glassmorphism com energia premium para creators visuais',
    preview: '/templates/modern-preview.jpg',
    tier: 'PRO',
    accent: 'bg-cyan-300',
    surface: 'bg-slate-900',
    vibe: 'Camadas translúcidas e atmosfera digital',
  },
  {
    id: 'vibrant',
    name: 'Vibrante',
    description: 'Cores vivas e presença alta para perfis cheios de personalidade',
    preview: '/templates/vibrant-preview.jpg',
    tier: 'PRO',
    accent: 'bg-pink-400',
    surface: 'bg-orange-100',
    vibe: 'Impacto cromático e movimento aparente',
  },
  {
    id: 'professional',
    name: 'Profissional',
    description: 'Organizado, confiável e ótimo para consultoria e portfólio',
    preview: '/templates/professional-preview.jpg',
    tier: 'PRO',
    accent: 'bg-blue-400',
    surface: 'bg-slate-50',
    vibe: 'Credibilidade com aparência limpa',
  },
  {
    id: 'creative',
    name: 'Criativo',
    description: 'Expressivo, artístico e feito para perfis autorais',
    preview: '/templates/creative-preview.jpg',
    tier: 'PRO',
    accent: 'bg-yellow-300',
    surface: 'bg-pink-100',
    vibe: 'Composição lúdica e memorável',
  }
] as const

export type TemplateId = typeof TEMPLATE_OPTIONS[number]['id']
