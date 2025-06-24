import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Link, Users, BarChart3, Palette } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Unilink</h1>
        </div>

        <div className="flex items-center space-x-4">
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="outline">Entrar</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Button asChild>
              <a href="/dashboard">Dashboard</a>
            </Button>
            <UserButton />
          </SignedIn>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Seu link único para <span className="text-blue-600">tudo</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Crie uma página personalizada com todos os seus links importantes.
            Compartilhe seu perfil único e acompanhe suas estatísticas.
          </p>

          <SignedOut>
            <SignInButton mode="modal">
              <Button size="lg" className="text-lg px-8 py-4">
                Começar Gratuitamente
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <Button size="lg" className="text-lg px-8 py-4" asChild>
              <a href="/dashboard">Ir para Dashboard</a>
            </Button>
          </SignedIn>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardHeader>
              <Link className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle>Links Organizados</CardTitle>
              <CardDescription>
                Adicione todos os seus links importantes em um só lugar
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Palette className="h-12 w-12 text-purple-600 mb-4" />
              <CardTitle>Personalização</CardTitle>
              <CardDescription>
                Customize cores, fontes e layout para combinar com sua marca
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <BarChart3 className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle>Analytics</CardTitle>
              <CardDescription>
                Acompanhe cliques e visualizações dos seus links
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Example Profile */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Veja como fica
          </h3>
          <div className="max-w-sm mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4"></div>
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">João Silva</h4>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Desenvolvedor & Creator</p>

            <div className="space-y-3">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-gray-900 dark:text-white">
                🌐 Meu Portfolio
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-gray-900 dark:text-white">
                📱 Instagram
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-gray-900 dark:text-white">
                💼 LinkedIn
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
