import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ThemeForm } from '@/components/theme-form'

async function getUserTheme(clerkId: string) {
  const user = await prisma.user.findUnique({
    where: { clerkId },
    include: {
      theme: true,
      links: {
        where: { isActive: true },
        orderBy: { order: 'asc' }
      }
    }
  })

  return user
}

export default async function ThemePage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  const user = await getUserTheme(userId)

  if (!user) {
    redirect('/onboarding')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Personalizar Tema
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Customize a aparência do seu perfil público
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Configurações do Tema</CardTitle>
              <CardDescription>
                Personalize cores, fontes e estilo dos botões
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ThemeForm user={user} />
            </CardContent>
          </Card>
        </div>

        {/* Preview */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Pré-visualização</CardTitle>
              <CardDescription>
                Veja como seu perfil ficará
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 min-h-[400px] flex items-center justify-center">
                <div className="text-center max-w-sm">
                  {/* Avatar */}
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    {user.imageUrl ? (
                      <img
                        src={user.imageUrl}
                        alt={`${user.firstName} ${user.lastName}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-white text-xl font-bold">
                        {user.firstName?.[0]}{user.lastName?.[0]}
                      </span>
                    )}
                  </div>

                  {/* Nome */}
                  <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-white">
                    {user.firstName} {user.lastName}
                  </h3>

                  {/* Título */}
                  {user.title && (
                    <p className="text-sm text-blue-600 dark:text-blue-400 mb-4">
                      {user.title}
                    </p>
                  )}

                  {/* Bio */}
                  {user.bio && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      {user.bio}
                    </p>
                  )}

                  {/* Links */}
                  <div className="space-y-2">
                    {user.links.length > 0 ? (
                      user.links.slice(0, 3).map((link) => (
                        <div
                          key={link.id}
                          className="bg-blue-600 text-white rounded-lg p-3 text-sm flex items-center justify-center gap-2"
                        >
                          {link.icon && <span>{link.icon}</span>}
                          <span>{link.title}</span>
                        </div>
                      ))
                    ) : (
                      <>
                        <div className="bg-blue-600 text-white rounded-lg p-3 text-sm">
                          🌐 Exemplo de Link
                        </div>
                        <div className="bg-blue-600 text-white rounded-lg p-3 text-sm">
                          📱 Outro Link
                        </div>
                      </>
                    )}
                    {user.links.length > 3 && (
                      <div className="text-xs text-gray-500">
                        +{user.links.length - 3} mais links
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500 mb-2">
                  Esta é uma prévia básica. Para ver o resultado real:
                </p>
                <a
                  href={`/${user.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  Ver perfil público →
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
