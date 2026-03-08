"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { Watermark } from "@/components/watermark";

interface User {
  id: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string | null;
  bio: string | null;
  title: string | null;
  links: Array<{
    id: string;
    title: string;
    url: string;
    description: string | null;
    icon: string | null;
    order: number;
  }>;
  theme: {
    backgroundColor: string;
    textColor: string;
    linkColor: string;
    buttonStyle: string;
    fontFamily: string;
    backgroundType: string;
    backgroundImage: string | null;
    gradientFrom: string | null;
    gradientTo: string | null;
  } | null;
  isPro?: boolean;
}

interface DefaultTemplateProps {
  user: User;
  onLinkClick: (linkId: string, url: string) => void;
}

export function DefaultTemplate({ user, onLinkClick }: DefaultTemplateProps) {
  const theme = user.theme || {
    backgroundColor: "#ffffff",
    textColor: "#000000",
    linkColor: "#1a73e8",
    buttonStyle: "rounded",
    fontFamily: "Inter",
    backgroundType: "solid",
    backgroundImage: null,
    gradientFrom: null,
    gradientTo: null,
  };

  const getBackgroundStyle = () => {
    if (
      theme.backgroundType === "gradient" &&
      theme.gradientFrom &&
      theme.gradientTo
    ) {
      return {
        background: `linear-gradient(135deg, ${theme.gradientFrom}, ${theme.gradientTo})`,
      };
    }

    if (theme.backgroundType === "image" && theme.backgroundImage) {
      return {
        backgroundImage: `url(${theme.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      };
    }

    return {
      backgroundColor: theme.backgroundColor,
    };
  };

  const getButtonStyle = () => {
    const baseStyle = {
      backgroundColor: theme.linkColor,
      color: theme.backgroundColor,
      border: "none",
      padding: "12px 24px",
      margin: "8px 0",
      width: "100%",
      fontSize: "16px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.2s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      textDecoration: "none",
    };

    switch (theme.buttonStyle) {
      case "square":
        return { ...baseStyle, borderRadius: "4px" };
      case "pill":
        return { ...baseStyle, borderRadius: "50px" };
      default:
        return { ...baseStyle, borderRadius: "8px" };
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        ...getBackgroundStyle(),
        color: theme.textColor,
        fontFamily: theme.fontFamily,
      }}
    >
      <div className="max-w-md w-full bg-background/80 backdrop-blur-sm border-4 border-foreground p-8 shadow-neo-lg reveal">
        {/* Profile Header */}
        <div className="text-center mb-10">
          {user.imageUrl && (
            <div className="mb-6 relative inline-block">
              <div className="absolute inset-0 bg-primary translate-x-2 translate-y-2 border-4 border-foreground" />
              <Image
                src={user.imageUrl}
                alt={`${user.firstName} ${user.lastName}`}
                width={140}
                height={140}
                className="relative z-10 border-4 border-foreground bg-white"
              />
            </div>
          )}

          <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">
            {user.firstName} {user.lastName}
          </h1>

          {user.title && (
            <div className="inline-block bg-secondary text-secondary-foreground border-2 border-foreground px-3 py-1 font-bold uppercase text-sm mb-4 shadow-neo">
              {user.title}
            </div>
          )}

          {user.bio && (
            <p className="font-medium leading-tight text-lg">{user.bio}</p>
          )}
        </div>

        {/* Links */}
        <div className="space-y-6">
          {user.links.map((link, i) => (
            <button
              key={link.id}
              onClick={() => onLinkClick(link.id, link.url)}
              className="w-full h-16 bg-white border-4 border-foreground text-foreground flex items-center px-6 gap-4 font-black uppercase tracking-tight shadow-neo hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-75 text-lg"
            >
              {link.icon && <span className="text-2xl">{link.icon}</span>}
              <span className="flex-1 text-left">{link.title}</span>
              <ExternalLink className="w-6 h-6" />
            </button>
          ))}
        </div>

        {user.links.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-foreground/30 opacity-60">
            <p className="font-bold uppercase">
              Nenhum link disponível no momento.
            </p>
          </div>
        )}

        {/* Footer */}
        <Watermark isPro={user.isPro || false} />
      </div>
    </div>
  );
}
