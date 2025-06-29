'use client'

import { UserButton } from '@clerk/nextjs'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Link } from 'lucide-react'

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-4 border-b border-gray-200/50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-gray-700/50 dark:bg-gray-900/95 dark:supports-[backdrop-filter]:bg-gray-900/60 px-4">
      {/* Sidebar Toggle */}
      <SidebarTrigger className="-ml-1" />

      {/* Logo */}
      <div className="flex items-center space-x-3 flex-1">
        <div className="relative flex-shrink-0">
          <Link className="h-7 w-7 text-blue-600" />
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Unilink
        </h1>
      </div>

      {/* User Button */}
      <div className="flex items-center">
        <UserButton
          appearance={{
            elements: {
              avatarBox: "w-8 h-8"
            }
          }}
        />
      </div>
    </header>
  )
}
