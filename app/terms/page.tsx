import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FileText, Scale, Shield, Users, AlertTriangle, Mail } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <Badge variant="outline" className="mb-6 px-4 py-2">
            <Scale className="w-4 h-4 mr-2 text-blue-500" />
            Termos de Uso
          </Badge>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Termos de{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Uso
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Estes termos estabelecem as regras para o uso do Unilink. Ao usar nosso serviço, 
            você concorda com estes termos.
          </p>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Última atualização: 24 de junho de 2024
          </p>
        </section>

        {/* Key Points */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Pontos Principais
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle>Uso Responsável</CardTitle>
                <CardDescription>
                  Use o Unilink de forma ética e responsável, respeitando outros usuários e as leis aplicáveis.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <CardTitle>Seus Direitos</CardTitle>
                <CardDescription>
                  Você mantém todos os direitos sobre o conteúdo que cria e pode excluir sua conta a qualquer momento.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <CardTitle>Transparência</CardTitle>
                <CardDescription>
                  Nossos termos são claros e diretos. Se algo mudar, você será notificado com antecedência.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Terms Content */}
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Acceptance */}
          <Card className="border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <Scale className="w-6 h-6 mr-3 text-blue-600" />
                1. Aceitação dos Termos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Ao acessar e usar o Unilink, você aceita e concorda em ficar vinculado aos 
                termos e condições deste acordo. Se você não concordar com algum destes termos, 
                não use nosso serviço.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Estes termos se aplicam a todos os visitantes, usuários e outras pessoas que 
                acessam ou usam o serviço.
              </p>
            </CardContent>
          </Card>

          {/* Service Description */}
          <Card className="border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <FileText className="w-6 h-6 mr-3 text-green-600" />
                2. Descrição do Serviço
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                O Unilink é uma plataforma que permite aos usuários criar páginas personalizadas 
                para organizar e compartilhar links importantes. Nossos serviços incluem:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 ml-4">
                <li>Criação de páginas de links personalizadas</li>
                <li>Ferramentas de personalização (cores, fontes, layout)</li>
                <li>Analytics de visualizações e cliques</li>
                <li>Gerenciamento de links e conteúdo</li>
                <li>Hospedagem e manutenção da plataforma</li>
              </ul>
            </CardContent>
          </Card>

          {/* User Accounts */}
          <Card className="border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <Users className="w-6 h-6 mr-3 text-purple-600" />
                3. Contas de Usuário
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Criação de Conta</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Para usar o Unilink, você deve criar uma conta fornecendo informações precisas 
                  e atualizadas. Você é responsável por manter a confidencialidade de sua conta.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Responsabilidade</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Você é responsável por todas as atividades que ocorrem em sua conta e deve 
                  notificar-nos imediatamente sobre qualquer uso não autorizado.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Idade Mínima</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Você deve ter pelo menos 13 anos para usar o Unilink. Se você tem entre 13 e 18 anos, 
                  deve ter permissão dos pais ou responsáveis.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Acceptable Use */}
          <Card className="border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <Shield className="w-6 h-6 mr-3 text-green-600" />
                4. Uso Aceitável
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Você concorda em usar o Unilink apenas para fins legais e de acordo com estes termos. 
                Você NÃO pode usar nosso serviço para:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 ml-4">
                <li>Violar qualquer lei local, estadual, nacional ou internacional</li>
                <li>Transmitir material que seja difamatório, obsceno ou ofensivo</li>
                <li>Assediar, abusar ou prejudicar outras pessoas</li>
                <li>Distribuir spam, malware ou conteúdo malicioso</li>
                <li>Violar direitos de propriedade intelectual</li>
                <li>Tentar obter acesso não autorizado a nossos sistemas</li>
              </ul>
            </CardContent>
          </Card>

          {/* Content Ownership */}
          <Card className="border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <FileText className="w-6 h-6 mr-3 text-blue-600" />
                5. Propriedade do Conteúdo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Seu Conteúdo</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Você mantém todos os direitos sobre o conteúdo que cria no Unilink. 
                  Ao usar nosso serviço, você nos concede uma licença limitada para hospedar, 
                  exibir e distribuir seu conteúdo conforme necessário para fornecer o serviço.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Nosso Conteúdo</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  O Unilink e todo o seu conteúdo original, recursos e funcionalidades são 
                  propriedade exclusiva do Unilink e são protegidos por direitos autorais, 
                  marcas registradas e outras leis.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Termination */}
          <Card className="border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <AlertTriangle className="w-6 h-6 mr-3 text-orange-600" />
                6. Rescisão
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Por Você</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Você pode encerrar sua conta a qualquer momento excluindo-a através das 
                  configurações ou entrando em contato conosco.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Por Nós</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Podemos suspender ou encerrar sua conta se você violar estes termos ou 
                  usar o serviço de forma inadequada. Tentaremos notificá-lo com antecedência 
                  sempre que possível.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimers */}
          <Card className="border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <AlertTriangle className="w-6 h-6 mr-3 text-red-600" />
                7. Limitações de Responsabilidade
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                O Unilink é fornecido "como está" e "conforme disponível". Não garantimos que 
                o serviço será ininterrupto, livre de erros ou completamente seguro.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Em nenhuma circunstância seremos responsáveis por danos indiretos, incidentais, 
                especiais ou consequenciais resultantes do uso ou incapacidade de usar nosso serviço.
              </p>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <Card className="border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <FileText className="w-6 h-6 mr-3 text-purple-600" />
                8. Alterações nos Termos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Podemos atualizar estes termos periodicamente. Quando fizermos alterações 
                significativas, notificaremos você por email ou através de um aviso em nosso serviço.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Seu uso continuado do serviço após as alterações constituirá sua aceitação 
                dos novos termos.
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="border-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <Mail className="w-6 h-6 mr-3" />
                Dúvidas sobre os Termos?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 opacity-90">
                Se você tiver alguma dúvida sobre estes termos de uso, entre em contato conosco.
              </p>
              <div className="space-y-2">
                <p><strong>Email:</strong> legal@unilink.com</p>
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
