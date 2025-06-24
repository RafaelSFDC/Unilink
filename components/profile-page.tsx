'use client'

import { trackClick } from '@/app/actions/analytics'
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
  theme: {
    template: string
    backgroundColor: string
    textColor: string
    linkColor: string
    buttonStyle: string
    fontFamily: string
    backgroundType: string
    backgroundImage: string | null
    gradientFrom: string | null
    gradientTo: string | null
  } | null
}

interface ProfilePageProps {
  user: User
}

export function ProfilePage({ user }: ProfilePageProps) {
  const theme = user.theme || {
    template: 'default',
    backgroundColor: '#ffffff',
    textColor: '#000000',
    linkColor: '#1a73e8',
    buttonStyle: 'rounded',
    fontFamily: 'Inter',
    backgroundType: 'solid',
    backgroundImage: null,
    gradientFrom: null,
    gradientTo: null,
  }

  const handleLinkClick = async (linkId: string, url: string) => {
    // Track click
    await trackClick(linkId)

    // Open link
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  // Render the appropriate template based on user's choice
  const renderTemplate = () => {
    const templateId = theme.template as TemplateId

    switch (templateId) {
      case 'minimal':
        return <MinimalTemplate user={user} onLinkClick={handleLinkClick} />
      case 'modern':
        return <ModernTemplate user={user} onLinkClick={handleLinkClick} />
      case 'vibrant':
        return <VibrantTemplate user={user} onLinkClick={handleLinkClick} />
      case 'professional':
        return <ProfessionalTemplate user={user} onLinkClick={handleLinkClick} />
      case 'creative':
        return <CreativeTemplate user={user} onLinkClick={handleLinkClick} />
      default:
        return <DefaultTemplate user={user} onLinkClick={handleLinkClick} />
    }
  }

  return renderTemplate()
}
