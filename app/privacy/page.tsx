import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Shield, Lock, Eye, Database, UserCheck, Mail } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <Badge variant="outline" className="mb-6 px-4 py-2">
            <Shield className="w-4 h-4 mr-2 text-green-500" />
            Política de Privacidade
          </Badge>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Sua{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Privacidade
            </span>{' '}
            é Sagrada
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            No Unilink, levamos sua privacidade muito a sério. Esta política explica como coletamos, 
            usamos e protegemos suas informações pessoais.
          </p>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Última atualização: 24 de junho de 2024
          </p>
        </section>

        {/* Privacy Principles */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Nossos Princípios de Privacidade
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-8 w-8 text-white" />
                </div>
                <CardTitle>Segurança Primeiro</CardTitle>
                <CardDescription>
                  Utilizamos criptografia de ponta e as melhores práticas de segurança para proteger seus dados.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-8 w-8 text-white" />
                </div>
                <CardTitle>Transparência Total</CardTitle>
                <CardDescription>
                  Você sempre saberá quais dados coletamos, como os usamos e pode controlá-los completamente.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserCheck className="h-8 w-8 text-white" />
                </div>
                <CardTitle>Controle do Usuário</CardTitle>
                <CardDescription>
                  Você tem controle total sobre seus dados e pode exportar, editar ou excluir a qualquer momento.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Content Sections */}
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Data Collection */}
          <Card className="border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <Database className="w-6 h-6 mr-3 text-blue-600" />
                Quais Dados Coletamos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Informações de Conta</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Nome, email, foto de perfil e informações básicas fornecidas durante o cadastro ou 
                  obtidas através de provedores de autenticação (Google, GitHub).
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Dados de Uso</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Informações sobre como você usa o Unilink, incluindo páginas visitadas, 
                  cliques em links e tempo de permanência (dados anonimizados).
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Conteúdo Criado</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Links, descrições, configurações de tema e outras informações que você 
                  adiciona à sua página do Unilink.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Data */}
          <Card className="border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <Shield className="w-6 h-6 mr-3 text-green-600" />
                Como Usamos Seus Dados
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Fornecimento do Serviço</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Usamos seus dados para criar e manter sua página personalizada, 
                  processar analytics e fornecer suporte técnico.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Melhorias do Produto</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Analisamos dados agregados e anonimizados para entender como melhorar 
                  nossos recursos e desenvolver novas funcionalidades.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Comunicação</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Enviamos emails importantes sobre sua conta, atualizações de segurança 
                  e (com seu consentimento) newsletters com dicas e novidades.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Data Sharing */}
          <Card className="border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <Eye className="w-6 h-6 mr-3 text-purple-600" />
                Compartilhamento de Dados
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <p className="text-green-800 dark:text-green-200 font-medium">
                  🛡️ Nunca vendemos seus dados pessoais para terceiros.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Dados Públicos</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Apenas as informações que você escolhe tornar públicas em sua página 
                  (nome, bio, links) são visíveis para outros usuários.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Prestadores de Serviço</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Compartilhamos dados mínimos necessários com prestadores de serviços confiáveis 
                  (hospedagem, analytics) que nos ajudam a operar o Unilink.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card className="border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <UserCheck className="w-6 h-6 mr-3 text-blue-600" />
                Seus Direitos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Acesso</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Visualizar todos os dados que temos sobre você
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Correção</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Corrigir informações incorretas ou desatualizadas
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Exportação</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Baixar uma cópia de todos os seus dados
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Exclusão</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Excluir sua conta e todos os dados associados
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security */}
          <Card className="border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <Lock className="w-6 h-6 mr-3 text-green-600" />
                Segurança dos Dados
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Implementamos medidas de segurança técnicas e organizacionais para proteger 
                seus dados contra acesso não autorizado, alteração, divulgação ou destruição.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Criptografia</h4>
                  <p className="text-blue-700 dark:text-blue-200 text-sm">
                    Todos os dados são criptografados em trânsito e em repouso
                  </p>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">Acesso Limitado</h4>
                  <p className="text-green-700 dark:text-green-200 text-sm">
                    Apenas funcionários autorizados têm acesso aos dados
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="border-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <Mail className="w-6 h-6 mr-3" />
                Dúvidas sobre Privacidade?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 opacity-90">
                Se você tiver alguma dúvida sobre esta política de privacidade ou sobre 
                como tratamos seus dados, entre em contato conosco.
              </p>
              <div className="space-y-2">
                <p><strong>Email:</strong> privacidade@unilink.com</p>
                <p><strong>Endereço:</strong> São Paulo, Brasil</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
