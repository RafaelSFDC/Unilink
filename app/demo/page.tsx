import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  AlertTriangle,
  Link,
  BarChart3,
  Eye,
  Palette,
  Plus,
  ExternalLink
} from 'lucide-react'

export default function DemoPage() {
  const demoLinks = [
    {
      id: '1',
      title: 'Meu Portfolio',
      url: 'https://meuportfolio.com',
      description: 'Veja meus projetos e trabalhos',
      isActive: true,
      order: 1
    },
    {
      id: '2',
      title: 'LinkedIn',
      url: 'https://linkedin.com/in/usuario',
      description: 'Conecte-se comigo profissionalmente',
      isActive: true,
      order: 2
    },
    {
      id: '3',
      title: 'GitHub',
      url: 'https://github.com/usuario',
      description: 'Meus projetos open source',
      isActive: true,
      order: 3
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <Alert className="mb-8 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
          <AlertTriangle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <AlertDescription className="text-blue-800 dark:text-blue-200">
            <strong>Modo Demo:</strong> Esta é uma prévia da interface do Unilink.
            Para criar sua conta real, aguarde o banco de dados voltar ao normal.
          </AlertDescription>
        </Alert>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Dashboard Demo
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Explore como seria seu painel de controle no Unilink
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Links</CardTitle>
              <Link className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Cliques</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Perfil Público</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Ativo</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Adicionar Link
              </CardTitle>
              <CardDescription>
                Adicione um novo link ao seu perfil
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300" disabled>
                Criar Link (Demo)
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Personalizar Tema
              </CardTitle>
              <CardDescription>
                Customize a aparência do seu perfil
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" disabled>
                Editar Tema (Demo)
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Ver Perfil
              </CardTitle>
              <CardDescription>
                Visualize como seu perfil aparece para outros
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <a href="/demo/profile" target="_blank">
                  Ver Perfil Demo
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Demo Links */}
        <Card>
          <CardHeader>
            <CardTitle>Links Demo</CardTitle>
            <CardDescription>
              Assim ficariam seus links no Unilink
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {demoLinks.map((link) => (
                <div key={link.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                      <Link className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {link.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {link.url}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Ativo
                    </span>
                    <Button variant="outline" size="sm" disabled>
                      Editar (Demo)
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
            <a href="/">
              Voltar ao Início
            </a>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
