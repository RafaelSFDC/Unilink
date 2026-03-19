"use client";

import NextLink from "next/link";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Link } from "lucide-react";
import { UserMenu } from "@/components/auth/user-menu";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-4 border-b-2 border-foreground bg-background px-4 shadow-neo">
      {/* Sidebar Toggle */}
      <SidebarTrigger className="-ml-1 border-2 border-foreground shadow-neo" />

      {/* Logo */}
      <NextLink
        href="/dashboard"
        className="flex items-center space-x-3 flex-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40"
      >
        <div className="relative flex-shrink-0">
          <Link className="h-7 w-7 text-primary" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent border-2 border-foreground shadow-neo"></div>
        </div>
        <h1 className="text-2xl font-black uppercase tracking-tighter">
          Unilink
        </h1>
      </NextLink>

      {/* User Button */}
      <div className="flex items-center">
        <UserMenu />
      </div>
    </header>
  );
}
