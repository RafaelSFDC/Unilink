import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { OnboardingForm } from '@/components/onboarding-form'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { AlertTriangle, Eye } from 'lucide-react'

export default async function OnboardingPage() {
  const { userId } = await auth()
  const user = await currentUser()

  if (!userId || !user) {
    redirect('/sign-in')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Bem-vindo ao Unilink!
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Vamos configurar seu perfil em alguns passos simples
          </p>
        </div>

        <Alert className="mb-6 border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <AlertDescription className="text-amber-800 dark:text-amber-200">
            <strong>Aviso:</strong> Nosso banco de dados está temporariamente indisponível.
            Se você encontrar problemas ao criar seu perfil, tente novamente em alguns minutos.
            <div className="mt-3">
              <Button asChild variant="outline" size="sm" className="bg-white dark:bg-gray-800">
                <a href="/demo">
                  <Eye className="h-4 w-4 mr-2" />
                  Explorar Modo Demo
                </a>
              </Button>
            </div>
          </AlertDescription>
        </Alert>

        <OnboardingForm
          clerkId={userId}
          email={user.emailAddresses[0]?.emailAddress || ''}
          firstName={user.firstName || ''}
          lastName={user.lastName || ''}
          imageUrl={user.imageUrl || ''}
        />
      </div>
    </div>
  )
}
