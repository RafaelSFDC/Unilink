import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { OnboardingForm } from '@/components/onboarding-form'
import { prisma } from '@/lib/prisma'

export default async function OnboardingPage() {
  const { userId } = await auth()
  const user = await currentUser()

  if (!userId || !user) {
    redirect('/sign-in')
  }

  const existingUser = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { id: true },
  })

  if (existingUser) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Bem-vindo ao Unilink!
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Vamos colocar sua página de links no ar em poucos passos
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
