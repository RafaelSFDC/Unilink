# Documentacao do Unilink

Este diretorio concentra a documentacao tecnica e operacional do projeto.

## Fonte de Verdade

Para o estado atual do projeto, estes arquivos mandam no projeto:

- `docs/PRODUCT_ROADMAP.md` para status, criterio de saida e ordem de execucao
- `docs/PRODUCT_LIMITS.md` para regras oficiais de produto e matriz `FREE` vs `PRO`
- `docs/BILLING.md` para direcao comercial e papel de Stripe / Mercado Pago
- `docs/CONTINUITY_BACKLOG.md` para proximos passos, debitos e oportunidades apos o fechamento do roadmap
- `README.md` como porta de entrada do repositorio

## Indice

- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [SETUP.md](./SETUP.md)
- [BILLING.md](./BILLING.md)
- [ANALYTICS.md](./ANALYTICS.md)
- [PRODUCT_LIMITS.md](./PRODUCT_LIMITS.md)
- [PRODUCT_ROADMAP.md](./PRODUCT_ROADMAP.md)
- [MANUAL_VALIDATION_ROADMAP.md](./MANUAL_VALIDATION_ROADMAP.md)
- [QA_CHECKLIST.md](./QA_CHECKLIST.md)
- [CONTINUITY_BACKLOG.md](./CONTINUITY_BACKLOG.md)
- [TEMPLATES.md](./TEMPLATES.md)
- [TECHNICAL_AUDIT.md](./TECHNICAL_AUDIT.md)

## Ordem Recomendada de Leitura

1. `README.md` para visao geral do repositorio
2. `SETUP.md` para subir o projeto
3. `PRODUCT_LIMITS.md` para regras de negocio e oferta
4. `PRODUCT_ROADMAP.md` para o estado de execucao do produto
5. `MANUAL_VALIDATION_ROADMAP.md` para tudo que ainda depende de teste humano
6. `QA_CHECKLIST.md` para executar uma rodada de QA sem ambiguidade
7. `CONTINUITY_BACKLOG.md` para o que vem depois
8. `BILLING.md` e `ANALYTICS.md` para integracoes e metricas

## Regra Geral

Se houver divergencia entre documentacao antiga, interface e estes arquivos, considere `docs/` como a fonte de verdade atual e ajuste a interface para refletir isso.
