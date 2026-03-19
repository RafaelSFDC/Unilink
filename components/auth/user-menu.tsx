"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, UserCircle2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";

function getInitials(name?: string | null, email?: string | null) {
  const source = name?.trim() || email?.trim() || "U";
  const parts = source.split(/\s+/).filter(Boolean);
  return parts.slice(0, 2).map((part) => part[0]?.toUpperCase() || "").join("");
}

export function UserMenu() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  if (!session) {
    return null;
  }

  const initials = getInitials(session.user.name, session.user.email);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="border-2 border-foreground p-0.5 shadow-neo">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="font-black text-xs uppercase">
              {initials}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="border-2 border-foreground shadow-neo">
        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="font-bold uppercase">
            <UserCircle2 className="mr-2 h-4 w-4" />
            Painel
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="font-bold uppercase"
          onClick={async () => {
            await authClient.signOut();
            router.push("/");
            router.refresh();
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
