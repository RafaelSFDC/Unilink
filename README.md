# Unilink

Plataforma de link-in-bio construída com Next.js para criadores, profissionais e marcas centralizarem links, personalizarem a página pública e acompanharem métricas de acesso.

## Visão Geral

O Unilink combina:

- página pública por username
- dashboard autenticado
- personalização de tema e template
- analytics internos e integração com PostHog
- billing com Stripe e Mercado Pago

Hoje o projeto já está funcional para desenvolvimento local e possui base técnica validada com:

- `pnpm run lint`
- `pnpm run type-check`
- `pnpm run build`

## Stack

- Next.js 15 com App Router
- React 19
- TypeScript
- Prisma + PostgreSQL
- Clerk para autenticação
- Tailwind CSS 4 + shadcn/ui
- Stripe
- Mercado Pago
- PostHog

## Estrutura Rápida

```text
app/          rotas, layouts, páginas e server actions
components/   componentes de UI e blocos de produto
lib/          integrações, helpers e regras compartilhadas
prisma/       schema do banco
docs/         documentação técnica e operacional
```

## Documentação

- [docs/README.md](./docs/README.md)
- [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)
- [docs/SETUP.md](./docs/SETUP.md)
- [docs/BILLING.md](./docs/BILLING.md)
- [docs/ANALYTICS.md](./docs/ANALYTICS.md)
- [docs/PRODUCT_LIMITS.md](./docs/PRODUCT_LIMITS.md)
- [docs/TEMPLATES.md](./docs/TEMPLATES.md)
- [docs/TECHNICAL_AUDIT.md](./docs/TECHNICAL_AUDIT.md)

## Como Rodar

1. Instale as dependências:

```bash
pnpm install
```

2. Crie o arquivo de ambiente:

```bash
cp .env.example .env
```

3. Configure as variáveis obrigatórias no `.env`.

4. Gere o Prisma Client:

```bash
pnpm db:generate
```

5. Suba o schema no banco:

```bash
pnpm db:push
```

6. Rode a aplicação:

```bash
pnpm dev
```

## Scripts

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
pnpm type-check
pnpm db:generate
pnpm db:push
pnpm db:migrate
pnpm db:studio
pnpm db:reset
```

## Estado Atual

- ESLint configurado e passando
- TypeScript passando
- Build de produção passando
- `.env.example` disponível
- documentação técnica consolidada em `docs/`

## Próximos Passos Recomendados

- padronizar de vez a matriz Free vs PRO em produto e copy
- revisar a experiência de analytics para deixar origem e janela das métricas mais claras
- continuar a expansão da documentação da página `/docs` para refletir o conteúdo técnico real
