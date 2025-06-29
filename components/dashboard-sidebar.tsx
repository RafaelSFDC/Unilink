'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import {
  Link,
  BarChart3,
  Settings,
  LayoutDashboard
} from 'lucide-react'
import { usePathname } from 'next/navigation'

const menuItems = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
    color: 'text-blue-600 dark:text-blue-400',
    activeColor: 'bg-blue-50 dark:bg-blue-950/20 border-r-2 border-r-blue-500',
  },
  {
    title: 'Meus Links',
    url: '/dashboard/links',
    icon: Link,
    color: 'text-indigo-600 dark:text-indigo-400',
    activeColor: 'bg-indigo-50 dark:bg-indigo-950/20 border-r-2 border-r-indigo-500',
  },
  {
    title: 'Analytics',
    url: '/dashboard/analytics',
    icon: BarChart3,
    color: 'text-purple-600 dark:text-purple-400',
    activeColor: 'bg-purple-50 dark:bg-purple-950/20 border-r-2 border-r-purple-500',
  },
  {
    title: 'Configurações',
    url: '/dashboard/settings',
    icon: Settings,
    color: 'text-gray-600 dark:text-gray-400',
    activeColor: 'bg-gray-50 dark:bg-gray-950/20 border-r-2 border-r-gray-500',
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon">


      <SidebarContent className="pt-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={isActive ? item.activeColor : 'hover:bg-gray-50 dark:hover:bg-gray-950/20'}
                    >
                      <a href={item.url}>
                        <item.icon className={`h-4 w-4 ${isActive ? item.color : 'text-gray-600 dark:text-gray-400'}`} />
                        <span className={isActive ? item.color : ''}>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>


      <SidebarRail />
    </Sidebar>
  )
}
