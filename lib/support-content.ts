export interface SupportArticle {
  slug: string;
  title: string;
  description: string;
  category: string;
  audienceLabel: string;
  body: string[];
  bullets?: string[];
  relatedLinks?: Array<{
    label: string;
    href: string;
  }>;
}

export const helpArticles: SupportArticle[] = [
  {
    slug: "criar-primeira-pagina",
    title: "Como criar sua primeira pagina",
    description: "Fluxo rapido para sair do zero e publicar seu perfil.",
    category: "Primeiros Passos",
    audienceLabel: "Onboarding",
    body: [
      "Crie sua conta, entre no onboarding e escolha um username disponivel.",
      "Depois disso, complete nome, titulo e bio para deixar seu perfil pronto para ser publicado.",
      "Assim que o username estiver salvo, seu dashboard passa a liberar links, tema e pagina publica.",
    ],
    bullets: [
      "Crie a conta em /sign-up",
      "Finalize o onboarding",
      "Abra o dashboard",
      "Publique o primeiro link",
    ],
    relatedLinks: [
      { label: "Criar conta", href: "/sign-up" },
      { label: "Abrir dashboard", href: "/dashboard" },
    ],
  },
  {
    slug: "configurar-perfil",
    title: "Configurando seu perfil",
    description: "Ajuste username, bio, titulo e visibilidade publica.",
    category: "Primeiros Passos",
    audienceLabel: "Perfil",
    body: [
      "A tela de configuracoes centraliza as informacoes principais da sua identidade publica.",
      "Ali voce consegue editar username, nome exibido, bio, titulo e decidir se seu perfil fica publico ou privado.",
      "Sempre que o username muda, o link da sua pagina tambem muda.",
    ],
    relatedLinks: [{ label: "Ir para configuracoes", href: "/dashboard/settings" }],
  },
  {
    slug: "adicionar-links",
    title: "Adicionando seus primeiros links",
    description: "Como criar, editar, ativar e ordenar links do perfil.",
    category: "Gerenciamento de Links",
    audienceLabel: "Links",
    body: [
      "Use a area Meus Links para criar destinos principais como portfolio, redes sociais, loja ou agenda.",
      "Cada link pode ter titulo, URL, descricao opcional e icone para melhorar a leitura da pagina publica.",
      "No plano FREE existe limite de 5 links; no PRO, os links sao ilimitados.",
    ],
    bullets: [
      "Criar link novo",
      "Editar link existente",
      "Ativar ou desativar publicacao",
      "Reordenar para mudar prioridade visual",
    ],
    relatedLinks: [
      { label: "Gerenciar links", href: "/dashboard/links" },
      { label: "Criar novo link", href: "/dashboard/links/new" },
    ],
  },
  {
    slug: "personalizar-pagina",
    title: "Personalizando sua pagina",
    description: "Escolha template, cores, fontes e interacoes do perfil.",
    category: "Personalizacao",
    audienceLabel: "Tema",
    body: [
      "A personalizacao do Unilink combina templates curados com ajustes finos de cor, tipografia e movimento.",
      "No FREE voce pode usar templates base; no PRO entram os templates premium e mais liberdade visual.",
      "A area de preview do editor mostra o resultado antes da publicacao.",
    ],
    relatedLinks: [{ label: "Editar tema", href: "/dashboard/theme" }],
  },
  {
    slug: "entendendo-analytics",
    title: "Entendendo seus analytics",
    description: "Como ler views, cliques e tendencias sem confusao.",
    category: "Analytics",
    audienceLabel: "Dados",
    body: [
      "O dashboard separa metricas internas e leitura de tendencia para evitar misturar fontes diferentes.",
      "Views internas e cliques servem como base operacional da pagina; tendencias ajudam a entender ritmo recente.",
      "No plano PRO a tela de analytics ganha mais contexto para leitura de performance.",
    ],
    relatedLinks: [{ label: "Abrir analytics", href: "/dashboard/analytics" }],
  },
  {
    slug: "alterar-username",
    title: "Alterando seu username",
    description: "Troque o endereco da pagina com validacao de disponibilidade.",
    category: "Configuracoes",
    audienceLabel: "Conta",
    body: [
      "O username e validado em tempo real para evitar conflitos com outros perfis.",
      "Quando voce salva um novo username, o link publico muda e o perfil antigo deixa de ser o endereco principal.",
      "Antes de trocar, vale revisar links em bio de redes sociais ou materiais externos.",
    ],
    relatedLinks: [{ label: "Atualizar username", href: "/dashboard/settings" }],
  },
  {
    slug: "problemas-login",
    title: "Problemas de login",
    description: "Checklist rapido para recuperar acesso ou destravar a entrada.",
    category: "Solucao de Problemas",
    audienceLabel: "Acesso",
    body: [
      "Confirme se voce esta usando o mesmo email com que criou a conta.",
      "Se o acesso falhar repetidamente, tente sair e entrar de novo ou iniciar uma nova sessao limpa no navegador.",
      "Se ainda assim o problema continuar, use a pagina de contato para falar com suporte.",
    ],
    bullets: [
      "Verificar email e senha",
      "Tentar nova sessao",
      "Voltar para /sign-in",
      "Acionar suporte se persistir",
    ],
    relatedLinks: [
      { label: "Entrar", href: "/sign-in" },
      { label: "Falar com suporte", href: "/contact" },
    ],
  },
  {
    slug: "links-nao-funcionando",
    title: "Links nao funcionando",
    description: "O que revisar quando um destino nao abre como esperado.",
    category: "Solucao de Problemas",
    audienceLabel: "Links",
    body: [
      "Confira se a URL foi salva com http:// ou https://, porque links incompletos podem falhar.",
      "Revise se o link esta marcado como ativo e se ele aparece na lista do dashboard.",
      "Se estiver testando o preview do tema, lembre que o modo preview nao registra clique real.",
    ],
    relatedLinks: [{ label: "Revisar links", href: "/dashboard/links" }],
  },
];

export const docsArticles: SupportArticle[] = [
  {
    slug: "getting-started",
    title: "Inicio rapido do produto",
    description: "Resumo da jornada principal do Unilink em poucos passos.",
    category: "Getting Started",
    audienceLabel: "Produto",
    body: [
      "A jornada principal do produto e: criar conta, concluir onboarding, adicionar links, personalizar o visual e publicar a pagina.",
      "O dashboard foi organizado para cobrir exatamente esses passos sem depender de configuracoes avancadas.",
      "Se voce esta validando a base do projeto, esse e o melhor ponto de partida.",
    ],
    bullets: ["Conta", "Onboarding", "Links", "Tema", "Publicacao"],
    relatedLinks: [
      { label: "Criar conta", href: "/sign-up" },
      { label: "Abrir dashboard", href: "/dashboard" },
    ],
  },
  {
    slug: "billing-overview",
    title: "Como o billing funciona hoje",
    description: "Resumo do papel de Stripe e Mercado Pago na assinatura PRO.",
    category: "Operacao",
    audienceLabel: "Billing",
    body: [
      "Stripe e o fluxo principal de checkout e gestao da assinatura dentro do produto.",
      "Mercado Pago existe como alternativa secundaria para upgrade, mas a gestao ainda nao tem a mesma maturidade operacional.",
      "O plano PRO libera templates premium, analytics avancados e mais personalizacao.",
    ],
    relatedLinks: [
      { label: "Ver planos", href: "/pricing" },
      { label: "Abrir billing", href: "/dashboard/billing" },
    ],
  },
  {
    slug: "analytics-model",
    title: "Modelo de analytics",
    description: "Separacao entre metricas internas e leitura de tendencia.",
    category: "Operacao",
    audienceLabel: "Analytics",
    body: [
      "A aplicacao registra views e cliques no proprio banco para manter uma base local do produto.",
      "A leitura de tendencia pode usar PostHog como camada complementar, sem substituir a base operacional.",
      "Essa separacao ajuda a evitar interpretacoes erradas entre acumulado local e janela recente.",
    ],
    relatedLinks: [{ label: "Abrir analytics", href: "/dashboard/analytics" }],
  },
  {
    slug: "project-structure",
    title: "Estrutura do projeto",
    description: "Como o repositorio esta organizado hoje.",
    category: "Arquitetura",
    audienceLabel: "Codigo",
    body: [
      "O app usa App Router com `app/` para rotas, `components/` para UI, `lib/` para regras compartilhadas e `prisma/` para schema.",
      "As acoes de servidor concentram mutacoes e integracoes principais, enquanto o dashboard fica segmentado por modulo.",
      "A base ja esta em um ponto bom para evolucao incremental sem precisar reestruturar tudo agora.",
    ],
  },
  {
    slug: "plan-limits",
    title: "Limites entre FREE e PRO",
    description: "O que muda na oferta atual de produto.",
    category: "Produto",
    audienceLabel: "Planos",
    body: [
      "No FREE o usuario publica a pagina, usa templates base e pode manter ate 5 links.",
      "No PRO entram links ilimitados, templates premium, analytics avancados e mais acabamento visual.",
      "Essas regras precisam permanecer alinhadas entre copy, UI, actions e billing.",
    ],
    relatedLinks: [{ label: "Comparar planos", href: "/pricing" }],
  },
  {
    slug: "support-and-contact",
    title: "Suporte e contato",
    description: "Como falar com a equipe e quando escalar um problema.",
    category: "Operacao",
    audienceLabel: "Suporte",
    body: [
      "A pagina de contato agora pode enviar email diretamente quando a integracao estiver configurada.",
      "Sem provedor de email configurado, o app abre o cliente de email do usuario como fallback para nao deixar o fluxo morto.",
      "Para problemas de acesso, links ou billing, a recomendacao e concentrar o contato por esse canal.",
    ],
    relatedLinks: [{ label: "Abrir contato", href: "/contact" }],
  },
];

export function getHelpArticle(slug: string) {
  return helpArticles.find((article) => article.slug === slug) ?? null;
}

export function getDocsArticle(slug: string) {
  return docsArticles.find((article) => article.slug === slug) ?? null;
}
