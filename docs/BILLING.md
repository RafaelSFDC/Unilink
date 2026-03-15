# Billing

## Visão Geral

O projeto possui duas integrações de pagamento:

- Stripe
- Mercado Pago

Ambas são opcionais no sentido de configuração local, mas necessárias para fluxos reais de cobrança.

## Stripe

### Arquivos principais

- `lib/stripe.ts`
- `app/api/stripe/checkout/route.ts`
- `app/api/webhooks/stripe/route.ts`
- `components/billing-page.tsx`

### Fluxo

1. usuário acessa billing no dashboard
2. front chama `GET /api/stripe/checkout`
3. se já existir `stripeCustomerId`, abre portal de billing
4. caso contrário, cria uma sessão de checkout de assinatura
5. webhook confirma pagamento e atualiza o usuário

### Campos atualizados no usuário

- `stripeCustomerId`
- `stripeSubscriptionId`
- `stripePriceId`
- `stripeCurrentPeriodEnd`
- `plan`

### Variáveis

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

1. usuário acessa billing
2. front chama `GET /api/mercadopago/checkout`
3. backend cria uma preferência
4. pagamento aprovado dispara webhook
5. usuário é promovido para `PRO`

### Variável

```env
MERCADOPAGO_ACCESS_TOKEN=
```

## Estado Atual do Produto

- Stripe está mais completo que Mercado Pago
- Mercado Pago hoje promove o usuário para `PRO`, mas não possui um portal equivalente ao Stripe
- a modelagem principal de billing persistida está mais orientada ao Stripe

## Regras Importantes

- clientes de pagamento são lazy-loaded para evitar quebra em tempo de import
- validação de assinatura usa o plano e o período atual do Stripe
- o valor exibido no produto hoje é `R$ 10/mês`

## Débitos Técnicos Conhecidos

- falta centralizar a definição de planos e benefícios em uma única fonte de verdade
- Mercado Pago ainda não possui ciclo de assinatura tão robusto quanto o Stripe dentro da modelagem atual
- a copy de billing ainda varia em algumas telas
