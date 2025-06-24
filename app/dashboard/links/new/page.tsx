import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LinkForm } from '@/components/link-form'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NewLinkPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Button variant="outline" asChild className="mb-4">
          <a href="/dashboard/links">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para Links
          </a>
        </Button>
        
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Adicionar Novo Link
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Crie um novo link para adicionar ao seu perfil
        </p>
      </div>

      <div className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Informações do Link</CardTitle>
            <CardDescription>
              Preencha as informações do seu novo link
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LinkForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
