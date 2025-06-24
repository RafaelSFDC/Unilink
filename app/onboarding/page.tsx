import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { OnboardingForm } from '@/components/onboarding-form'

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
