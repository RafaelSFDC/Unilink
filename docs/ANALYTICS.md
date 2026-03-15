# Analytics

## Visão Geral

O projeto usa duas fontes de dados:

- analytics internos persistidos no banco
- tendências de pageview no PostHog

Regra oficial desta fase:

- PostHog serve para leitura de tendência de views
- banco local serve para cliques e agregações internas
- conversão só pode ser exibida quando numerador e denominador vierem da mesma base compatível

## Analytics Internos

### Arquivos principais

- `app/actions/analytics.ts`
- `app/[username]/page.tsx`
- `prisma/schema.prisma`

### O que é registrado

- visualizações de perfil público
- cliques em links

### Definições oficiais

- `view interna acumulada`: soma de `Analytics.totalViews`
- `click`: evento persistido em `Click`
- `conversão interna`: relação entre views internas e cliques internos na mesma janela

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

### Definição oficial

- `view de tendência`: leitura do PostHog para acompanhar ritmo recente de visualização
- a janela atual usada na interface é de `7 dias`

### Variáveis

```env
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=
POSTHOG_PERSONAL_API_KEY=
POSTHOG_PROJECT_ID=
```

## Limitações Atuais

- a arquitetura continua híbrida
- o PostHog não substitui a agregação local
- ausência de dados do PostHog não invalida métricas internas
- tendências de views e acumulados locais não devem ser comparados como se fossem a mesma série

## Leitura Atual da Interface

### Tendências via PostHog

- views recentes do perfil
- período de 7 dias
- leitura voltada a ritmo e oscilação

### Métricas internas

- views internas agregadas
- cliques por link e acumulados
- conversão interna quando a janela for compatível

## Regra de apresentação

- cada card deve informar origem do dado
- cada card deve informar período
- nenhuma label deve sugerir equivalência entre acumulado local e janela do PostHog
