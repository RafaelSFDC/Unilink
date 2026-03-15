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
- `pnpm run lint`: OK

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

## Inconsistencias confirmadas durante a auditoria original

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

1. A pagina `app/dashboard/analytics/page.tsx` entrega `123 kB` de JS proprio na rota, sugerindo oportunidade de reduzir bundle, principalmente por conta do grafico.
2. O projeto tinha lacunas de documentacao operacional; esta revisao iniciou a consolidacao em `docs/`.
3. A pagina `/docs` do produto continua sendo institucional e ainda nao espelha toda a documentacao tecnica escrita no repositório.

## Status apos o fechamento das fases 0 a 8

Os principais problemas de alinhamento de produto, docs, billing, templates, analytics e polimento foram tratados neste ciclo. O foco agora sai de "organizar a base" e passa para "validar em operacao e evoluir com seguranca".

## Riscos e oportunidades priorizados

### P0

1. Executar validacao manual da jornada principal e do billing com ambiente real.
2. Revisar e, se necessario, sanear dados historicos de analytics gerados antes da normalizacao diaria.
3. Manter `lint`, `type-check` e `build` como baseline obrigatoria local.

### P1

1. Revisar a pagina `/docs` e a landing para remover qualquer promessa residual fora da oferta atual.
2. Reduzir bundle e custo de renderizacao da rota de analytics.
3. Evoluir observabilidade operacional para billing, webhooks e falhas de integracao.

### P2

1. Aprofundar a experiencia de analytics com insights por link e comparativos mais uteis.
2. Reavaliar o papel do Mercado Pago se a demanda comercial justificar paridade maior com Stripe.
3. Expandir a documentacao operacional com runbooks de suporte e incidentes.

## Proximos passos recomendados

1. Seguir `docs/CONTINUITY_BACKLOG.md` como backlog pos-roadmap.
2. Executar as validacoes manuais ainda pendentes e registrar o resultado.
3. Manter `README.md` e `docs/` sincronizados com a implementacao real.
4. Revisar a experiencia de analytics com foco em performance e interpretacao.
5. Evoluir observabilidade operacional antes de ampliar o escopo do produto.
