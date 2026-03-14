'use client'

import { trackClick } from '@/app/actions/analytics'
import type { CSSProperties } from 'react'
import { getThemeButtonRadius, getThemeFontFamily, resolveTheme, type ThemeSettings } from '@/lib/theme'
import {
  DefaultTemplate,
  MinimalTemplate,
  ModernTemplate,
  VibrantTemplate,
  ProfessionalTemplate,
  CreativeTemplate,
  type TemplateId
} from '@/components/profile-templates'

interface User {
  id: string
  username: string
  firstName: string | null
  lastName: string | null
  imageUrl: string | null
  bio: string | null
  title: string | null
  links: Array<{
    id: string
    title: string
    url: string
    description: string | null
    icon: string | null
    order: number
  }>
  theme: Partial<ThemeSettings> | Record<string, unknown> | null
  isPro?: boolean
}

interface ProfilePageProps {
  user: User
  preview?: boolean
}

export function ProfilePage({ user, preview = false }: ProfilePageProps) {
  const theme = resolveTheme(user.theme as Partial<ThemeSettings> | null)

  const handleLinkClick = async (linkId: string, url: string) => {
    if (preview) {
      return
    }

    // Track click
    await trackClick(linkId)

    // Open link
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  // Render the appropriate template based on user's choice
  const renderTemplate = () => {
    const templateId = theme.template as TemplateId
    const themedUser = {
      ...user,
      theme,
    }

    switch (templateId) {
      case 'minimal':
        return <MinimalTemplate user={themedUser} onLinkClick={handleLinkClick} />
      case 'modern':
        return <ModernTemplate user={themedUser} onLinkClick={handleLinkClick} />
      case 'vibrant':
        return <VibrantTemplate user={themedUser} onLinkClick={handleLinkClick} />
      case 'professional':
        return <ProfessionalTemplate user={themedUser} onLinkClick={handleLinkClick} />
      case 'creative':
        return <CreativeTemplate user={themedUser} onLinkClick={handleLinkClick} />
      default:
        return <DefaultTemplate user={themedUser} onLinkClick={handleLinkClick} />
    }
  }

  return (
    <div
      data-profile-theme-shell="true"
      data-motion-preset={theme.motionPreset}
      data-interaction-preset={theme.interactionPreset}
      style={
        {
          ['--profile-button-radius']: getThemeButtonRadius(theme.buttonStyle),
          ['--profile-font-family']: getThemeFontFamily(theme.fontFamily),
          ['--profile-link-color']: theme.linkColor,
          ['--profile-text-color']: theme.textColor,
        } as CSSProperties
      }
    >
      {renderTemplate()}
      <style jsx global>{`
        [data-profile-theme-shell='true'] {
          font-family: var(--profile-font-family);
        }

        [data-profile-theme-shell='true'] button {
          border-radius: var(--profile-button-radius) !important;
          transition-property: transform, box-shadow, background-color, border-color, color, opacity, filter !important;
          transition-duration: 180ms !important;
          transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1) !important;
          will-change: transform;
        }

        [data-profile-theme-shell='true'][data-interaction-preset='press'] button:hover,
        [data-profile-theme-shell='true'][data-interaction-preset='press'] button:focus-visible {
          transform: translate(4px, 4px) !important;
          box-shadow: none !important;
        }

        [data-profile-theme-shell='true'][data-interaction-preset='lift'] button:hover,
        [data-profile-theme-shell='true'][data-interaction-preset='lift'] button:focus-visible {
          transform: translateY(-6px) !important;
          box-shadow: 0 18px 36px rgba(17, 17, 17, 0.18) !important;
        }

        [data-profile-theme-shell='true'][data-interaction-preset='glide'] button:hover,
        [data-profile-theme-shell='true'][data-interaction-preset='glide'] button:focus-visible {
          transform: translateX(8px) !important;
          box-shadow: 8px 8px 20px rgba(17, 17, 17, 0.14) !important;
        }

        [data-profile-theme-shell='true'][data-motion-preset='steady'] *,
        [data-profile-theme-shell='true'][data-motion-preset='steady'] *::before,
        [data-profile-theme-shell='true'][data-motion-preset='steady'] *::after {
          animation: none !important;
          transition-duration: 1ms !important;
          scroll-behavior: auto !important;
        }

        [data-profile-theme-shell='true'][data-motion-preset='energetic'] button {
          transition-duration: 260ms !important;
          transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1) !important;
        }

        [data-profile-theme-shell='true'][data-motion-preset='energetic'] button:hover,
        [data-profile-theme-shell='true'][data-motion-preset='energetic'] button:focus-visible {
          filter: saturate(1.08);
        }
      `}</style>
    </div>
  )
}
