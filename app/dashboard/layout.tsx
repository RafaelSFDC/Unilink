import { UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Link, BarChart3, Palette, Settings, Home } from 'lucide-react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Link className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Unilink</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button asChild variant="outline" size="sm">
              <a href="/">
                <Home className="h-4 w-4 mr-2" />
                Início
              </a>
            </Button>
            <UserButton />
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-[calc(100vh-73px)]">
          <nav className="p-4 space-y-2">
            <a
              href="/dashboard"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Home className="h-5 w-5" />
              <span>Dashboard</span>
            </a>
            
            <a
              href="/dashboard/links"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Link className="h-5 w-5" />
              <span>Meus Links</span>
            </a>
            
            <a
              href="/dashboard/analytics"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <BarChart3 className="h-5 w-5" />
              <span>Analytics</span>
            </a>
            
            <a
              href="/dashboard/theme"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Palette className="h-5 w-5" />
              <span>Tema</span>
            </a>
            
            <a
              href="/dashboard/settings"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Settings className="h-5 w-5" />
              <span>Configurações</span>
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}
