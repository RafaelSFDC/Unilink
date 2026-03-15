# Analytics

## Visão Geral

O projeto usa duas fontes de dados:

- analytics internos persistidos no banco
- tendências de pageview no PostHog

## Analytics Internos

### Arquivos principais

- `app/actions/analytics.ts`
- `app/[username]/page.tsx`
- `prisma/schema.prisma`

### O que é registrado

- visualizações de perfil público
- cliques em links

### Tabelas

- `Analytics`: agregação diária por usuário
- `Click`: clique individual por link

### Regra de agregação diária

Os registros diários são normalizados para o início do dia antes do `upsert`, evitando múltiplas linhas para a mesma data.

## PostHog

### Arquivos principais

- `components/providers/posthog-provider.tsx`
- `components/providers/posthog-pageview.tsx`
- `lib/posthog-api.ts`
- `app/dashboard/analytics/page.tsx`

### Uso atual

- captura de pageview no client
- leitura de tendências por username no dashboard PRO

### Variáveis

```env
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=
POSTHOG_PERSONAL_API_KEY=
POSTHOG_PROJECT_ID=
```

## Limitações Atuais

- a tela de analytics mistura fontes diferentes
- views exibidas podem vir do PostHog
- cliques vêm do banco local
- a taxa de conversão atual cruza métricas de origens/janelas diferentes

## Recomendação de Evolução

- separar visualmente métricas internas de métricas PostHog
- explicitar período de cada card
- consolidar uma definição única de conversão para evitar ambiguidade
