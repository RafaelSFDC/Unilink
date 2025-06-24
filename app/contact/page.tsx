import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { 
  Mail, 
  MessageCircle, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Heart
} from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <Badge variant="outline" className="mb-6 px-4 py-2">
            <MessageCircle className="w-4 h-4 mr-2 text-blue-500" />
            Fale Conosco
          </Badge>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Entre em{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Contato
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Tem alguma dúvida, sugestão ou precisa de ajuda? Nossa equipe está aqui para ajudar você. 
            Entre em contato conosco através dos canais abaixo.
          </p>
        </section>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card className="border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Envie uma Mensagem</CardTitle>
                <CardDescription>
                  Preencha o formulário abaixo e responderemos o mais rápido possível
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      Nome
                    </label>
                    <Input placeholder="Seu nome completo" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      Email
                    </label>
                    <Input type="email" placeholder="seu@email.com" />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Assunto
                  </label>
                  <Input placeholder="Como podemos ajudar?" />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Mensagem
                  </label>
                  <Textarea 
                    placeholder="Descreva sua dúvida, sugestão ou problema..."
                    rows={6}
                  />
                </div>
                
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Send className="w-4 h-4 mr-2" />
                  Enviar Mensagem
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <div className="space-y-6">
              <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Email</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-1">contato@unilink.com</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Resposta em até 24 horas
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Telefone</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-1">+55 (11) 9999-9999</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Segunda a sexta, 9h às 18h
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Localização</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-1">São Paulo, Brasil</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Atendimento remoto
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Business Hours */}
            <Card className="border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-blue-600" />
                  Horário de Atendimento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Segunda - Sexta</span>
                  <span className="font-medium text-gray-900 dark:text-white">9:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Sábado</span>
                  <span className="font-medium text-gray-900 dark:text-white">9:00 - 14:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Domingo</span>
                  <span className="font-medium text-gray-500 dark:text-gray-400">Fechado</span>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Siga-nos nas Redes Sociais</CardTitle>
                <CardDescription>
                  Fique por dentro das novidades e dicas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-10 h-10 bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center justify-center text-white transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-pink-500 hover:bg-pink-600 rounded-lg flex items-center justify-center text-white transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-blue-700 hover:bg-blue-800 rounded-lg flex items-center justify-center text-white transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-800 hover:bg-gray-900 rounded-lg flex items-center justify-center text-white transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Respostas para as dúvidas mais comuns
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Como criar minha primeira página?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Após fazer login, você será direcionado para o onboarding que te guiará 
                  pelos primeiros passos para criar sua página personalizada.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">O Unilink é realmente gratuito?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Sim! Oferecemos todas as funcionalidades essenciais gratuitamente, 
                  incluindo links ilimitados e analytics básicos.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Posso personalizar minha página?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Absolutamente! Você pode personalizar cores, fontes, layout e muito mais 
                  para que sua página combine perfeitamente com sua marca.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Como funciona o analytics?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Rastreamos automaticamente visualizações da sua página e cliques nos seus links, 
                  fornecendo insights valiosos sobre sua audiência.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-white">
            <h3 className="text-3xl lg:text-4xl font-bold mb-4">
              Ainda tem dúvidas?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Nossa equipe está sempre pronta para ajudar você
            </p>
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
              <Heart className="w-5 h-5 mr-2" />
              Falar com Suporte
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
