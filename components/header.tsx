"use client";

import { useState } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Link as LinkIcon,
  Menu,
  X,
  Sparkles,
  BarChart3,
  Palette,
  Shield,
  Zap,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Analytics",
    description: "Dados brutais em tempo real.",
    icon: BarChart3,
    href: "#analytics",
  },
  {
    title: "Design",
    description: "Personalização sem limites.",
    icon: Palette,
    href: "#customization",
  },
  {
    title: "Segurança",
    description: "Proteção total dos seus dados.",
    icon: Shield,
    href: "#security",
  },
  {
    title: "Velocidade",
    description: "Performance extrema.",
    icon: Zap,
    href: "#performance",
  },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background border-b-4 border-foreground">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-3 group">
            <div className="relative border-2 border-foreground p-1 bg-secondary shadow-neo group-hover:shadow-none group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all">
              <LinkIcon className="h-8 w-8 text-foreground" />
            </div>
            <h1 className="text-3xl font-black tracking-tighter uppercase italic">
              Unilink
            </h1>
          </a>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="gap-2">
              <NavigationMenuItem>
                <NavigationMenuLink
                  className="px-4 py-2 font-bold uppercase tracking-tight hover:bg-accent hover:text-accent-foreground border-2 border-transparent hover:border-foreground transition-all"
                  href="/"
                >
                  Início
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent font-bold uppercase tracking-tight hover:bg-accent border-2 border-transparent hover:border-foreground">
                  Recursos
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-6 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-background border-4 border-foreground shadow-neo-lg">
                    {features.map((feature) => (
                      <ListItem
                        key={feature.title}
                        title={feature.title}
                        href={feature.href}
                        icon={feature.icon}
                      >
                        {feature.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <SignedOut>
              <SignInButton mode="modal">
                <Button
                  variant="ghost"
                  className="hidden sm:inline-flex font-bold uppercase"
                >
                  Entrar
                </Button>
              </SignInButton>
              <SignInButton mode="modal">
                <Button className="font-bold uppercase">Começar</Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <Button
                asChild
                variant="outline"
                className="hidden sm:inline-flex font-bold uppercase shadow-neo"
              >
                <a href="/dashboard">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Painel
                </a>
              </Button>
              <div className="border-2 border-foreground p-0.5 shadow-neo">
                <UserButton />
              </div>
            </SignedIn>

            {/* Mobile Menu Button */}
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden shadow-neo"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t-4 border-foreground py-6 space-y-4 bg-background animate-in slide-in-from-top duration-300">
            <a
              href="/"
              className="block px-4 py-3 text-xl font-black uppercase border-2 border-foreground shadow-neo bg-white"
            >
              Início
            </a>
            <a
              href="/about"
              className="block px-4 py-3 text-xl font-black uppercase border-2 border-foreground shadow-neo bg-white"
            >
              Sobre
            </a>
            <a
              href="/contact"
              className="block px-4 py-3 text-xl font-black uppercase border-2 border-foreground shadow-neo bg-white"
            >
              Contato
            </a>
          </div>
        )}
      </div>
    </header>
  );
}

const ListItem = ({
  className,
  title,
  children,
  icon: Icon,
  ...props
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
  icon: any;
  href: string;
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          className={cn(
            "block select-none space-y-1 border-2 border-transparent p-4 leading-none no-underline outline-none transition-all hover:bg-secondary hover:border-foreground hover:shadow-neo",
            className,
          )}
          {...props}
        >
          <div className="flex items-center space-x-2">
            <Icon className="w-5 h-5" />
            <div className="text-lg font-black uppercase tracking-tight">
              {title}
            </div>
          </div>
          <p className="line-clamp-2 text-sm font-medium leading-snug opacity-70">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
};
