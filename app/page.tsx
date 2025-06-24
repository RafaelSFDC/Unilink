import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import {
  Link,
  Users,
  BarChart3,
  Palette,
  Zap,
  Shield,
  Smartphone,
  Globe,
  Star,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Eye,
  MousePointer,
  Sparkles
} from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />

      {/* Hero Section */}
      <main className="container mx-auto px-4">
        {/* Hero */}
        <section className="py-20 lg:py-32 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6 px-4 py-2">
              <Star className="w-4 h-4 mr-2 text-yellow-500" />
              Mais de 10.000 criadores confiam no Unilink
            </Badge>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Seu link único para{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                tudo
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Crie uma página personalizada com todos os seus links importantes.
              Compartilhe seu perfil único e acompanhe suas estatísticas em tempo real.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <SignedOut>
                <SignInButton mode="modal">
                  <Button size="lg" className="text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
                    <Zap className="w-5 h-5 mr-2" />
                    Começar Gratuitamente
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </SignInButton>
                <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                  <Eye className="w-5 h-5 mr-2" />
                  Ver Exemplo
                </Button>
              </SignedOut>

              <SignedIn>
                <Button size="lg" className="text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" asChild>
                  <a href="/dashboard">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Ir para Dashboard
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </Button>
              </SignedIn>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                Grátis para sempre
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                Sem limite de links
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                Analytics inclusos
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Tudo que você precisa em um só lugar
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Ferramentas poderosas para criar, personalizar e acompanhar seu perfil de links
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Link className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Links Organizados</CardTitle>
                <CardDescription className="text-base">
                  Adicione todos os seus links importantes em um só lugar. Organize, reordene e gerencie facilmente.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Palette className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Personalização Total</CardTitle>
                <CardDescription className="text-base">
                  Customize cores, fontes, gradientes e layout para combinar perfeitamente com sua marca.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Analytics Avançados</CardTitle>
                <CardDescription className="text-base">
                  Acompanhe cliques, visualizações e performance dos seus links com relatórios detalhados.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Smartphone className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Mobile First</CardTitle>
                <CardDescription className="text-base">
                  Design responsivo que funciona perfeitamente em todos os dispositivos e tamanhos de tela.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Super Rápido</CardTitle>
                <CardDescription className="text-base">
                  Carregamento instantâneo e performance otimizada para a melhor experiência do usuário.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Seguro & Confiável</CardTitle>
                <CardDescription className="text-base">
                  Autenticação segura, backup automático e proteção total dos seus dados.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Example Profile */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Veja como fica na prática
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Um exemplo real de como seu perfil pode aparecer
            </p>
          </div>

          <div className="max-w-sm mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-200/50 dark:border-gray-700/50">
              <div className="text-center mb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full mx-auto mb-4 p-1">
                  <div className="w-full h-full bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
                    <span className="text-2xl">👨‍💻</span>
                  </div>
                </div>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">João Silva</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-1">Desenvolvedor Full Stack</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">São Paulo, Brasil</p>
              </div>

              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Globe className="w-5 h-5 mr-3" />
                      <span className="font-medium">Meu Portfolio</span>
                    </div>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-4 text-white hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-lg mr-3">📱</span>
                      <span className="font-medium">Instagram</span>
                    </div>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-white hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-lg mr-3">💼</span>
                      <span className="font-medium">LinkedIn</span>
                    </div>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl p-4 text-white hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-lg mr-3">🎵</span>
                      <span className="font-medium">Spotify</span>
                    </div>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-center items-center text-sm text-gray-500 dark:text-gray-400">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  1.2k visualizações este mês
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              O que nossos usuários dizem
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Milhares de criadores já transformaram sua presença online
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    M
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Maria Santos</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Influenciadora Digital</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  "O Unilink revolucionou como compartilho meus conteúdos. Agora tenho tudo organizado em um lugar só!"
                </p>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    C
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Carlos Lima</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Músico</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  "Perfeito para músicos! Consigo compartilhar todas as minhas plataformas de streaming em um só link."
                </p>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    A
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Ana Costa</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Empreendedora</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  "Os analytics me ajudam a entender melhor minha audiência. Ferramenta essencial para qualquer negócio!"
                </p>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-12">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">10K+</div>
                <div className="text-gray-600 dark:text-gray-400">Usuários Ativos</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-600 mb-2">50K+</div>
                <div className="text-gray-600 dark:text-gray-400">Links Criados</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-600 mb-2">1M+</div>
                <div className="text-gray-600 dark:text-gray-400">Cliques Rastreados</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-pink-600 mb-2">99.9%</div>
                <div className="text-gray-600 dark:text-gray-400">Uptime</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-center text-white">
            <h3 className="text-3xl lg:text-4xl font-bold mb-4">
              Pronto para começar?
            </h3>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Junte-se a milhares de criadores que já estão usando o Unilink para conectar sua audiência
            </p>

            <SignedOut>
              <SignInButton mode="modal">
                <Button size="lg" className="text-lg px-8 py-4 bg-white text-gray-900 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Criar Meu Perfil Grátis
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <Button size="lg" className="text-lg px-8 py-4 bg-white text-gray-900 hover:bg-gray-100" asChild>
                <a href="/dashboard">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Acessar Dashboard
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
            </SignedIn>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
