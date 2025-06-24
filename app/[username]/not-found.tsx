import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { UserX, Home, Search } from 'lucide-react'

export default function UserNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="max-w-md w-full text-center">
        <CardHeader>
          <div className="mx-auto mb-4">
            <UserX className="h-16 w-16 text-gray-400" />
          </div>
          <CardTitle className="text-2xl">Perfil não encontrado</CardTitle>
          <CardDescription>
            Este perfil não existe ou não está público no momento.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Verifique se o nome de usuário está correto ou se o perfil ainda está ativo.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild variant="outline" className="flex-1">
              <a href="/">
                <Home className="h-4 w-4 mr-2" />
                Página Inicial
              </a>
            </Button>
            
            <Button asChild className="flex-1">
              <a href="/">
                <Search className="h-4 w-4 mr-2" />
                Criar Meu Perfil
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
