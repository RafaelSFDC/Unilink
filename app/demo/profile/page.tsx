import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { 
  Link, 
  ExternalLink,
  ArrowLeft,
  Github,
  Linkedin,
  Globe
} from 'lucide-react'

export default function DemoProfilePage() {
  const demoUser = {
    firstName: 'João',
    lastName: 'Silva',
    username: 'joaosilva',
    title: 'Desenvolvedor Full Stack',
    bio: 'Apaixonado por tecnologia e inovação. Criando soluções digitais que fazem a diferença.',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  }

  const demoLinks = [
    {
      id: '1',
      title: 'Meu Portfolio',
      url: 'https://joaosilva.dev',
      description: 'Veja meus projetos e trabalhos',
      icon: Globe,
      isActive: true
    },
    {
      id: '2',
      title: 'LinkedIn',
      url: 'https://linkedin.com/in/joaosilva',
      description: 'Conecte-se comigo profissionalmente',
      icon: Linkedin,
      isActive: true
    },
    {
      id: '3',
      title: 'GitHub',
      url: 'https://github.com/joaosilva',
      description: 'Meus projetos open source',
      icon: Github,
      isActive: true
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="mb-6">
          <Button asChild variant="ghost" size="sm">
            <a href="/demo">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao Dashboard
            </a>
          </Button>
        </div>

        {/* Demo Badge */}
        <div className="text-center mb-6">
          <Badge variant="secondary" className="mb-4">
            Perfil Demo - Prévia do Unilink
          </Badge>
        </div>

        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src={demoUser.imageUrl} alt={demoUser.firstName} />
                <AvatarFallback className="text-lg">
                  {demoUser.firstName[0]}{demoUser.lastName[0]}
                </AvatarFallback>
              </Avatar>
              
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {demoUser.firstName} {demoUser.lastName}
              </h1>
              
              {demoUser.title && (
                <p className="text-lg text-blue-600 dark:text-blue-400 mb-3">
                  {demoUser.title}
                </p>
              )}
              
              {demoUser.bio && (
                <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                  {demoUser.bio}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Links */}
        <div className="space-y-4">
          {demoLinks.map((link) => {
            const IconComponent = link.icon
            
            return (
              <Card key={link.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="flex items-center p-6 cursor-pointer group">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                      <IconComponent className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {link.title}
                      </h3>
                      {link.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {link.description}
                        </p>
                      )}
                    </div>
                    
                    <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Este é um perfil demo do Unilink
          </p>
          
          <div className="flex justify-center space-x-4">
            <Button asChild variant="outline" size="sm">
              <a href="/">
                Criar Minha Conta
              </a>
            </Button>
            
            <Button asChild variant="ghost" size="sm">
              <a href="/demo">
                Ver Dashboard Demo
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
