# Templates

## Visão Geral

O perfil público suporta múltiplos templates, todos renderizados a partir de componentes separados em `components/profile-templates/`.

## Templates Disponíveis

- `default`
- `minimal`
- `modern`
- `vibrant`
- `professional`
- `creative`

## Arquivos Principais

- `components/profile-templates/index.tsx`
- `components/profile-templates/default-template.tsx`
- `components/profile-templates/minimal-template.tsx`
- `components/profile-templates/modern-template.tsx`
- `components/profile-templates/vibrant-template.tsx`
- `components/profile-templates/professional-template.tsx`
- `components/profile-templates/creative-template.tsx`
- `components/template-selector.tsx`
- `components/theme-form.tsx`

## Como Funciona

1. o usuário escolhe um template no dashboard
2. o valor é salvo no `Theme.template`
3. o perfil público resolve o tema e renderiza o template correspondente

## Personalizações Aplicadas por Tema

- template
- cor de fundo
- cor do texto
- cor de destaque
- estilo do botão
- tipo de fundo
- gradiente
- fonte
- motion preset
- interaction preset

## Observações

- os templates compartilham a mesma base de dados do perfil
- a experiência visual muda por template, mas os dados exibidos vêm da mesma estrutura de usuário e links
- alguns templates dependem mais fortemente de recursos PRO na narrativa do produto
