# Limites e Regras de Produto

## Direção Oficial do Produto

O Unilink será tratado oficialmente como um produto focado em:

- criadores como público principal
- profissionais criativos e marcas pessoais como público secundário
- design e personalização como diferencial principal
- analytics úteis como diferencial secundário
- Stripe como billing principal
- Mercado Pago como billing secundário
- `R$ 10/mês` como preço de referência atual do plano `PRO`

## Planos

Atualmente o produto trabalha com dois estados:

- `FREE`
- `PRO`

## Matriz Oficial de Oferta

### FREE

- até 5 links
- perfil público por username
- personalização essencial
- templates básicos
- analytics essenciais
- marca Unilink visível

### PRO

- links ilimitados
- templates premium
- analytics avançados
- remoção da marca Unilink
- recursos extras de personalização
- experiência de upgrade prioritária

## Regras de Billing

- Stripe deve ser tratado como fluxo padrão de checkout e gestão do plano
- Mercado Pago permanece como alternativa secundária nesta fase
- Mercado Pago não precisa replicar toda a experiência de portal do Stripe agora
- toda copy comercial deve refletir essa diferença de maturidade entre as integrações

## Fonte Técnica Atual

As validações mais claras hoje estão em:

- `app/actions/links.ts`
- `lib/subscription.ts`
- `app/dashboard/billing/page.tsx`
- `components/billing-page.tsx`
- `app/page.tsx`

## Observação Importante

Este arquivo deve ser tratado como a fonte única de verdade para:

- limites do plano `FREE`
- benefícios do plano `PRO`
- direção oficial de billing
- critérios de alinhamento entre interface e documentação

## Username e Perfil Público

- username precisa ser único
- o perfil público depende de `isPublic = true`
- páginas públicas são servidas em `/{username}`

## Tema e Templates

- cada usuário pode ter um tema
- o tema guarda template, cores, fonte e presets
- templates disponíveis estão documentados em `TEMPLATES.md`
