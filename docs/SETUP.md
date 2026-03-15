# Setup

## Pré-requisitos

- Node.js 20+
- pnpm
- PostgreSQL acessível pela `DATABASE_URL`
- conta Clerk configurada

Integrações opcionais:

- Stripe
- Mercado Pago
- PostHog

## Instalação

1. Instale as dependências:

```bash
pnpm install
```

2. Copie o arquivo de ambiente:

```bash
cp .env.example .env
```

3. Preencha as variáveis necessárias.

## Variáveis de Ambiente

### Obrigatórias para subir a base

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
DATABASE_URL=
```

### Billing

```env
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
MERCADOPAGO_ACCESS_TOKEN=
```

### Analytics PRO

```env
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=
POSTHOG_PERSONAL_API_KEY=
POSTHOG_PROJECT_ID=
```

## Banco de Dados

Gerar client:

```bash
pnpm db:generate
```

Sincronizar schema:

```bash
pnpm db:push
```

Criar migration local:

```bash
pnpm db:migrate
```

Abrir Prisma Studio:

```bash
pnpm db:studio
```

## Execução

Desenvolvimento:

```bash
pnpm dev
```

Build local:

```bash
pnpm build
```

## Checks Recomendados

```bash
pnpm lint
pnpm type-check
pnpm build
```

## Primeiro Fluxo Manual

1. iniciar a aplicação
2. autenticar com Clerk
3. concluir onboarding
4. criar links
5. personalizar tema
6. abrir o perfil público pelo username

## Troubleshooting

### Build quebra por integração externa

Hoje Stripe e Mercado Pago usam inicialização lazy. Se a build quebrar, normalmente o problema será:

- variável obrigatória ausente na rota que você está usando
- credencial inválida

### Sem dados no analytics PRO

Verifique:

- `NEXT_PUBLIC_POSTHOG_KEY`
- `NEXT_PUBLIC_POSTHOG_HOST`
- `POSTHOG_PERSONAL_API_KEY`
- `POSTHOG_PROJECT_ID`

### Banco não conecta

Verifique a `DATABASE_URL` e rode:

```bash
pnpm db:generate
pnpm db:push
```
