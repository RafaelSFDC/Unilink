# Roadmap Estruturado do Unilink

## Objetivo

Este documento existe para servir como guia de execução completo do projeto, do estado atual até um produto final consistente.

Ele responde:

- qual produto estamos construindo
- em que ordem devemos trabalhar
- o que precisa ser feito em cada etapa
- quando cada etapa pode ser considerada concluída

## Produto Final Definido

### Visão do produto

O Unilink deve ser um **link-in-bio premium para criadores e profissionais**, com:

- setup rápido
- página pública forte visualmente
- gerenciamento simples de links
- personalização real
- analytics úteis
- plano PRO com valor claro

### Proposta de valor

**"A forma mais rápida de publicar uma página de links bonita, personalizável e orientada a performance."**

### Público principal

- criadores de conteúdo
- freelancers
- designers
- músicos
- marcas pessoais

## Estado Atual Resumido

### Já temos

- autenticação com Clerk
- onboarding
- dashboard
- perfil público por username
- CRUD de links
- sistema de templates
- temas personalizados
- billing com Stripe
- billing básico com Mercado Pago
- analytics internos
- integração com PostHog
- lint, type-check e build passando
- documentação técnica inicial

### Ainda falta consolidar

- posicionamento final do produto
- matriz FREE vs PRO oficial
- copy consistente
- analytics coerentes na interface
- billing mais redondo
- polimento de UX
- processo de continuidade mais claro

## Regras de Uso Deste Roadmap

- só avançar de fase quando os critérios de saída estiverem atendidos
- registrar decisões de produto quando houver mudanças de escopo
- manter `README.md` e `docs/` alinhados conforme o projeto evoluir
- usar este arquivo como checklist operacional principal

## Sequência de Execução

1. Fase 0: Preparação e alinhamento
2. Fase 1: Definição oficial do produto
3. Fase 2: Estruturação dos planos e monetização
4. Fase 3: Núcleo do fluxo do usuário
5. Fase 4: Tema, templates e identidade visual
6. Fase 5: Analytics e inteligência do produto
7. Fase 6: Billing e operação comercial
8. Fase 7: Polimento final de UX e confiabilidade
9. Fase 8: Organização para continuidade

---

## Fase 0: Preparação e Alinhamento

### Objetivo

Criar uma base estável de trabalho para que o roadmap possa ser executado sem confusão.

### Checklist

- [ ] confirmar que `lint`, `type-check` e `build` continuam passando antes de cada ciclo grande
- [ ] manter `README.md` como porta de entrada do projeto
- [ ] manter `docs/README.md` como índice oficial de documentação
- [ ] definir este arquivo como roadmap principal do time
- [ ] registrar em algum lugar as decisões de produto que surgirem durante a execução

### Entregáveis

- base documental unificada
- baseline técnica estável
- referência clara do plano de execução

### Critério de saída

O time sabe onde está a documentação, onde está o roadmap e quais checks mínimos precisam passar antes de avançar.

---

## Fase 1: Definição Oficial do Produto

### Objetivo

Definir exatamente o que o Unilink é, para quem serve e por que alguém pagaria por ele.

### Checklist

- [ ] definir uma frase oficial de posicionamento
- [ ] definir a persona principal
- [ ] definir a persona secundária
- [ ] escolher o foco principal do produto:
  - [ ] criadores
  - [ ] profissionais independentes
  - [ ] marcas pessoais
- [ ] definir a promessa principal da landing page
- [ ] definir os três maiores diferenciais do produto
- [ ] decidir o que o produto não vai tentar ser agora
- [ ] documentar essa definição em `docs/PRODUCT_LIMITS.md` ou documento complementar

### Perguntas que precisam ser respondidas

- por que alguém escolheria o Unilink em vez de um concorrente genérico?
- o principal diferencial é design, analytics ou simplicidade?
- o produto quer vender “presença digital bonita” ou “performance e conversão”?

### Entregáveis

- visão final do produto
- proposta de valor final
- escopo claramente delimitado

### Critério de saída

Qualquer pessoa do time consegue explicar o produto em 30 segundos sem contradição.

---

## Fase 2: Estruturação dos Planos e Monetização

### Objetivo

Definir oficialmente o que pertence ao FREE e o que pertence ao PRO.

### Checklist

- [ ] listar todas as funcionalidades atuais do produto
- [ ] marcar o que é FREE
- [ ] marcar o que é PRO
- [ ] definir os limites objetivos do plano FREE
- [ ] definir os ganhos objetivos do plano PRO
- [ ] revisar o preço atual e confirmar se `R$ 10/mês` continua fazendo sentido
- [ ] alinhar a matriz de planos nestes pontos:
  - [ ] landing
  - [ ] página de pricing
  - [ ] billing
  - [ ] dashboard
  - [ ] documentação
- [ ] revisar `docs/PRODUCT_LIMITS.md` como fonte oficial

### Checklist de decisão de features

- [ ] links ilimitados
- [ ] templates premium
- [ ] analytics avançados
- [ ] remoção de marca
- [ ] features de personalização extra
- [ ] suporte prioritário

### Entregáveis

- matriz FREE vs PRO consolidada
- copy coerente sobre planos
- base de monetização mais previsível

### Critério de saída

Não existe mais divergência entre código, UI e docs sobre o que cada plano oferece.

---

## Fase 3: Núcleo do Fluxo do Usuário

### Objetivo

Garantir que o fluxo principal do produto funcione de ponta a ponta sem atrito.

### Fluxo alvo

1. usuário entra
2. autentica
3. passa pelo onboarding
4. configura perfil
5. cria links
6. personaliza a página
7. publica
8. compartilha

### Checklist

- [ ] revisar a experiência de login
- [ ] revisar a criação do usuário local no onboarding
- [ ] revisar a validação de username
- [ ] revisar o redirecionamento após onboarding
- [ ] revisar o dashboard inicial
- [ ] revisar a criação de links
- [ ] revisar a edição de links
- [ ] revisar a exclusão de links
- [ ] revisar a ativação/inativação de links
- [ ] revisar a visibilidade pública do perfil
- [ ] revisar o fluxo do perfil público no navegador
- [ ] revisar os estados vazios principais
- [ ] revisar mensagens de erro do fluxo principal

### Checklist de qualidade

- [ ] usuário novo consegue publicar o primeiro perfil sem ajuda
- [ ] nenhuma tela principal depende de conhecimento implícito
- [ ] mensagens críticas estão claras
- [ ] links internos da jornada principal estão corretos

### Entregáveis

- jornada principal confiável
- menos atrito de onboarding até publicação

### Critério de saída

Um usuário novo consegue sair do zero e colocar seu perfil no ar sem bloqueios.

---

## Fase 4: Tema, Templates e Identidade Visual

### Objetivo

Transformar personalização em um diferencial real, e não só em uma lista de opções.

### Checklist

- [ ] auditar todos os templates existentes
- [ ] definir quais templates são realmente de qualidade final
- [ ] revisar consistência visual entre templates
- [ ] revisar consistência técnica entre preview e página pública
- [ ] revisar presets de:
  - [ ] fonte
  - [ ] cor
  - [ ] tipo de fundo
  - [ ] motion
  - [ ] interaction
- [ ] validar quais templates entram no FREE
- [ ] validar quais templates entram no PRO
- [ ] revisar a experiência de escolha no dashboard
- [ ] revisar a documentação em `docs/TEMPLATES.md`

### Checklist de aceitação

- [ ] cada template tem proposta visual clara
- [ ] não existem templates “só para fazer volume”
- [ ] o preview representa fielmente o resultado final
- [ ] o tema salvo aparece corretamente na página pública

### Entregáveis

- biblioteca de templates confiável
- personalização com valor perceptível

### Critério de saída

Os templates passam a ser um motivo real para usar e pagar pelo produto.

---

## Fase 5: Analytics e Inteligência do Produto

### Objetivo

Fazer as métricas do produto serem confiáveis, compreensíveis e úteis.

### Checklist

- [ ] revisar os eventos de view
- [ ] revisar os eventos de click
- [ ] confirmar a semântica da tabela `Analytics`
- [ ] confirmar a semântica da tabela `Click`
- [ ] levantar necessidade de saneamento histórico
- [ ] definir oficialmente:
  - [ ] o que conta como visualização
  - [ ] o que conta como clique
  - [ ] o que conta como conversão
- [ ] separar visualmente métricas internas e métricas PostHog
- [ ] padronizar períodos dos cards
- [ ] revisar a tela `dashboard/analytics`
- [ ] revisar `docs/ANALYTICS.md`

### Checklist de UX

- [ ] usuário entende de onde veio cada número
- [ ] usuário entende o período de cada métrica
- [ ] usuário entende a diferença entre dado interno e PostHog
- [ ] a conversão não mistura métricas incompatíveis

### Entregáveis

- analytics confiáveis
- dashboard de métricas mais claro

### Critério de saída

As métricas passam a ser interpretáveis sem ambiguidade.

---

## Fase 6: Billing e Operação Comercial

### Objetivo

Deixar o pagamento e a operação do plano PRO consistentes e claros.

### Checklist

- [ ] revisar a página de billing
- [ ] revisar a copy de upgrade
- [ ] revisar o fluxo de checkout Stripe
- [ ] revisar o portal Stripe
- [ ] revisar os webhooks Stripe
- [ ] revisar o fluxo Mercado Pago
- [ ] revisar os webhooks Mercado Pago
- [ ] definir qual é o nível de suporte oficial do Mercado Pago no produto
- [ ] revisar estados do usuário após pagamento
- [ ] revisar estado do usuário após falha/cancelamento
- [ ] alinhar a documentação em `docs/BILLING.md`

### Checklist de decisão

- [ ] Stripe será o fluxo principal?
- [ ] Mercado Pago será alternativo ou equivalente?
- [ ] cancelamento será self-service ou assistido?
- [ ] como o status PRO será comunicado no dashboard?

### Entregáveis

- monetização mais confiável
- billing mais coerente com a proposta comercial

### Critério de saída

O usuário entende como assinar, o que recebe e como seu plano é gerenciado.

---

## Fase 7: Polimento Final de UX e Confiabilidade

### Objetivo

Melhorar a percepção de qualidade do produto como um todo.

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
  - [ ] perfil público
- [ ] revisar performance das rotas mais pesadas
- [ ] revisar bundle da tela de analytics

### Checklist de sensação de produto

- [ ] a aplicação parece consistente
- [ ] a aplicação parece confiável
- [ ] as principais telas parecem “finalizadas”
- [ ] o produto transmite valor premium

### Entregáveis

- UX mais sólida
- percepção de qualidade maior

### Critério de saída

O produto parece coeso e bem acabado de ponta a ponta.

---

## Fase 8: Organização para Continuidade

### Objetivo

Garantir que o projeto possa continuar evoluindo no futuro sem perda de contexto.

### Checklist

- [ ] revisar se toda decisão importante virou documentação
- [ ] garantir que `README.md` esteja atualizado
- [ ] garantir que `docs/` continue sendo fonte de verdade
- [ ] revisar o backlog restante
- [ ] separar backlog em:
  - [ ] curto prazo
  - [ ] médio prazo
  - [ ] experimentos
- [ ] documentar pendências técnicas que ficaram para depois
- [ ] documentar oportunidades futuras fora do escopo atual

### Entregáveis

- projeto documentado
- backlog pós-lançamento mais claro
- menor dependência de memória do time

### Critério de saída

O time consegue pausar e retomar o projeto sem perder direção.

---

## Checklist Mestre

### Produto

- [ ] visão do produto definida
- [ ] persona principal definida
- [ ] proposta de valor definida
- [ ] escopo do produto definido

### Planos

- [ ] FREE definido
- [ ] PRO definido
- [ ] copy de monetização alinhada

### Experiência principal

- [ ] onboarding confiável
- [ ] links confiáveis
- [ ] perfil público confiável
- [ ] personalização confiável

### Analytics

- [ ] métricas claras
- [ ] origem dos dados clara
- [ ] conversão confiável

### Billing

- [ ] Stripe validado
- [ ] Mercado Pago validado
- [ ] upgrade compreensível

### Polimento

- [ ] estados vazios revisados
- [ ] erros revisados
- [ ] loading revisado
- [ ] responsividade revisada
- [ ] acessibilidade revisada

### Continuidade

- [ ] docs alinhadas
- [ ] backlog organizado
- [ ] próximas prioridades definidas

---

## Ordem Recomendada de Trabalho

Se for executar sem paralelizar muita coisa, a ordem recomendada é:

1. Fase 1
2. Fase 2
3. Fase 3
4. Fase 4
5. Fase 5
6. Fase 6
7. Fase 7
8. Fase 8

## Observação Final

Se em algum momento surgir dúvida de prioridade, a regra deve ser:

1. primeiro clareza de produto
2. depois fluxo principal
3. depois monetização e analytics
4. por fim polimento e expansão
