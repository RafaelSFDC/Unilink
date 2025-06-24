import { auth } from '@clerk/nextjs/server'
import { redirect, notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LinkForm } from '@/components/link-form'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface EditLinkPageProps {
  params: Promise<{ id: string }>
}

async function getLink(linkId: string, clerkId: string) {
  const user = await prisma.user.findUnique({
    where: { clerkId }
  })

  if (!user) return null

  const link = await prisma.link.findFirst({
    where: {
      id: linkId,
      userId: user.id
    }
  })

  return link
}

export default async function EditLinkPage({ params }: EditLinkPageProps) {
  const { userId } = await auth()
  const { id } = await params
  
  if (!userId) {
    redirect('/sign-in')
  }

  const link = await getLink(id, userId)

  if (!link) {
    notFound()
  }

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
          Editar Link
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Atualize as informações do seu link
        </p>
      </div>

      <div className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Informações do Link</CardTitle>
            <CardDescription>
              Edite as informações do seu link
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LinkForm link={link} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
