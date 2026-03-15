# Unilink

Link-in-bio premium para criadores que querem publicar uma pagina bonita, personalizavel e pronta para converter atencao em acao.

## Visao Geral

O Unilink combina:

- pagina publica por username
- dashboard autenticado
- personalizacao de tema e template
- analytics internos e integracao com PostHog
- billing com Stripe e Mercado Pago

Direcao oficial deste ciclo:

- publico principal: criadores
- publico secundario: profissionais criativos e marcas pessoais
- diferencial principal: design + personalizacao
- diferencial secundario: analytics uteis
- Stripe como fluxo principal de billing
- Mercado Pago como alternativa secundaria
- `FREE` com ate 5 links
- `PRO` com links ilimitados por `R$ 10/mês`

Hoje o projeto ja esta funcional para desenvolvimento local e possui base tecnica validada com:

- `pnpm run lint`
- `pnpm run type-check`
- `pnpm run build`

## Stack

- Next.js 15 com App Router
- React 19
- TypeScript
- Prisma + PostgreSQL
- Clerk para autenticacao
- Tailwind CSS 4 + shadcn/ui
- Stripe
- Mercado Pago
- PostHog

## Estrutura Rapida

```text
app/          rotas, layouts, paginas e server actions
components/   componentes de UI e blocos de produto
lib/          integracoes, helpers e regras compartilhadas
prisma/       schema do banco
docs/         documentacao tecnica e operacional
```

## Documentacao

- [docs/README.md](./docs/README.md)
- [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)
- [docs/SETUP.md](./docs/SETUP.md)
- [docs/BILLING.md](./docs/BILLING.md)
- [docs/ANALYTICS.md](./docs/ANALYTICS.md)
- [docs/PRODUCT_LIMITS.md](./docs/PRODUCT_LIMITS.md)
- [docs/PRODUCT_ROADMAP.md](./docs/PRODUCT_ROADMAP.md)
- [docs/CONTINUITY_BACKLOG.md](./docs/CONTINUITY_BACKLOG.md)
- [docs/TEMPLATES.md](./docs/TEMPLATES.md)
- [docs/TECHNICAL_AUDIT.md](./docs/TECHNICAL_AUDIT.md)

## Como Rodar

1. Instale as dependencias:

```bash
pnpm install
```

2. Crie o arquivo de ambiente:

```bash
cp .env.example .env
```

3. Configure as variaveis obrigatorias no `.env`.

4. Gere o Prisma Client:

```bash
pnpm db:generate
```

5. Suba o schema no banco:

```bash
pnpm db:push
```

6. Rode a aplicacao:

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
- Build de producao passando
- `.env.example` disponivel
- documentacao tecnica consolidada em `docs/`
- fases `0` a `7` consolidadas neste ciclo
- fase `8` fechada com backlog, dividas tecnicas e continuidade organizados
- validacoes manuais finais seguem documentadas como pendencias operacionais
