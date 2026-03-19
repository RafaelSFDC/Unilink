import type { ThemeSettings } from "@/lib/theme";

export interface ProfileTemplateLink {
  id: string;
  title: string;
  url: string;
  description: string | null;
  icon: string | null;
  order: number;
}

export interface ProfileTemplateUser {
  id: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string | null;
  bio: string | null;
  title: string | null;
  links: ProfileTemplateLink[];
  theme: Partial<ThemeSettings> | Record<string, unknown> | null;
  isPro?: boolean;
}

export interface ProfileTemplateProps {
  user: ProfileTemplateUser;
  onLinkClick: (linkId: string, url: string) => void;
}
