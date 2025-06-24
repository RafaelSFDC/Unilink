'use client'

import { UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { 
  Link, 
  Home, 
  BarChart3, 
  Palette, 
  Settings,
  Eye
} from 'lucide-react'
import { usePathname } from 'next/navigation'

const menuItems = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: 'Meus Links',
    url: '/dashboard/links',
    icon: Link,
  },
  {
    title: 'Analytics',
    url: '/dashboard/analytics',
    icon: BarChart3,
  },
  {
    title: 'Tema',
    url: '/dashboard/theme',
    icon: Palette,
  },
  {
    title: 'Configurações',
    url: '/dashboard/settings',
    icon: Settings,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center space-x-2">
            <Link className="h-8 w-8 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Unilink</h1>
          </div>
          <SidebarTrigger className="md:hidden" />
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.url}
                  >
                    <a href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <div className="flex items-center justify-between px-4 py-2">
          <Button asChild variant="outline" size="sm">
            <a href="/">
              <Home className="h-4 w-4 mr-2" />
              Início
            </a>
          </Button>
          <UserButton />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
