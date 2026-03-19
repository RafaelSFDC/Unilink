# Roadmap de Validacao Manual

## Objetivo

Este documento existe para concentrar tudo o que ainda precisa ser testado, conferido e validado manualmente no produto.

Ele deve ser usado separadamente do roadmap principal de implementacao.

## Regra de Uso

- este roadmap nao substitui `lint`, `type-check` e `build`
- este roadmap deve ser executado em ambiente real ou o mais proximo possivel de producao
- cada item validado deve registrar resultado, data e observacoes
- bugs encontrados aqui devem voltar para o backlog normal do projeto

## Preparacao do Ambiente

Antes de iniciar:

- confirmar que a branch atual esta com `pnpm run lint`, `pnpm run type-check` e `pnpm run build` passando
- confirmar variaveis de ambiente necessarias para Clerk, banco, Stripe, Mercado Pago e PostHog
- preparar pelo menos uma conta `FREE`
- preparar pelo menos uma conta `PRO`
- preparar um usuario sem cadastro local para validar onboarding

## Bloco 1: Jornada Principal

### Objetivo

Validar se um usuario novo consegue sair do zero e publicar sua pagina sem ajuda.

### Checklist

- [ ] login sem usuario local redireciona para `/onboarding`
- [ ] onboarding cria usuario e tema padrao
- [ ] onboarding leva corretamente ao `/dashboard`
- [ ] onboarding bloqueia username indisponivel com mensagem clara
- [ ] onboarding bloqueia username invalido com mensagem clara
- [ ] settings permite trocar username disponivel
- [ ] settings bloqueia username em uso
- [ ] alternar perfil publico faz `/{username}` aparecer e sumir corretamente
- [ ] dashboard oferece caminho claro para links, tema, settings e perfil publico

### Evidencias esperadas

- screenshots ou anotacoes curtas por passo
- resultado final com URL publica funcional

## Bloco 2: Links e Publicacao

### Objetivo

Validar o CRUD completo de links e seu reflexo na pagina publica.

### Checklist

- [ ] usuario `FREE` cria ate 5 links com sucesso
- [ ] usuario `FREE` recebe bloqueio claro no sexto link
- [ ] usuario `PRO` consegue criar links ilimitados sem bloqueio artificial
- [ ] usuario consegue editar titulo e URL de um link existente
- [ ] usuario consegue ativar e desativar links
- [ ] usuario consegue remover links sem quebrar a lista
- [ ] reordenacao funciona no dashboard
- [ ] reordenacao reflete corretamente na pagina publica
- [ ] pagina publica mostra apenas links ativos
- [ ] pagina publica respeita a ordem persistida

### Evidencias esperadas

- antes e depois da ordenacao
- confirmacao visual da pagina publica

## Bloco 3: Tema e Templates

### Objetivo

Validar se a personalizacao realmente se comporta como o produto promete.

### Checklist

- [ ] usuario `FREE` consegue selecionar `default`
- [ ] usuario `FREE` consegue selecionar `minimal`
- [ ] usuario `FREE` e bloqueado ao tentar template `PRO`
- [ ] usuario `PRO` consegue selecionar todos os 6 templates
- [ ] preview do dashboard representa corretamente o template salvo
- [ ] pagina publica reflete template, cores, fonte, motion e interaction
- [ ] troca de template nao quebra links, avatar ou bio
- [ ] a documentacao de templates continua compatível com a interface real

## Bloco 4: Analytics

### Objetivo

Validar leitura, origem e comportamento das metricas em ambiente real.

### Checklist

- [ ] dashboard de analytics identifica origem e periodo de cada card
- [ ] bloco de tendencias usa PostHog com clareza
- [ ] bloco de metricas internas usa dados locais com clareza
- [ ] ausencia de dados do PostHog nao quebra a tela
- [ ] clique em link reflete na agregacao interna esperada
- [ ] view da pagina publica continua sendo registrada
- [ ] conversao nao mistura fontes incompativeis
- [ ] usuario entende o significado de cada numero sem apoio externo

### Evidencias esperadas

- capturas de tela da dashboard de analytics
- comparacao entre acao executada e dado refletido

## Bloco 5: Billing

### Objetivo

Validar os fluxos comerciais reais do plano `PRO`.

### Checklist Stripe

- [ ] CTA principal de upgrade leva ao fluxo Stripe
- [ ] checkout Stripe abre corretamente
- [ ] compra aprovada promove o usuario para `PRO`
- [ ] billing page reflete status do plano apos pagamento
- [ ] portal Stripe abre para quem ja e assinante
- [ ] cancelamento via Stripe reflete no status do usuario
- [ ] renovacao ou update da assinatura mantem o plano coerente

### Checklist Mercado Pago

- [ ] CTA alternativo do Mercado Pago abre corretamente
- [ ] pagamento aprovado promove o usuario para `PRO`
- [ ] retorno ao dashboard nao deixa estado confuso
- [ ] billing page comunica corretamente o papel secundario do Mercado Pago

### Checklist de UX comercial

- [ ] usuario entende o que recebe ao assinar
- [ ] usuario entende que Stripe e o fluxo principal
- [ ] usuario nao recebe promessa enganosa de equivalencia total com Mercado Pago

## Bloco 6: Polimento Final

### Objetivo

Validar a percepcao de qualidade nas telas mais importantes.

### Checklist

- [ ] revisar dashboard em desktop
- [ ] revisar dashboard em mobile
- [ ] revisar analytics em desktop
- [ ] revisar analytics em mobile
- [ ] revisar billing em desktop
- [ ] revisar billing em mobile
- [ ] revisar perfil publico em desktop
- [ ] revisar perfil publico em mobile
- [ ] revisar estados vazios
- [ ] revisar mensagens de erro
- [ ] revisar mensagens de sucesso
- [ ] revisar foco visivel e navegacao por teclado
- [ ] revisar comportamento com `prefers-reduced-motion`

## Critério de Encerramento

Este roadmap so pode ser considerado concluido quando:

- todos os blocos obrigatorios tiverem sido executados
- bugs encontrados estiverem registrados
- severidades estiverem atribuidas
- pendencias criticas tiverem voltado para o backlog do produto

## Registro de Resultado

Sugestao minima de registro por rodada:

- data da validacao
- ambiente usado
- responsavel
- blocos executados
- bugs encontrados
- decisao final: aprovado, aprovado com ressalvas ou reprovado
