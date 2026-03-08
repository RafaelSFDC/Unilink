"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Link,
  BarChart3,
  Settings,
  LayoutDashboard,
  CreditCard,
} from "lucide-react";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    color: "text-primary",
    activeColor:
      "bg-primary text-primary-foreground border-2 border-foreground shadow-neo",
  },
  {
    title: "Meus Links",
    url: "/dashboard/links",
    icon: Link,
    color: "text-secondary-foreground",
    activeColor:
      "bg-secondary text-secondary-foreground border-2 border-foreground shadow-neo",
  },
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: BarChart3,
    color: "text-accent-foreground",
    activeColor:
      "bg-accent text-accent-foreground border-2 border-foreground shadow-neo",
  },
  {
    title: "Assinatura",
    url: "/dashboard/billing",
    icon: CreditCard,
    color: "text-yellow-600",
    activeColor:
      "bg-yellow-100 text-yellow-600 border-2 border-foreground shadow-neo",
  },
  {
    title: "Configurações",
    url: "/dashboard/settings",
    icon: Settings,
    color: "text-foreground",
    activeColor:
      "bg-muted text-muted-foreground border-2 border-foreground shadow-neo",
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="pt-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={
                        isActive
                          ? item.activeColor
                          : "hover:bg-gray-50 dark:hover:bg-gray-950/20"
                      }
                    >
                      <a href={item.url}>
                        <item.icon
                          className={`h-4 w-4 ${isActive ? item.color : "text-gray-600 dark:text-gray-400"}`}
                        />
                        <span className={isActive ? item.color : ""}>
                          {item.title}
                        </span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
