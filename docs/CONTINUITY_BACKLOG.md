# Backlog de Continuidade

## Objetivo

Este documento existe para permitir que o projeto seja pausado e retomado sem perda de contexto.

Ele responde:

- o que ficou pendente depois do fechamento das fases 0 a 8
- o que deve entrar primeiro no proximo ciclo
- quais debitos tecnicos ainda merecem atencao
- quais experimentos valem ser testados no futuro

## Estado de Referencia

Ao final deste ciclo, o projeto ficou com:

- posicionamento de produto consolidado
- planos `FREE` e `PRO` alinhados entre docs, UI e regras principais
- jornada principal funcional
- templates curados e classificados entre `FREE` e `PRO`
- analytics separados entre tendencia via PostHog e metricas internas
- billing com Stripe como principal e Mercado Pago como alternativa
- polimento de UX, acessibilidade e consistencia nas telas criticas
- `lint`, `type-check` e `build` passando

## Fonte de Verdade

Antes de iniciar qualquer novo trabalho, ler nesta ordem:

1. `README.md`
2. `docs/README.md`
3. `docs/PRODUCT_ROADMAP.md`
4. `docs/PRODUCT_LIMITS.md`
5. este arquivo

## Curto Prazo

Itens de maior prioridade para o proximo ciclo.

- Executar `docs/MANUAL_VALIDATION_ROADMAP.md` e registrar o resultado da rodada.
- Revisar a landing e a pagina `/docs` para remover qualquer copy residual fora da oferta atual.
- Reduzir o bundle da rota `app/dashboard/analytics/page.tsx`, especialmente no grafico.
- Definir uma rotina simples de saneamento ou auditoria dos dados historicos de analytics.

## Medio Prazo

Itens importantes, mas que nao bloqueiam a continuidade imediata do produto.

- Melhorar observabilidade operacional de billing e webhooks.
- Refinar a pagina de analytics com mais clareza de insights por link.
- Revisar performance geral do dashboard em contas com muitos links.
- Evoluir a modelagem de billing do Mercado Pago se ele passar a ter peso comercial maior.
- Revisar a experiencia da pagina publica com mais depth em SEO, share cards e discoverability.

## Experimentos

Ideias que podem gerar aprendizado, mas nao devem competir com as prioridades principais sem decisao explicita.

- Testar novos templates premium focados em nichos de criadores.
- Experimentar upsell mais contextual no dashboard para usuarios `FREE`.
- Testar relatorios de melhor link / pior link nas analytics internas.
- Avaliar uma central de ajuda publica mais forte no lugar da atual pagina `/docs`.
- Testar elementos de conversao na landing orientados a criadores especificos, como musica, design e creator economy.

## Debitos Tecnicos Remanescentes

- A validacao manual de fluxos criticos ainda nao foi executada neste ciclo.
- A rota de analytics continua sendo uma das mais pesadas da aplicacao.
- Observabilidade de erros e webhooks ainda pode evoluir.
- Mercado Pago continua operacionalmente menos maduro do que Stripe.
- Algumas verificacoes de qualidade hoje dependem mais de disciplina do time do que de automacao.

## Oportunidades Fora do Escopo Atual

Itens deliberadamente deixados para depois.

- page builder mais livre
- automacoes para campanhas ou links inteligentes
- marketplace de templates
- integracoes profundas com pixels, CRM ou ferramentas de creator stack
- multiplos produtos dentro do mesmo repositorio

## Regra de Priorizacao

Se houver duvida de prioridade, seguir esta ordem:

1. confiabilidade do fluxo principal
2. monetizacao e status do plano
3. clareza de analytics
4. performance e observabilidade
5. expansao de features
