# Arquitetura

## Resumo

O Unilink é uma aplicação Next.js com App Router dividida em quatro camadas principais:

- páginas e rotas em `app/`
- componentes reutilizáveis em `components/`
- integrações e utilitários em `lib/`
- persistência em `prisma/schema.prisma`

## Fluxos Principais

### 1. Landing pública

- rota: `app/page.tsx`
- função: apresentar o produto e direcionar para onboarding/dashboard

### 2. Onboarding

- rota: `app/onboarding/page.tsx`
- função: criar o registro local do usuário após autenticação Clerk

### 3. Dashboard autenticado

- rotas:
  - `app/dashboard/page.tsx`
  - `app/dashboard/links/page.tsx`
  - `app/dashboard/theme/page.tsx`
  - `app/dashboard/settings/page.tsx`
  - `app/dashboard/analytics/page.tsx`
  - `app/dashboard/billing/page.tsx`
- função: administração da conta, links, tema, analytics e plano

### 4. Perfil público

- rota: `app/[username]/page.tsx`
- função: renderizar a página pública do usuário e registrar visualizações

## Organização de Pastas

### `app/`

- páginas, layouts e rotas da aplicação
- `app/actions/` contém server actions
- `app/api/` contém endpoints para checkout, username e webhooks

### `components/`

- componentes de produto
- componentes de interface em `components/ui/`
- templates públicos em `components/profile-templates/`
- providers em `components/providers/`

### `lib/`

- `prisma.ts`: instância do Prisma
- `subscription.ts`: validação de assinatura
- `stripe.ts`: cliente Stripe lazy-loaded
- `mercadopago.ts`: cliente Mercado Pago lazy-loaded
- `posthog-api.ts`: leitura de dados do PostHog
- `theme.ts`: defaults e resolução de tema

### `prisma/`

- `schema.prisma` define os modelos persistidos no PostgreSQL

## Modelo de Dados

### `User`

- identificação local e vínculo com Clerk
- dados públicos do perfil
- flags de visibilidade
- plano
- dados de billing Stripe

### `Link`

- links do perfil
- status ativo/inativo
- ordenação manual

### `Theme`

- template selecionado
- cores, fonte e presets visuais

### `Click`

- clique individual por link
- dados básicos de request

### `Analytics`

- agregação diária por usuário
- total de views
- total de clicks

## Autenticação e Autorização

- Clerk controla sessão e identidade
- `middleware.ts` protege rotas privadas
- server actions e páginas autenticadas validam o `clerkId`
- operações sensíveis foram ajustadas para não confiar apenas em IDs vindos do cliente

## Billing

- Stripe: checkout recorrente e portal de billing
- Mercado Pago: preferência de pagamento e webhook de confirmação
- ambas as integrações são carregadas sob demanda para não quebrar build quando não configuradas

## Analytics

- views públicas registradas em `Analytics`
- cliques registrados individualmente em `Click`
- tendências de pageview do plano PRO vindas do PostHog
- agregação diária normalizada para início do dia

## Observações Arquiteturais

- a aplicação já está estável para desenvolvimento local
- a página `/docs` ainda é institucional, não uma documentação técnica dinâmica
- o módulo de analytics ainda mistura fontes de dados diferentes na UI e merece revisão futura
