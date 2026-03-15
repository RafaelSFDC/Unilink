# Limites e Regras de Produto

## Planos

Atualmente o produto trabalha com dois estados:

- `FREE`
- `PRO`

## Regras de Links

### FREE

- até 5 links

### PRO

- links ilimitados

## Recursos Relacionados ao PRO

Hoje a experiência e a copy do produto indicam PRO para:

- templates premium
- analytics mais avançados
- remoção da marca Unilink
- recursos extras de personalização

## Fonte Técnica Atual

As validações mais claras hoje estão em:

- `app/actions/links.ts`
- `lib/subscription.ts`
- `app/dashboard/billing/page.tsx`
- `components/billing-page.tsx`
- `app/page.tsx`

## Observação Importante

Ainda existe variação entre:

- landing
- billing
- dashboard
- documentação antiga

Por isso, este arquivo deve ser tratado como a referência atual até que os textos da interface sejam harmonizados.

## Username e Perfil Público

- username precisa ser único
- o perfil público depende de `isPublic = true`
- páginas públicas são servidas em `/{username}`

## Tema e Templates

- cada usuário pode ter um tema
- o tema guarda template, cores, fonte e presets
- templates disponíveis estão documentados em `TEMPLATES.md`
