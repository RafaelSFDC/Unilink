# Roadmap Estruturado do Unilink

## Objetivo

Este documento existe para servir como guia de execucao completo do projeto, do estado atual ate um produto final consistente.

Ele responde:

- qual produto estamos construindo
- em que ordem devemos trabalhar
- o que precisa ser feito em cada etapa
- quando cada etapa pode ser considerada concluida

## Decisoes Oficiais Desta Etapa

- O Unilink e um link-in-bio premium para criadores
- O diferencial principal do produto e design + personalizacao
- O diferencial secundario e analytics uteis
- O plano `FREE` permite ate 5 links
- O plano `PRO` oferece links ilimitados por `R$ 10/mês`
- Stripe e o billing principal
- Mercado Pago permanece como alternativa secundaria
- O escopo de fechamento vai ate a Fase 3 sem redesign amplo

## Produto Final Definido

### Visao do produto

O Unilink deve ser um **link-in-bio premium para criadores e profissionais**, com:

- setup rapido
- pagina publica forte visualmente
- gerenciamento simples de links
- personalizacao real
- analytics uteis
- plano PRO com valor claro

### Proposta de valor

**"A forma mais rapida de publicar uma pagina de links bonita, personalizavel e orientada a performance."**

### Publico principal

- criadores de conteudo
- freelancers
- designers
- musicos
- marcas pessoais

## Estado Atual Resumido

### Ja temos

- autenticacao com Clerk
- onboarding
- dashboard
- perfil publico por username
- CRUD de links
- sistema de templates
- temas personalizados
- billing com Stripe
- billing basico com Mercado Pago
- analytics internos
- integracao com PostHog
- lint, type-check e build passando
- documentacao tecnica inicial

### Ainda falta consolidar

- validacao manual final da jornada 0 a 3
- checklist operacional marcado com o estado real
- ultima passada para remover claims antigos fora da oferta atual

## Status Atual do Roadmap

- `Fase 0`: consolidada tecnicamente e documentalmente
- `Fase 1`: consolidada em posicionamento, docs e copy principal
- `Fase 2`: consolidada em regras oficiais e telas principais
- `Fase 3`: implementada tecnicamente; validacao manual completa ainda precisa ser executada
- `Fases 4` a `8`: seguem abertas para implementacao futura

## Regras de Uso Deste Roadmap

- so avancar de fase quando os criterios de saida estiverem atendidos
- registrar decisoes de produto quando houver mudancas de escopo
- manter `README.md` e `docs/` alinhados conforme o projeto evoluir
- usar este arquivo como checklist operacional principal

## Sequencia de Execucao

1. Fase 0: Preparacao e alinhamento
2. Fase 1: Definicao oficial do produto
3. Fase 2: Estruturacao dos planos e monetizacao
4. Fase 3: Nucleo do fluxo do usuario
5. Fase 4: Tema, templates e identidade visual
6. Fase 5: Analytics e inteligencia do produto
7. Fase 6: Billing e operacao comercial
8. Fase 7: Polimento final de UX e confiabilidade
9. Fase 8: Organizacao para continuidade

---

## Fase 0: Preparacao e Alinhamento

### Objetivo

Criar uma base estavel de trabalho para que o roadmap possa ser executado sem confusao.

### Checklist

- [x] confirmar que `lint`, `type-check` e `build` continuam passando antes de cada ciclo grande
- [x] manter `README.md` como porta de entrada do projeto
- [x] manter `docs/README.md` como indice oficial de documentacao
- [x] definir este arquivo como roadmap principal do time
- [x] registrar em algum lugar as decisoes de produto que surgirem durante a execucao

### Entregaveis

- base documental unificada
- baseline tecnica estavel
- referencia clara do plano de execucao

### Criterio de saida

O time sabe onde esta a documentacao, onde esta o roadmap e quais checks minimos precisam passar antes de avancar.

---

## Fase 1: Definicao Oficial do Produto

### Objetivo

Definir exatamente o que o Unilink e, para quem serve e por que alguem pagaria por ele.

### Checklist

- [x] definir uma frase oficial de posicionamento
- [x] definir a persona principal
- [x] definir a persona secundaria
- [x] escolher o foco principal do produto:
  - [x] criadores
  - [ ] profissionais independentes
  - [ ] marcas pessoais
- [x] definir a promessa principal da landing page
- [x] definir os tres maiores diferenciais do produto
- [x] decidir o que o produto nao vai tentar ser agora
- [x] documentar essa definicao em `docs/PRODUCT_LIMITS.md` ou documento complementar

### Perguntas que precisam ser respondidas

- por que alguem escolheria o Unilink em vez de um concorrente generico?
- o principal diferencial e design, analytics ou simplicidade?
- o produto quer vender “presenca digital bonita” ou “performance e conversao”?

### Entregaveis

- visao final do produto
- proposta de valor final
- escopo claramente delimitado

### Criterio de saida

Qualquer pessoa do time consegue explicar o produto em 30 segundos sem contradicao.

---

## Fase 2: Estruturacao dos Planos e Monetizacao

### Objetivo

Definir oficialmente o que pertence ao FREE e o que pertence ao PRO.

### Checklist

- [x] listar todas as funcionalidades atuais do produto
- [x] marcar o que e FREE
- [x] marcar o que e PRO
- [x] definir os limites objetivos do plano FREE
- [x] definir os ganhos objetivos do plano PRO
- [x] revisar o preco atual e confirmar se `R$ 10/mês` continua fazendo sentido
- [x] alinhar a matriz de planos nestes pontos:
  - [x] landing
  - [x] pagina de pricing
  - [x] billing
  - [x] dashboard
  - [x] documentacao
- [x] revisar `docs/PRODUCT_LIMITS.md` como fonte oficial

### Checklist de decisao de features

- [x] links ilimitados
- [x] templates premium
- [x] analytics avancados
- [x] remocao de marca
- [x] features de personalizacao extra
- [ ] suporte prioritario

### Entregaveis

- matriz FREE vs PRO consolidada
- copy coerente sobre planos
- base de monetizacao mais previsivel

### Criterio de saida

Nao existe mais divergencia entre codigo, UI e docs sobre o que cada plano oferece.

---

## Fase 3: Nucleo do Fluxo do Usuario

### Objetivo

Garantir que o fluxo principal do produto funcione de ponta a ponta sem atrito.

### Fluxo alvo

1. usuario entra
2. autentica
3. passa pelo onboarding
4. configura perfil
5. cria links
6. personaliza a pagina
7. publica
8. compartilha

### Checklist

- [x] revisar a experiencia de login
- [x] revisar a criacao do usuario local no onboarding
- [x] revisar a validacao de username
- [x] revisar o redirecionamento apos onboarding
- [x] revisar o dashboard inicial
- [x] revisar a criacao de links
- [x] revisar a edicao de links
- [x] revisar a exclusao de links
- [x] revisar a ativacao/inativacao de links
- [x] revisar a visibilidade publica do perfil
- [x] revisar o fluxo do perfil publico no navegador
- [x] revisar os estados vazios principais
- [x] revisar mensagens de erro do fluxo principal

### Checklist de qualidade

- [ ] usuario novo consegue publicar o primeiro perfil sem ajuda
- [x] nenhuma tela principal depende de conhecimento implicito
- [x] mensagens criticas estao claras
- [x] links internos da jornada principal estao corretos

### Entregaveis

- jornada principal confiavel
- menos atrito de onboarding ate publicacao

### Criterio de saida

Um usuario novo consegue sair do zero e colocar seu perfil no ar sem bloqueios.

### Validacao Manual Obrigatoria

1. login sem usuario local redireciona para `/onboarding`
2. onboarding cria usuario e tema padrao e leva ao `/dashboard`
3. onboarding bloqueia username indisponivel com mensagem clara
4. settings permite trocar username valido e bloqueia conflito
5. alternar perfil publico faz `/{username}` aparecer e sumir corretamente
6. usuario `FREE` cria ate 5 links e recebe bloqueio no sexto
7. usuario cria, edita, remove, ativa e desativa links sem quebrar a lista
8. reordenacao reflete no dashboard e na pagina publica
9. pagina publica mostra apenas links ativos e respeita a ordem
10. navegacao dashboard -> links/settings/theme/perfil publico nao tem becos sem saida

---

## Fase 4: Tema, Templates e Identidade Visual

### Objetivo

Transformar personalizacao em um diferencial real, e nao so em uma lista de opcoes.

### Checklist

- [ ] auditar todos os templates existentes
- [ ] definir quais templates sao realmente de qualidade final
- [ ] revisar consistencia visual entre templates
- [ ] revisar consistencia tecnica entre preview e pagina publica
- [ ] revisar presets de:
  - [ ] fonte
  - [ ] cor
  - [ ] tipo de fundo
  - [ ] motion
  - [ ] interaction
- [ ] validar quais templates entram no FREE
- [ ] validar quais templates entram no PRO
- [ ] revisar a experiencia de escolha no dashboard
- [ ] revisar a documentacao em `docs/TEMPLATES.md`

### Checklist de aceitacao

- [ ] cada template tem proposta visual clara
- [ ] nao existem templates “so para fazer volume”
- [ ] o preview representa fielmente o resultado final
- [ ] o tema salvo aparece corretamente na pagina publica

### Entregaveis

- biblioteca de templates confiavel
- personalizacao com valor perceptivel

### Criterio de saida

Os templates passam a ser um motivo real para usar e pagar pelo produto.

---

## Fase 5: Analytics e Inteligencia do Produto

### Objetivo

Fazer as metricas do produto serem confiaveis, compreensiveis e uteis.

### Checklist

- [ ] revisar os eventos de view
- [ ] revisar os eventos de click
- [ ] confirmar a semantica da tabela `Analytics`
- [ ] confirmar a semantica da tabela `Click`
- [ ] levantar necessidade de saneamento historico
- [ ] definir oficialmente:
  - [ ] o que conta como visualizacao
  - [ ] o que conta como clique
  - [ ] o que conta como conversao
- [ ] separar visualmente metricas internas e metricas PostHog
- [ ] padronizar periodos dos cards
- [ ] revisar a tela `dashboard/analytics`
- [ ] revisar `docs/ANALYTICS.md`

### Checklist de UX

- [ ] usuario entende de onde veio cada numero
- [ ] usuario entende o periodo de cada metrica
- [ ] usuario entende a diferenca entre dado interno e PostHog
- [ ] a conversao nao mistura metricas incompativeis

### Entregaveis

- analytics confiaveis
- dashboard de metricas mais claro

### Criterio de saida

As metricas passam a ser interpretaveis sem ambiguidade.

---

## Fase 6: Billing e Operacao Comercial

### Objetivo

Deixar o pagamento e a operacao do plano PRO consistentes e claros.

### Checklist

- [ ] revisar a pagina de billing
- [ ] revisar a copy de upgrade
- [ ] revisar o fluxo de checkout Stripe
- [ ] revisar o portal Stripe
- [ ] revisar os webhooks Stripe
- [ ] revisar o fluxo Mercado Pago
- [ ] revisar os webhooks Mercado Pago
- [ ] definir qual e o nivel de suporte oficial do Mercado Pago no produto
- [ ] revisar estados do usuario apos pagamento
- [ ] revisar estado do usuario apos falha/cancelamento
- [ ] alinhar a documentacao em `docs/BILLING.md`

### Checklist de decisao

- [ ] Stripe sera o fluxo principal?
- [ ] Mercado Pago sera alternativo ou equivalente?
- [ ] cancelamento sera self-service ou assistido?
- [ ] como o status PRO sera comunicado no dashboard?

### Entregaveis

- monetizacao mais confiavel
- billing mais coerente com a proposta comercial

### Criterio de saida

O usuario entende como assinar, o que recebe e como seu plano e gerenciado.

---

## Fase 7: Polimento Final de UX e Confiabilidade

### Objetivo

Melhorar a percepcao de qualidade do produto como um todo.

### Checklist

- [ ] revisar textos de feedback
- [ ] revisar loading states
- [ ] revisar estados de erro
- [ ] revisar estados vazios
- [ ] revisar acessibilidade das telas principais
- [ ] revisar links externos e internos
- [ ] revisar responsividade de:
  - [ ] landing
  - [ ] dashboard
  - [ ] billing
  - [ ] analytics
  - [ ] perfil publico
- [ ] revisar performance das rotas mais pesadas
- [ ] revisar bundle da tela de analytics

### Checklist de sensacao de produto

- [ ] a aplicacao parece consistente
- [ ] a aplicacao parece confiavel
- [ ] as principais telas parecem “finalizadas”
- [ ] o produto transmite valor premium

### Entregaveis

- UX mais solida
- percepcao de qualidade maior

### Criterio de saida

O produto parece coeso e bem acabado de ponta a ponta.

---

## Fase 8: Organizacao para Continuidade

### Objetivo

Garantir que o projeto possa continuar evoluindo no futuro sem perda de contexto.

### Checklist

- [ ] revisar se toda decisao importante virou documentacao
- [ ] garantir que `README.md` esteja atualizado
- [ ] garantir que `docs/` continue sendo fonte de verdade
- [ ] revisar o backlog restante
- [ ] separar backlog em:
  - [ ] curto prazo
  - [ ] medio prazo
  - [ ] experimentos
- [ ] documentar pendencias tecnicas que ficaram para depois
- [ ] documentar oportunidades futuras fora do escopo atual

### Entregaveis

- projeto documentado
- backlog pos-lancamento mais claro
- menor dependencia de memoria do time

### Criterio de saida

O time consegue pausar e retomar o projeto sem perder direcao.

---

## Checklist Mestre

### Produto

- [x] visao do produto definida
- [x] persona principal definida
- [x] proposta de valor definida
- [x] escopo do produto definido

### Planos

- [x] FREE definido
- [x] PRO definido
- [x] copy de monetizacao alinhada

### Experiencia principal

- [x] onboarding confiavel
- [x] links confiaveis
- [x] perfil publico confiavel
- [ ] personalizacao confiavel

### Analytics

- [ ] metricas claras
- [ ] origem dos dados clara
- [ ] conversao confiavel

### Billing

- [ ] Stripe validado
- [ ] Mercado Pago validado
- [x] upgrade compreensivel

### Polimento

- [x] estados vazios revisados
- [x] erros revisados
- [ ] loading revisado
- [ ] responsividade revisada
- [ ] acessibilidade revisada

### Continuidade

- [x] docs alinhadas
- [ ] backlog organizado
- [x] proximas prioridades definidas

---

## Ordem Recomendada de Trabalho

Se for executar sem paralelizar muita coisa, a ordem recomendada e:

1. Fase 4
2. Fase 5
3. Fase 6
4. Fase 7
5. Fase 8

## Observacao Final

Se em algum momento surgir duvida de prioridade, a regra deve ser:

1. primeiro clareza de produto
2. depois fluxo principal
3. depois monetizacao e analytics
4. por fim polimento e expansao
