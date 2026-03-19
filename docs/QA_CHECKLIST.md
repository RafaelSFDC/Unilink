# Checklist de QA

## Objetivo

Este documento e a versao operacional de `docs/MANUAL_VALIDATION_ROADMAP.md`.

Use este arquivo durante a execucao da rodada de QA para marcar resultado, registrar evidencias e anotar bugs encontrados.

## Como Usar

- preencher `Status` com `OK`, `Falhou`, `Parcial` ou `Nao executado`
- preencher `Evidencia` com link, screenshot, video curto ou anotacao objetiva
- preencher `Observacoes` com bug, contexto ou comportamento inesperado
- abrir issue ou registrar no backlog sempre que algum item falhar

## Cabecalho da Rodada

- Data:
- Ambiente:
- Responsavel:
- Build validada com `lint`, `type-check` e `build`:
- Conta `FREE`:
- Conta `PRO`:

## 1. Jornada Principal

| Item | Status | Evidencia | Observacoes |
| --- | --- | --- | --- |
| Login sem usuario local redireciona para `/onboarding` |  |  |  |
| Onboarding cria usuario e tema padrao |  |  |  |
| Onboarding leva corretamente ao `/dashboard` |  |  |  |
| Onboarding bloqueia username indisponivel |  |  |  |
| Onboarding bloqueia username invalido |  |  |  |
| Settings permite trocar username disponivel |  |  |  |
| Settings bloqueia username em uso |  |  |  |
| Alternar perfil publico faz `/{username}` aparecer e sumir corretamente |  |  |  |
| Dashboard oferece caminho claro para links, tema, settings e perfil publico |  |  |  |

## 2. Links e Publicacao

| Item | Status | Evidencia | Observacoes |
| --- | --- | --- | --- |
| Usuario `FREE` cria ate 5 links com sucesso |  |  |  |
| Usuario `FREE` recebe bloqueio claro no sexto link |  |  |  |
| Usuario `PRO` consegue criar links ilimitados |  |  |  |
| Usuario consegue editar titulo e URL de um link |  |  |  |
| Usuario consegue ativar e desativar links |  |  |  |
| Usuario consegue remover links sem quebrar a lista |  |  |  |
| Reordenacao funciona no dashboard |  |  |  |
| Reordenacao reflete corretamente na pagina publica |  |  |  |
| Pagina publica mostra apenas links ativos |  |  |  |
| Pagina publica respeita a ordem persistida |  |  |  |

## 3. Tema e Templates

| Item | Status | Evidencia | Observacoes |
| --- | --- | --- | --- |
| Usuario `FREE` consegue selecionar `default` |  |  |  |
| Usuario `FREE` consegue selecionar `minimal` |  |  |  |
| Usuario `FREE` e bloqueado ao tentar template `PRO` |  |  |  |
| Usuario `PRO` consegue selecionar todos os 6 templates |  |  |  |
| Preview do dashboard representa corretamente o template salvo |  |  |  |
| Pagina publica reflete template, cores, fonte, motion e interaction |  |  |  |
| Troca de template nao quebra links, avatar ou bio |  |  |  |
| Documentacao de templates continua compativel com a interface real |  |  |  |

## 4. Analytics

| Item | Status | Evidencia | Observacoes |
| --- | --- | --- | --- |
| Dashboard de analytics identifica origem e periodo de cada card |  |  |  |
| Bloco de tendencias usa PostHog com clareza |  |  |  |
| Bloco de metricas internas usa dados locais com clareza |  |  |  |
| Ausencia de dados do PostHog nao quebra a tela |  |  |  |
| Clique em link reflete na agregacao interna esperada |  |  |  |
| View da pagina publica continua sendo registrada |  |  |  |
| Conversao nao mistura fontes incompativeis |  |  |  |
| Usuario entende o significado de cada numero sem apoio externo |  |  |  |

## 5. Billing

### Stripe

| Item | Status | Evidencia | Observacoes |
| --- | --- | --- | --- |
| CTA principal de upgrade leva ao fluxo Stripe |  |  |  |
| Checkout Stripe abre corretamente |  |  |  |
| Compra aprovada promove o usuario para `PRO` |  |  |  |
| Billing page reflete status do plano apos pagamento |  |  |  |
| Portal Stripe abre para quem ja e assinante |  |  |  |
| Cancelamento via Stripe reflete no status do usuario |  |  |  |
| Renovacao ou update da assinatura mantem o plano coerente |  |  |  |

### Mercado Pago

| Item | Status | Evidencia | Observacoes |
| --- | --- | --- | --- |
| CTA alternativo do Mercado Pago abre corretamente |  |  |  |
| Pagamento aprovado promove o usuario para `PRO` |  |  |  |
| Retorno ao dashboard nao deixa estado confuso |  |  |  |
| Billing page comunica corretamente o papel secundario do Mercado Pago |  |  |  |

### UX comercial

| Item | Status | Evidencia | Observacoes |
| --- | --- | --- | --- |
| Usuario entende o que recebe ao assinar |  |  |  |
| Usuario entende que Stripe e o fluxo principal |  |  |  |
| Usuario nao recebe promessa enganosa de equivalencia total com Mercado Pago |  |  |  |

## 6. Polimento Final

| Item | Status | Evidencia | Observacoes |
| --- | --- | --- | --- |
| Dashboard em desktop |  |  |  |
| Dashboard em mobile |  |  |  |
| Analytics em desktop |  |  |  |
| Analytics em mobile |  |  |  |
| Billing em desktop |  |  |  |
| Billing em mobile |  |  |  |
| Perfil publico em desktop |  |  |  |
| Perfil publico em mobile |  |  |  |
| Estados vazios |  |  |  |
| Mensagens de erro |  |  |  |
| Mensagens de sucesso |  |  |  |
| Foco visivel e navegacao por teclado |  |  |  |
| Comportamento com `prefers-reduced-motion` |  |  |  |

## Bugs Encontrados

| Severidade | Area | Descricao | Arquivo ou rota | Status |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

## Decisao Final da Rodada

- Resultado final:
- Principais riscos:
- Pode seguir para uso interno:
- Pode seguir para producao:
