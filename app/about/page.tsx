import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  Target, 
  Heart, 
  Zap, 
  Shield, 
  Globe,
  Star,
  TrendingUp,
  Award,
  CheckCircle
} from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <Badge variant="outline" className="mb-6 px-4 py-2">
            <Heart className="w-4 h-4 mr-2 text-red-500" />
            Nossa História
          </Badge>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Sobre o{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Unilink
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Criamos o Unilink com uma missão simples: facilitar a vida dos criadores de conteúdo, 
            oferecendo uma plataforma moderna, segura e intuitiva para organizar todos os seus links importantes.
          </p>
        </section>

        {/* Mission & Vision */}
        <section className="grid md:grid-cols-2 gap-8 mb-20">
          <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-2xl">Nossa Missão</CardTitle>
              <CardDescription className="text-base">
                Empoderar criadores de conteúdo com ferramentas simples e poderosas para conectar 
                sua audiência a tudo que importa, de forma organizada e profissional.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-2xl">Nossa Visão</CardTitle>
              <CardDescription className="text-base">
                Ser a plataforma de referência mundial para criadores que querem uma presença 
                online organizada, com analytics poderosos e personalização total.
              </CardDescription>
            </CardHeader>
          </Card>
        </section>

        {/* Values */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Nossos Valores
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Os princípios que guiam tudo que fazemos
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <CardTitle>Simplicidade</CardTitle>
                <CardDescription>
                  Acreditamos que ferramentas poderosas devem ser fáceis de usar. 
                  Cada funcionalidade é pensada para ser intuitiva.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <CardTitle>Segurança</CardTitle>
                <CardDescription>
                  Seus dados são sagrados. Utilizamos as melhores práticas de segurança 
                  para proteger suas informações.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle>Comunidade</CardTitle>
                <CardDescription>
                  Construímos o Unilink ouvindo nossa comunidade. Cada feedback 
                  nos ajuda a melhorar.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-center text-white">
            <h3 className="text-3xl lg:text-4xl font-bold mb-8">
              Unilink em Números
            </h3>
            
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="text-4xl font-bold mb-2">10K+</div>
                <div className="text-lg opacity-90">Usuários Ativos</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">50K+</div>
                <div className="text-lg opacity-90">Links Criados</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">1M+</div>
                <div className="text-lg opacity-90">Cliques Rastreados</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">99.9%</div>
                <div className="text-lg opacity-90">Uptime</div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Por que escolher o Unilink?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Grátis para sempre
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Funcionalidades essenciais sempre gratuitas, sem pegadinhas.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Analytics detalhados
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Acompanhe o desempenho dos seus links com métricas precisas.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Personalização total
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Customize cores, fontes e layout para combinar com sua marca.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Suporte dedicado
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Nossa equipe está sempre pronta para ajudar você.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Performance otimizada
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Páginas que carregam rapidamente em qualquer dispositivo.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Atualizações constantes
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Novos recursos e melhorias baseados no feedback da comunidade.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
