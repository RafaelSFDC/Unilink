import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  BookOpen, 
  MessageCircle, 
  Video,
  FileText,
  Users,
  Zap,
  Settings,
  BarChart3,
  Palette,
  Link as LinkIcon,
  ArrowRight
} from 'lucide-react'

const helpCategories = [
  {
    title: "Primeiros Passos",
    description: "Aprenda o básico para começar",
    icon: Zap,
    articles: [
      "Como criar sua primeira página",
      "Configurando seu perfil",
      "Adicionando seus primeiros links",
      "Personalizando sua página"
    ]
  },
  {
    title: "Gerenciamento de Links",
    description: "Organize e otimize seus links",
    icon: LinkIcon,
    articles: [
      "Como adicionar novos links",
      "Organizando links por categoria",
      "Editando e removendo links",
      "Links com ícones personalizados"
    ]
  },
  {
    title: "Personalização",
    description: "Customize sua página",
    icon: Palette,
    articles: [
      "Escolhendo cores e temas",
      "Personalizando fontes",
      "Adicionando sua foto de perfil",
      "Configurando layout"
    ]
  },
  {
    title: "Analytics",
    description: "Entenda suas métricas",
    icon: BarChart3,
    articles: [
      "Interpretando seus analytics",
      "Rastreamento de cliques",
      "Métricas de visualização",
      "Relatórios mensais"
    ]
  },
  {
    title: "Configurações",
    description: "Gerencie sua conta",
    icon: Settings,
    articles: [
      "Configurações de privacidade",
      "Alterando seu username",
      "Configurações de notificação",
      "Excluindo sua conta"
    ]
  },
  {
    title: "Solução de Problemas",
    description: "Resolva problemas comuns",
    icon: MessageCircle,
    articles: [
      "Problemas de login",
      "Links não funcionando",
      "Página não carregando",
      "Problemas de performance"
    ]
  }
]

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <Badge variant="outline" className="mb-6 px-4 py-2">
            <BookOpen className="w-4 h-4 mr-2 text-blue-500" />
            Central de Ajuda
          </Badge>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Como podemos{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ajudar?
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Encontre respostas para suas dúvidas, tutoriais passo a passo e dicas para aproveitar 
            ao máximo o Unilink.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input 
              placeholder="Pesquisar na central de ajuda..."
              className="pl-12 py-4 text-lg"
            />
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-16">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Video className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Tutoriais em Vídeo
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Aprenda visualmente com nossos tutoriais passo a passo
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Falar com Suporte
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Entre em contato direto com nossa equipe de suporte
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Comunidade
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Conecte-se com outros usuários e compartilhe dicas
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Help Categories */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Categorias de Ajuda
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Navegue pelos tópicos organizados por categoria
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {helpCategories.map((category, index) => (
              <Card key={index} className="border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                    <category.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.articles.map((article, articleIndex) => (
                      <li key={articleIndex}>
                        <a 
                          href="#" 
                          className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center group"
                        >
                          <ArrowRight className="w-3 h-3 mr-2 group-hover:translate-x-1 transition-transform" />
                          {article}
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Popular Articles */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Artigos Populares
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Os guias mais acessados pelos usuários
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Guia Completo: Criando sua Primeira Página
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      Passo a passo completo para criar e configurar sua página do zero.
                    </p>
                    <Button variant="ghost" size="sm" className="p-0 h-auto text-blue-600 hover:text-blue-700">
                      Ler artigo <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Como Personalizar Cores e Temas
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      Aprenda a customizar sua página para combinar com sua marca.
                    </p>
                    <Button variant="ghost" size="sm" className="p-0 h-auto text-blue-600 hover:text-blue-700">
                      Ler artigo <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Entendendo seus Analytics
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      Como interpretar e usar os dados para melhorar sua performance.
                    </p>
                    <Button variant="ghost" size="sm" className="p-0 h-auto text-blue-600 hover:text-blue-700">
                      Ler artigo <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Dicas para Aumentar Cliques
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      Estratégias comprovadas para melhorar o engajamento.
                    </p>
                    <Button variant="ghost" size="sm" className="p-0 h-auto text-blue-600 hover:text-blue-700">
                      Ler artigo <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact Support */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-white">
            <h3 className="text-3xl lg:text-4xl font-bold mb-4">
              Não encontrou o que procurava?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Nossa equipe de suporte está pronta para ajudar você
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                <MessageCircle className="w-5 h-5 mr-2" />
                Falar com Suporte
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                <Users className="w-5 h-5 mr-2" />
                Comunidade
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
