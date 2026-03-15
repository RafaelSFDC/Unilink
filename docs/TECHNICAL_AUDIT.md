# Auditoria Tecnica do Unilink

## Objetivo

Documentar o estado atual da aplicacao e registrar, de forma pratica, as inconsistencias, riscos e oportunidades para deixar o produto mais redondo de ponta a ponta.

## Stack validada

- Next.js 15 com App Router
- React 19
- Prisma + PostgreSQL
- Clerk para autenticacao
- Tailwind CSS 4 + shadcn/ui
- Stripe e Mercado Pago para billing
- PostHog para analytics complementar

## Fluxos identificados

- Landing publica em `app/page.tsx`
- Perfil publico em `app/[username]/page.tsx`
- Onboarding em `app/onboarding/page.tsx`
- Dashboard autenticado com modulos de links, tema, analytics, billing e configuracoes
- Billing com checkout Stripe e Mercado Pago
- Analytics hibrido:
  - visualizacoes/cliques basicos no banco
  - tendencias de pageview no PostHog

## Status tecnico validado

- `pnpm run type-check`: OK
- `pnpm run build`: OK
- `pnpm run lint`: falha por ausencia de configuracao ESLint no projeto

## Correcoes feitas nesta revisao

### 1. Build resiliente para billing opcional

Os clientes de Stripe e Mercado Pago deixaram de ser inicializados em tempo de import. Agora a configuracao e carregada sob demanda nas rotas que realmente precisam dela, evitando quebra de build quando uma integracao opcional nao estiver configurada.

Arquivos impactados:

- `lib/stripe.ts`
- `lib/mercadopago.ts`
- `app/api/stripe/checkout/route.ts`
- `app/api/webhooks/stripe/route.ts`
- `app/api/mercadopago/checkout/route.ts`
- `app/api/webhooks/mercadopago/route.ts`

### 2. Endurecimento de seguranca nas server actions

As actions de perfil e analytics agora validam o usuario autenticado no servidor antes de operar sobre dados sensiveis.

Arquivos impactados:

- `app/actions/user.ts`
- `app/actions/analytics.ts`

### 3. Correcao da agregacao diaria de analytics

Os registros diarios estavam usando `new Date()` com horario completo dentro da chave unica `(userId, date)`, o que podia gerar varias linhas no mesmo dia. Agora a data e normalizada para o inicio do dia antes do `upsert`.

Arquivos impactados:

- `app/actions/analytics.ts`
- `app/[username]/page.tsx`

## Inconsistencias confirmadas

### Documentacao

1. O repositório usa `pnpm` (`pnpm-lock.yaml`), mas `README.md` e `SETUP.md` instruem `yarn`.
2. O `README.md` referencia `.env.example`, mas esse arquivo nao existia antes desta revisao.
3. O `SETUP.md` afirma que o projeto esta "100% operacional", mas o fluxo real ainda tem lacunas de lint e partes de documentacao simuladas.

### Produto e UX

1. A pagina `/docs` comunica "REST API", "webhooks", "changelog" e "guias", mas hoje funciona como vitrine estatica; botoes e cards nao levam a conteudo tecnico real.
2. A copy do produto muda bastante entre landing, billing, README e dashboard:
   - limite e beneficios do plano Free/PRO aparecem com variacoes
   - analytics ora sao "essenciais", ora "deep analytics", ora "PostHog PRO"
3. O dashboard de analytics mistura fontes e janelas de tempo diferentes:
   - visualizacoes do PostHog em 7 dias
   - cliques acumulados no banco
   - conversao calculada sobre metricas de origens distintas

### Qualidade de engenharia

1. Existe script de `lint`, mas nao existe setup de ESLint no repositorio.
2. A pagina `app/dashboard/analytics/page.tsx` entrega `123 kB` de JS proprio na rota, sugerindo oportunidade de reduzir bundle, principalmente por conta do grafico.
3. O projeto tem paginas institucionais e de ajuda, mas sem uma documentacao operacional central para onboarding tecnico, arquitetura e troubleshooting.

## Riscos e oportunidades priorizados

### P0

1. Configurar ESLint de verdade e fechar uma baseline minima de qualidade para CI.
2. Padronizar a definicao de features Free vs PRO em codigo, UI e documentacao.
3. Corrigir dados historicos de analytics gerados antes da normalizacao da data diaria.

### P1

1. Transformar `/docs` em documentacao real ou reduzir a promessa da pagina para nao criar falso positivo de maturidade.
2. Criar uma fonte unica de verdade para capabilities do produto:
   - planos
   - limites
   - provedores de pagamento
   - integracoes opcionais
3. Revisar analytics para separar claramente:
   - metricas internas
   - metricas PostHog
   - janela temporal de cada card

### P2

1. Fazer code-splitting do grafico e dependencias pesadas de analytics.
2. Introduzir observabilidade operacional:
   - paginas de erro mais claras
   - logs estruturados para billing/webhooks
   - fallback UX quando PostHog ou pagamentos nao estiverem configurados
3. Consolidar documentacao em uma pasta `docs/` com:
   - arquitetura
   - setup
   - variaveis de ambiente
   - billing
   - analytics

## Proposta de documentacao enxuta

Sugestao de estrutura para a proxima etapa:

- `docs/ARCHITECTURE.md`
- `docs/SETUP.md`
- `docs/BILLING.md`
- `docs/ANALYTICS.md`
- `docs/PRODUCT_LIMITS.md`

## Proximos passos recomendados

1. Configurar ESLint e CI minima (`type-check`, `build`, `lint`).
2. Atualizar `README.md` e `SETUP.md` para `pnpm`, variaveis reais e fluxo atual.
3. Corrigir o posicionamento da pagina `/docs`: documentacao real ou pagina de central de ajuda mais honesta.
4. Executar saneamento no banco para agregar analytics antigos por dia.
5. Revisar a experiencia de analytics para deixar fonte, periodo e significado de cada metrica absolutamente claros.
