# Unilink - Seu link único para tudo

Uma aplicação moderna de linktree construída com Next.js 15, Clerk para autenticação e Prisma ORM para gerenciamento de banco de dados.

## 🚀 Funcionalidades

- **Autenticação segura** com Clerk
- **Perfis personalizáveis** com temas customizados
- **Gerenciamento de links** com drag & drop
- **Analytics detalhados** de visualizações e cliques
- **Páginas públicas** otimizadas para SEO
- **Interface responsiva** com Tailwind CSS
- **Componentes modernos** com shadcn/ui

## 🛠️ Tecnologias

- **Framework**: Next.js 15 com App Router
- **Autenticação**: Clerk
- **Banco de dados**: PostgreSQL com Prisma ORM
- **Estilização**: Tailwind CSS 4
- **Componentes**: shadcn/ui
- **Ícones**: Lucide React
- **Tipagem**: TypeScript
- **Gerenciador de pacotes**: Yarn

## 📦 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd unilink
```

2. Instale as dependências:
```bash
yarn install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

Preencha as variáveis no arquivo `.env`:
```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Database
DATABASE_URL=your_postgresql_connection_string
```

4. Configure o banco de dados:
```bash
npx prisma generate
npx prisma migrate dev --name init
```

5. Execute o servidor de desenvolvimento:
```bash
yarn dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🗄️ Estrutura do Banco de Dados

### Modelos principais:

- **User**: Informações do usuário sincronizadas com Clerk
- **Link**: Links do usuário com título, URL, descrição e ícone
- **Theme**: Configurações de tema personalizadas
- **Click**: Registro de cliques para analytics
- **Analytics**: Métricas diárias de visualizações e cliques

## 🎨 Funcionalidades Principais

### Dashboard
- Visão geral com estatísticas
- Gerenciamento de links
- Personalização de tema
- Analytics detalhados
- Configurações do perfil

### Perfil Público
- Página otimizada para compartilhamento
- Tema personalizado aplicado
- Tracking de cliques e visualizações
- SEO otimizado

### Personalização
- Cores customizáveis
- Diferentes estilos de botão
- Suporte a gradientes
- Múltiplas fontes

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Outras plataformas

O projeto é compatível com qualquer plataforma que suporte Next.js:
- Netlify
- Railway
- Render
- AWS Amplify

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
yarn dev

# Build para produção
yarn build

# Iniciar servidor de produção
yarn start

# Linting
yarn lint

# Verificação de tipos
npx tsc --noEmit

# Prisma
npx prisma generate
npx prisma migrate dev
npx prisma studio
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🆘 Suporte

Se você encontrar algum problema ou tiver dúvidas:

1. Verifique as [Issues existentes](../../issues)
2. Crie uma nova issue se necessário
3. Consulte a documentação das tecnologias utilizadas

---

Feito com ❤️ usando Next.js, Clerk e Prisma
