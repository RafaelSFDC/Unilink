# Billing

## Visao Geral

O projeto possui duas integracoes de pagamento:

- Stripe
- Mercado Pago

Ambas sao opcionais no sentido de configuracao local, mas necessarias para fluxos reais de cobranca.

Direcao oficial desta fase:

- Stripe e o fluxo principal de cobranca e gestao do plano `PRO`
- Mercado Pago e um fluxo alternativo e secundario
- a experiencia comercial do produto deve se orientar primeiro pelo Stripe

## Stripe

### Arquivos principais

- `lib/stripe.ts`
- `app/api/stripe/checkout/route.ts`
- `app/api/webhooks/stripe/route.ts`
- `components/billing-page.tsx`

### Fluxo

1. usuario acessa billing no dashboard
2. front chama `GET /api/stripe/checkout`
3. se ja existir `stripeCustomerId`, abre portal de billing
4. caso contrario, cria uma sessao de checkout de assinatura
5. webhook confirma pagamento e atualiza o usuario

### Campos atualizados no usuario

- `stripeCustomerId`
- `stripeSubscriptionId`
- `stripePriceId`
- `stripeCurrentPeriodEnd`
- `plan`

### Variaveis

```env
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

## Mercado Pago

### Arquivos principais

- `lib/mercadopago.ts`
- `app/api/mercadopago/checkout/route.ts`
- `app/api/webhooks/mercadopago/route.ts`

### Fluxo

1. usuario acessa billing
2. front chama `GET /api/mercadopago/checkout`
3. backend cria uma preferencia
4. pagamento aprovado dispara webhook
5. usuario e promovido para `PRO`

### Variavel

```env
MERCADOPAGO_ACCESS_TOKEN=
```

## Estado Atual do Produto

- Stripe esta mais completo que Mercado Pago
- Mercado Pago hoje promove o usuario para `PRO`, mas nao possui um portal equivalente ao Stripe
- a modelagem principal de billing persistida esta mais orientada ao Stripe
- o produto deve comunicar isso com clareza em pricing, billing e documentacao
- a tela de billing deve explicitar que Stripe e o fluxo principal e Mercado Pago e uma alternativa secundaria

## Regras Importantes

- clientes de pagamento sao lazy-loaded para evitar quebra em tempo de import
- validacao de assinatura usa o plano e o periodo atual do Stripe
- o valor exibido no produto hoje e `R$ 10/mês`
- o caminho padrao de upgrade deve priorizar Stripe
- Mercado Pago pode continuar disponivel sem prometer equivalencia total ao Stripe nesta fase
- `docs/PRODUCT_LIMITS.md` e a fonte de verdade para beneficios do `FREE` e do `PRO`
- cancelamento e renovacao do Stripe devem refletir no status salvo do usuario via webhook

## Debitos Tecnicos Conhecidos

- Mercado Pago ainda nao possui ciclo de assinatura tao robusto quanto o Stripe dentro da modelagem atual
- a validacao manual do fluxo completo de cobranca ainda precisa ser repetida ao fechar a Fase 6
