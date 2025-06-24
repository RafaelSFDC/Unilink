import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  BookOpen, 
  Code, 
  Database, 
  Zap,
  ArrowRight,
  ExternalLink,
  FileText,
  Settings,
  Palette,
  BarChart3
} from 'lucide-react'

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <Badge variant="outline" className="mb-6 px-4 py-2">
            <BookOpen className="w-4 h-4 mr-2 text-blue-500" />
            Documentação
          </Badge>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Documentação do{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Unilink
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Guias completos, referências de API e tutoriais para desenvolvedores e usuários avançados.
          </p>
        </section>

        {/* Quick Start */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Início Rápido
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Comece a usar o Unilink em poucos minutos
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
                <CardTitle>Criar Conta</CardTitle>
                <CardDescription>
                  Faça login com sua conta Google, GitHub ou email
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" size="sm" className="p-0 h-auto text-blue-600">
                  Ver tutorial <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
                <CardTitle>Configurar Perfil</CardTitle>
                <CardDescription>
                  Complete o onboarding e personalize sua página
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" size="sm" className="p-0 h-auto text-blue-600">
                  Ver tutorial <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-lg">3</span>
                </div>
                <CardTitle>Adicionar Links</CardTitle>
                <CardDescription>
                  Comece adicionando seus links mais importantes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" size="sm" className="p-0 h-auto text-blue-600">
                  Ver tutorial <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Documentation Sections */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Seções da Documentação
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <Settings className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle>Configuração Básica</CardTitle>
                    <CardDescription>Setup inicial e configurações essenciais</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Criando sua conta</span>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Configurações de perfil</span>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Configurações de privacidade</span>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle>Gerenciamento de Links</CardTitle>
                    <CardDescription>Como adicionar, editar e organizar links</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Adicionando novos links</span>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Organizando por ordem</span>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Ícones personalizados</span>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Palette className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle>Personalização</CardTitle>
                    <CardDescription>Customize cores, fontes e layout</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Temas e cores</span>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Fontes personalizadas</span>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Layout da página</span>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle>Analytics</CardTitle>
                    <CardDescription>Entenda suas métricas e relatórios</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Métricas de visualização</span>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Rastreamento de cliques</span>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Relatórios mensais</span>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* API Documentation */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              API e Integrações
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Para desenvolvedores que querem integrar com o Unilink
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg flex items-center justify-center">
                    <Code className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle>REST API</CardTitle>
                    <CardDescription>API completa para gerenciar dados</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Acesse e gerencie seus dados programaticamente com nossa API REST.
                </p>
                <Button variant="outline" size="sm">
                  <Code className="w-4 h-4 mr-2" />
                  Ver Documentação
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <Database className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle>Webhooks</CardTitle>
                    <CardDescription>Receba notificações em tempo real</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Configure webhooks para receber atualizações automáticas.
                </p>
                <Button variant="outline" size="sm">
                  <Database className="w-4 h-4 mr-2" />
                  Configurar Webhooks
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Resources */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Recursos Adicionais
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-center">
              <CardContent className="p-6">
                <FileText className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Changelog
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  Acompanhe todas as atualizações e novos recursos
                </p>
                <Button variant="ghost" size="sm">
                  Ver Changelog
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-center">
              <CardContent className="p-6">
                <Code className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Exemplos de Código
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  Snippets e exemplos práticos de implementação
                </p>
                <Button variant="ghost" size="sm">
                  Ver Exemplos
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-center">
              <CardContent className="p-6">
                <BookOpen className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Guias Avançados
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  Tutoriais detalhados para casos de uso específicos
                </p>
                <Button variant="ghost" size="sm">
                  Ver Guias
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-white">
            <h3 className="text-3xl lg:text-4xl font-bold mb-4">
              Precisa de mais ajuda?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Nossa equipe está sempre disponível para ajudar
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                Falar com Suporte
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
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
